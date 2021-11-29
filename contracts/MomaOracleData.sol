// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.7.0;
pragma experimental ABIEncoderV2;

/**
 * @title Moma's Oracle Contract
 * @author Moma
 */
contract MomaOracleData {

    enum PriceSource {
        FIXED_ETH, /// implies the fixedPrice is a constant multiple of the ETH price (which varies)
        FIXED_USD, /// implies the fixedPrice is a constant multiple of the USD price (which is 1)
        CHAINLINK, /// implies the price is set by chainlink
        REPORTER   /// implies the price is set by the reporter
    }

    struct TokenConfig {
        ChainlinkOracleInterface linkOracle;
        IUniswapV2Pair uniswapPair;
        address pairToken;
        uint256 baseUnit;
        // @notice 8 decimals for FIXED_USD, 18 decimals for FIXED_ETH
        uint256 fixedPrice;
        PriceSource priceSource;
    }

    struct MTokenInfo {
        address underlying;
        bool isETH;
    }

    bool public anchored = false;
    address public guardian;
    address public reporter;

    IMomaFactory public immutable momaFactory;
    string public ethSymbol;
    /// @notice The highest ratio of the new price to the anchor price that will still trigger the price to be updated
    uint public constant upperBoundAnchorRatio = 1.1e18;

    /// @notice The lowest ratio of the new price to the anchor price that will still trigger the price to be updated
    uint public constant lowerBoundAnchorRatio = 0.9e18;

    uint public constant ethBaseUnit = 1e18;

    mapping(address => MTokenInfo) public mTokensInfo;      /// mToken --> MTokenInfo
    mapping(address => TokenConfig) public tokenConfigs;    /// underlying --> TokenConfig
    mapping(bytes32 => address) public symbols;             /// symbol --> underlying
    mapping(address => uint) public prices;                 /// underlying --> price (8 decimals)

    /// @notice The event emitted when new prices are posted but the stored price is not updated due to the anchor
    event PriceGuarded(address token, uint reporter, uint anchor);

    /// @notice The event emitted when the stored price is updated
    event PriceUpdated(address token, uint price);


    constructor(
        address reporter_,
        IMomaFactory momaFactory_,
        string memory ethSymbol_,
        address[] memory underlyings_,
        TokenConfig[] memory tokenConfigs_
    ) {
        // USDC、USDT 1e8
        require(reporter_ != address(0), "reporter_ is zero");
        require(address(momaFactory_) != address(0), "momaFactory_ is zero");
        require(underlyings_.length == tokenConfigs_.length, "length dismatch");

        guardian = msg.sender;
        reporter = reporter_;
        momaFactory = momaFactory_;
        ethSymbol = ethSymbol_;

        for (uint i = 0; i < underlyings_.length; i++) {
            setNewTokenInternal(underlyings_[i], tokenConfigs_[i], anchored);
        }
    }


    /*** External Functions ***/

    function getAnchorPrice(string memory symbol_) external view returns (uint) {
        address token = symbols[keccak256(abi.encodePacked(symbol_))];
        TokenConfig memory config = tokenConfigs[token];
        require(config.priceSource == PriceSource.REPORTER && config.baseUnit > 0, "not supported token");
        return fetchAnchorPrice(token, config);
    }

    function setNewMUnderlying(address mToken) public {
        if (momaFactory.isCodeSame(momaFactory.mErc20(), mToken)) {
            address underlying = IMToken(mToken).underlying();
            require(tokenConfigs[underlying].baseUnit > 0, "Not Supported Underlying");
            mTokensInfo[mToken].underlying = underlying;
            // mTokensInfo[mToken].isBuilt = true;
        } else if (momaFactory.isCodeSame(momaFactory.mEther(), mToken)) {
            // mTokensInfo[mToken].isBuilt = true;
            mTokensInfo[mToken].isETH = true;
        } else {
            revert("Not Supported mToken");
        }
    }

    function setNewMTokens(address[] calldata mTokens) external {
        for(uint i; i < mTokens.length; i++) {
            setNewMUnderlying(mTokens[i]);
        }
    }

    /**
     * @notice Post oracle reporter price, and recalculate stored price by comparing to anchor
     * @param token The token to update price
     * @param usdPrice The USD price of this token, 8 decimals
     */
    function postPrice(address token, uint usdPrice) external {
        require(msg.sender == reporter, "invalid reporter");
        postPriceInternal(token, usdPrice, anchored);
    }

    function postPrices(address[] calldata tokens, uint[] calldata usdPrices) external {
        require(msg.sender == reporter, "invalid reporter");
        require(tokens.length == usdPrices.length, "length dismatch");

        bool anchored_ = anchored;
        for(uint i; i < tokens.length; i++) {
            postPriceInternal(tokens[i], usdPrices[i], anchored_);
        }
    }


    /*** Internal Functions ***/

    function postPriceInternal(address token, uint usdPrice, bool anchored_) internal {
        TokenConfig memory config = tokenConfigs[token];
        require(config.priceSource == PriceSource.REPORTER, "invalid token");

        if (anchored_) {
            uint anchorPrice = fetchAnchorPrice(token, config);
            if (isWithinAnchor(usdPrice, anchorPrice)) {
                prices[token] = usdPrice;
                emit PriceUpdated(token, usdPrice);
            } else {
                emit PriceGuarded(token, usdPrice, anchorPrice);
            }
        } else {
            prices[token] = usdPrice;
            emit PriceUpdated(token, usdPrice);
        }
    }

    /**
     * @dev Fetches the current token/usd price from uniswap, with 8 decimals of precision.
     */
    function fetchAnchorPrice(address token, TokenConfig memory config) internal view returns (uint) {
        (uint112 reserve0, uint112 reserve1, ) = config.uniswapPair.getReserves();
        TokenConfig memory pairTokenConfig = tokenConfigs[config.pairToken];
        uint priceMantissa;
        uint mulBase;
        uint divBase;
        if (token < config.pairToken) { /// token is token0
            priceMantissa = fractionWith18(reserve1, reserve0);
            mulBase = config.baseUnit;
            divBase = pairTokenConfig.baseUnit;
        } else {
            priceMantissa = fractionWith18(reserve0, reserve1);
            mulBase = config.baseUnit;
            divBase = pairTokenConfig.baseUnit;
        }
        require(address(pairTokenConfig.linkOracle) != address(0), "pair oracle not set");
        uint pairPrice = getChainlinkPrice(pairTokenConfig.linkOracle);
        return mul(mul(priceMantissa, pairPrice), mulBase) / divBase / 1e18;
    }

    function isWithinAnchor(uint reporterPrice, uint anchorPrice) internal pure returns (bool) {
        if (reporterPrice > 0) {
            uint anchorRatio = mul(anchorPrice, 100e16) / reporterPrice;
            return anchorRatio <= upperBoundAnchorRatio && anchorRatio >= lowerBoundAnchorRatio;
        }
        return false;
    }

    function getChainlinkPrice(ChainlinkOracleInterface targetOracle) internal view returns (uint) {
        (,int256 price,,,) = targetOracle.latestRoundData();
        require(price > 0, "Invalid price");
        return uint(price);
    }

    function setNewTokenInternal(address underlying_, TokenConfig memory tokenConfig_, bool anchored_) internal {
        require(tokenConfig_.baseUnit > 0, "baseUnit is 0");

        if (tokenConfig_.priceSource == PriceSource.CHAINLINK) {
            require(address(tokenConfig_.linkOracle) != address(0), "linkOracle is 0");
        } else if (tokenConfig_.priceSource == PriceSource.REPORTER && anchored_) {
            require(address(tokenConfig_.uniswapPair) != address(0), "uniswapPair is 0");
            require(underlying_ != tokenConfig_.pairToken, "Pair token error");

            TokenConfig memory pairTokenConfig = tokenConfigs[tokenConfig_.pairToken];
            require(pairTokenConfig.baseUnit > 0, "pairToken not support");
            require(pairTokenConfig.priceSource == PriceSource.CHAINLINK, "pairToken must be link source");

            address token0 = tokenConfig_.uniswapPair.token0();
            require(underlying_ == token0 || tokenConfig_.pairToken == token0, "Token0 error");
            address token1 = tokenConfig_.uniswapPair.token1();
            require(underlying_ == token1 || tokenConfig_.pairToken == token1, "Token1 error");
        }

        tokenConfigs[underlying_] = tokenConfig_;
        string memory symbol_ = IERC20(underlying_).symbol();
        bytes32 symbolHash_ = keccak256(abi.encodePacked(symbol_));
        symbols[symbolHash_] = underlying_;
    }

    function mul(uint a, uint b) internal pure returns (uint) {
        if (a == 0) return 0;
        uint c = a * b;
        require(c / a == b, "multiplication overflow");
        return c;
    }

    function fractionWith18(uint112 numerator, uint112 denominator) internal pure returns (uint) {
        require(denominator > 0, "DIV_BY_ZERO");
        return uint((uint224(numerator) << 112) / denominator) / 5192296858534827;
    }


    /*** Guardian Functions ***/

    function setNewToken(address underlying_, TokenConfig calldata tokenConfig_) external {
        require(msg.sender == guardian, "Only guardian");
        setNewTokenInternal(underlying_, tokenConfig_, anchored);
    }

    function setNewGuardian(address guardian_) external {
        require(msg.sender == guardian, "Only guardian");
        guardian = guardian_;
    }

    function setNewRepoter(address reporter_) external {
        require(msg.sender == guardian, "Only guardian");
        reporter = reporter_;
    }

    function setAnchoredStatus(bool anchored_) external {
        require(msg.sender == guardian, "Only guardian");
        anchored = anchored_;
    }

}


interface ChainlinkOracleInterface {
    function latestRoundData() external view returns (
            uint80 roundId,
            int256 price,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

interface IUniswapV2Pair {
    function token0() external view returns (address);
    function token1() external view returns (address);
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IMToken {
    function underlying() external view returns (address);
}

interface IERC20 {
    function symbol() external view returns (string memory);
}

interface IMomaFactory {
    function isCodeSame(address a, address b) external view returns (bool);
    function mErc20() external view returns (address);
    function mEther() external view returns (address);
}

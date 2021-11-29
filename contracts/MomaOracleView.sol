// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.7.0;
pragma experimental ABIEncoderV2;
import "./MomaOracleData.sol";

/**
 * @title Moma's Oracle Contract
 * @author Moma
 */
contract MomaOracleView is MomaOracleData {

    /// @notice Indicator that this is a PriceOracle contract (for inspection)
    bool public constant isPriceOracle = true;

    constructor(
        address reporter_,
        IMomaFactory momaFactory_,
        string memory ethSymbol_,
        address[] memory underlyings_,
        TokenConfig[] memory tokenConfigs_
    ) MomaOracleData(reporter_, momaFactory_, ethSymbol_, underlyings_, tokenConfigs_) {}

    /*** External Functions ***/

    // price 1e8
    function getPrice(address token) external view returns (uint) {
        return priceInternal(token, tokenConfigs[token]);
    }

    // price 1e8
    function getPrice(string memory symbol_) public view returns (uint) {
        address token = symbols[keccak256(abi.encodePacked(symbol_))];
        return priceInternal(token, tokenConfigs[token]);
    }

    // price 1e8
    function getEthPrice() public view returns (uint) {
        uint price = getPrice(ethSymbol);
        require(price > 0, "Invalid price");
        return price;
    }

    /**
     * @notice Get the underlying price of a listed mToken asset
     * @param mToken The mToken to get the underlying price
     * @return Price denominated in USD, with 18 decimals, for the given mToken address
     */
    function getUnderlyingPrice(address mToken) external view returns (uint) {
        MTokenInfo memory targetPair = mTokensInfo[mToken];
        if (targetPair.isETH) {
            return (mul(1e28, getEthPrice())) / ethBaseUnit;
        }
        TokenConfig memory tokenConfig = tokenConfigs[targetPair.underlying];
        return (mul(1e28, priceInternal(targetPair.underlying, tokenConfig)) / tokenConfig.baseUnit);
    }


    /*** Internal Functions ***/

    function priceInternal(address token, TokenConfig memory tokenConfig) internal view returns (uint) {
        if (tokenConfig.priceSource == PriceSource.CHAINLINK) {
            if (address(tokenConfig.linkOracle) == address(0)) {
                return 0;
            }
            return getChainlinkPrice(tokenConfig.linkOracle);
        }
        if (tokenConfig.priceSource == PriceSource.REPORTER) return prices[token];
        if (tokenConfig.priceSource == PriceSource.FIXED_USD) return tokenConfig.fixedPrice;
        if (tokenConfig.priceSource == PriceSource.FIXED_ETH) {
            return mul(getEthPrice(), tokenConfig.fixedPrice) / ethBaseUnit;
        }
    }
}

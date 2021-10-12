const guardian_ = "0x4819AD67cd561D0EDDCAA832eDD16B75e9EA7CA3";
const reporter_ = "0x4819AD67cd561D0EDDCAA832eDD16B75e9EA7CA3";
const momaFactory_ = "0x360F49e348E20B4E3eA21079B44b5498799D8487";
const ethOracle_ = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";

const configs = [
    { 
        symbol: "WETH", 
        tokenAddr: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        linkOracle: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    { 
        symbol: "USDT", 
        tokenAddr: "0x5484Dc5a5Fb2aE0df7b5391f8Bb4b0a7cBfE54d6",
        linkOracle: "0xa24de01df22b63d23Ebc1882a5E3d4ec0d907bFB",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    { 
        symbol: "DAI", 
        tokenAddr: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
        linkOracle: "0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    { 
        symbol: "WBTC", 
        tokenAddr: "0x577D296678535e4903D59A4C929B718e1D575e0A",
        linkOracle: "0xECe365B379E1dD183B20fc5f022230C044d51404",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "100000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    { 
        symbol: "MOMAT", 
        tokenAddr: "0x9dF4E28930174B79296de3316ACE0B2d9eE4a22E",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x07385c23CD218490c569Dce7Ab4D2130370A278d",
        pairToken: "0x5484Dc5a5Fb2aE0df7b5391f8Bb4b0a7cBfE54d6",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
    { 
        symbol: "LC", 
        tokenAddr: "0xfa01D5B0fE7F4D77A928bF30a00fE550d45913EF",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x6e2D30F0ecF4dBcdC206f7c11444c90Fde28Ae74",
        pairToken: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
];

module.exports = {
    guardian_,
    reporter_,
    momaFactory_,
    ethOracle_,
    configs
};
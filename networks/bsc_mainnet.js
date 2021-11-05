const guardian_ = "0x376fe4D01F14Ed16dDDA449f8dD331e2970B33D6";
const reporter_ = "0xC9FaBc6B8C916FB1A2c511E92fd1F61FD5AaFbF8";
const momaFactory_ = "0x8cF1CF865D121e450D91a7E483a877c1b893A24b";
const ethOracle_ = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";  // BNB

const configs = [
    {
        symbol: "WBNB", 
        tokenAddr: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 
        linkOracle: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    {
        symbol: "ETH", 
        tokenAddr: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", 
        linkOracle: "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    {
        symbol: "USDT", 
        tokenAddr: "0x55d398326f99059fF775485246999027B3197955", 
        linkOracle: "0xB97Ad0E74fa7d920791E90258A6E2085088b4320",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    {
        symbol: "BUSD", 
        tokenAddr: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", 
        linkOracle: "0xcBb98864Ef56E9042e7d2efef76141f15731B82f",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    {
        symbol: "BTCB", 
        tokenAddr: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", 
        linkOracle: "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    {
        symbol: "MOMAT", 
        tokenAddr: "0xc7C33ccE4B106313Dc8fcDFa899502266B29286d",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x1F7ed22B306Da5E194cfD9CEA83642b7190B475D",
        pairToken: "0x55d398326f99059fF775485246999027B3197955",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
    {
        symbol: "LC", 
        tokenAddr: "0x664cB7A0A0A86779F1A8748cC02F9872ACad3E0a",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0xe039bd7AdFe1A553A717664a756e8797bEBD1823",
        pairToken: "0x55d398326f99059fF775485246999027B3197955",
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
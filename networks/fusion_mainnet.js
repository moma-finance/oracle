const guardian_ = "0x376fe4D01F14Ed16dDDA449f8dD331e2970B33D6";
const reporter_ = "0xC9FaBc6B8C916FB1A2c511E92fd1F61FD5AaFbF8";
const momaFactory_ = "0x865bB9A28041259b4baDAFD37799A288aAbbfC8c";
const ethSymbol_ = "FSN";

const configs = [
    {
        symbol: "FSN", 
        tokenAddr: "0x5555e10d7e69b7246af27fe1a93466a84c199b6f", 
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
    {
        symbol: "MOMAT", 
        tokenAddr: "0xa33d4e49f6FB7b7027b8d8B1211B43d0f325BE43",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
    {
        symbol: "LC", 
        tokenAddr: "0x664cb7a0a0a86779f1a8748cc02f9872acad3e0a",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
];

module.exports = {
    guardian_,
    reporter_,
    momaFactory_,
    ethSymbol_,
    configs
};
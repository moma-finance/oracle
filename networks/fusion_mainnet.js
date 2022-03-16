const guardian_ = "0x376fe4D01F14Ed16dDDA449f8dD331e2970B33D6";
const reporter_ = "0xC9FaBc6B8C916FB1A2c511E92fd1F61FD5AaFbF8";
const momaFactory_ = "0x865bB9A28041259b4baDAFD37799A288aAbbfC8c";
const ethSymbol_ = "FSN";

// contract: branch - only_reporter
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
        tokenAddr: "0x48b0632d25dcd9e1cec9eaca7cd97b82c452304f",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
    {
        symbol: "LC", 
        tokenAddr: "0x11a8e0b37501a76dd25a414b5c7ff885695b0de3",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },


    {
        symbol: "fFSN", 
        tokenAddr: "0x2b8bb627ce7c0c9cbe579e83099de665032d08be", 
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3", // REPORTER
    },
    {
        symbol: "CHNG", 
        tokenAddr: "0x05573124c64c69d85687152b2942bcb0a3b26d99",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
    {
        symbol: "BTC", 
        tokenAddr: "0x816f67ce73aeb099e894a55d135168dd501b55a6",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "100000000",
        fixedPrice: "0",
        priceSource: "3",
    },
    {
        symbol: "ETH", 
        tokenAddr: "0x796d74a86db307b0b0e02fed9fa19ccb1906ce37",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
    {
        symbol: "USDT", 
        tokenAddr: "0x9636d3294e45823ec924c8d89dd1f1dffcf044e6",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000",
        fixedPrice: "100000000",
        priceSource: "1", // FIXED_USD
    },
    {
        symbol: "DAI", 
        tokenAddr: "0x947250c8664600b7cb18b0de73e592ed78598b8f",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "100000000",
        priceSource: "1", // FIXED_USD
    },
    {
        symbol: "BUSD", 
        tokenAddr: "0xd169bfa08ae2c9bea4123a8760ba058afd647ed2",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "100000000",
        priceSource: "1", // FIXED_USD
    }
];

module.exports = {
    guardian_,
    reporter_,
    momaFactory_,
    ethSymbol_,
    configs
};
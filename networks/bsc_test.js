const guardian_ = "0x4819AD67cd561D0EDDCAA832eDD16B75e9EA7CA3";
const reporter_ = "0xC9FaBc6B8C916FB1A2c511E92fd1F61FD5AaFbF8";
const momaFactory_ = "0xC5eDfeF4d97148bBc2fb8AC6F81C870ee5ADf2D3";
const ethOracle_ = "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526";  // BNB

const configs = [
    { 
        symbol: "ETH", 
        tokenAddr: "0xB079f15F21e1518FBf6C79cad6710f1c8962844A", 
        linkOracle: "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    { 
        symbol: "USDT", 
        tokenAddr: "0x61b26dAf43F92e233A513eE581BA5a305344761b", 
        linkOracle: "0xEca2605f0BCF2BA5966372C99837b1F182d3D620",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    { 
        symbol: "WBTC", 
        tokenAddr: "0x5d82eFa4f71bAEDDd9fDc6DaAA8A056a34cf9289", 
        linkOracle: "0x5741306c21795FdCBb9b265Ea0255F499DFe515C",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "100000000",
        fixedPrice: "0",
        priceSource: "2",
    },
    { 
        symbol: "MOMAT", 
        tokenAddr: "0x0707C63204B179EF8a9431a01145df73e964521b",
        linkOracle: "0x0000000000000000000000000000000000000000",
        uniswapPair: "0x0000000000000000000000000000000000000000",
        pairToken: "0x0000000000000000000000000000000000000000",
        baseUnit: "1000000000000000000",
        fixedPrice: "0",
        priceSource: "3",
    },
    { 
        symbol: "LC", 
        tokenAddr: "0x1a07126A22AE1b0153090487b4EcAF5Ef5dEf219",
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
    ethOracle_,
    configs
};
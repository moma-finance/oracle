const { 
  guardian_,
  reporter_,
  momaFactory_,
  ethOracle_,
  configs 
} = require('./bsc_mainnet');


parse()
// ============ Deploy Functions ============

async function parse() {

  let underlyings_ = '[';
  let tokenConfigs_ = '[';

  for (const { tokenAddr, linkOracle, uniswapPair, pairToken, baseUnit, fixedPrice, priceSource } of configs) {
    underlyings_ += '"' + tokenAddr + '",';
    tokenConfigs_ += '[';
    tokenConfigs_ += '"' + linkOracle + '",';
    tokenConfigs_ += '"' + uniswapPair + '",';
    tokenConfigs_ += '"' + pairToken + '",';
    tokenConfigs_ += '"' + baseUnit + '",';
    tokenConfigs_ += '"' + fixedPrice + '",';
    tokenConfigs_ += '"' + priceSource + '"';
    tokenConfigs_ += '],';
  }

  console.log("reporter_: ", reporter_ + "\n");
  console.log("momaFactory_: ", momaFactory_ + "\n");
  console.log("ethOracle_: ", ethOracle_ + "\n");
  console.log(underlyings_.slice(0, -1) + "]\n");
  console.log(tokenConfigs_.slice(0, -1) + "]\n");

}

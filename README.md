# Moma-Oracle接口文档
## MomaOracleData
* 功能描述：
  + 集成chainlink多交易对报价；
  + 支持链下喂价 + uniswap价格锚定；

* Contract Address:
  + Rinkeby: 0x86a2ba4E6E516833b9B00833d8793e3167d7C4c5


### View Func：
#### 1. getPrice:
* 功能描述：通过token地址获取指定原生资产价格（8位精度）；
* 入参：token, 待查询原生资产合约地址
* 返回值：token价格

#### 2. getPrice:
* 功能描述：通过symbol获取指定原生资产价格（8位精度）；
* 入参：symbol, 待查询token的symbol
* 返回值：token价格

#### 3. getEthPrice:
* 功能描述：获取以太坊价格（8位精度）；
* 入参：无
* 返回值：ETH价格


### Bind mToken Func：
#### 1. setNewMUnderlying:
* 功能描述：绑定单个mToken至已有原生资产oracle；
* 入参：mToken, 需绑定的mToken合约地址
* 异常：不支持的mToken将会报Not Supported mToken或Underlying

#### 2. setNewMTokens:
* 功能描述：批量绑定多个mToken至已有原生资产oracle；
* 入参：mTokens, 需绑定的mToken合约地址列表
* 异常：不支持的mToken将会报Not Supported mToken或Underlying


### Post Price Func：
#### 1. postPrice:
* 功能描述：对某token进行报价；
* 入参：token, 需报价的token合约地址；usdPrice，token价格，8位精度。
* 异常：报价成功将会触发PriceUpdated事件，否则报价失败

#### 2. postPrices:
* 功能描述：批量对多个token进行报价；
* 入参：tokens, 需报价的token合约地址列表；usdPrices，对应token价格列表，8位精度。
* 异常：报价成功将会触发PriceUpdated事件，否则报价失败

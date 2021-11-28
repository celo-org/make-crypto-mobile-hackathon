const _ = require("lodash");
const fs = require("fs");

const sources = [
  "balancer",
  "binance",
  "bitmart",
  "coinbase",
  "coingecko",
  "ecb",
  "huobi",
  "kraken",
  "kyber",
  "sushiswap",
  "uniswap",
];

const tokensToRemove = [
  "WETH",
  "LEND",
  "LON",
  "CVP",
  "ROOM",
  "YOP",
  "CDAI",
  "CETH",
  "CUSDC",
  "HBTC",
  "XSUSHI",
  "RENBTC",
  "HUSD",
  "TEND",
  "YAMv2",
  "YFL",
  "RBC",
  "YAX",
];

for (const source of sources) {
  const sourceConfig = require(`../../manifests/${source}.json`);
  sourceConfig.tokens = _.omit(sourceConfig.tokens, tokensToRemove);
  fs.writeFileSync(`${source}.json`, JSON.stringify(sourceConfig, null, 2) + "\n");
}

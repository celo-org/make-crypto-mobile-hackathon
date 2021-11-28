const symbolToPairList = require("./uniswap-symbol-to-pair-id.json");

async function getTokenList() {
  return Object.keys(symbolToPairList);
}

exports.getTokenList = getTokenList;

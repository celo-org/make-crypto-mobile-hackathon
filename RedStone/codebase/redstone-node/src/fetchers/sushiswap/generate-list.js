const symbolToPairList = require("./sushiswap-symbol-to-pair-id.json");

function getTokenList() {
  return Object.keys(symbolToPairList);
}

exports.getTokenList = getTokenList;

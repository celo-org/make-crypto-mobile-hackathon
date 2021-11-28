const supportedTokens = require("./coingecko-symbol-to-id.json");

async function getTokenList() {
  return Object.keys(supportedTokens);
}

exports.getTokenList = getTokenList;

const supportedTokens = require("./tokens-supported-by-kyber.json");

async function getTokenList() {
  return supportedTokens;
}

exports.getTokenList = getTokenList;

const axios = require("axios");

let standardListsURLs = [
  "https://zapper.fi/api/token-list",
  "https://tokens.coingecko.com/uniswap/all.json",
  "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokenlist.aave.eth.link",
  "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link",
  "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://t2crtokens.eth.link",
  "https://uniswap.mycryptoapi.com/",
];

async function getList(url) {
  const response = await axios.get(url);
  return response.data.tokens;
}

async function getStandardLists() {
  const promises = standardListsURLs.map(async url => await getList(url));
  return await Promise.all(promises);
}

module.exports = { getStandardLists };

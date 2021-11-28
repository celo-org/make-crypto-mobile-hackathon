const fs = require("fs");
const _ = require("lodash");
const CoinGecko = require("coingecko-api");
const fetchers = require("../../src/config/sources.json");
const ccxtSupportedExchanges = require("../../src/fetchers/ccxt/all-supported-exchanges.json");
const predefinedTokensConfig = require("./predefined-configs/tokens.json");
const { getStandardLists } = require("./standard-lists");
const { getCcxtTokenList } = require("../../src/fetchers/ccxt/generate-list-for-all-ccxt-sources");
const coingeckoSymbolToId = require("../../src/fetchers/coingecko/coingecko-symbol-to-id.json");
const { default: axios } = require("axios");
const providerToManifest = {
  "redstone-rapid": require("../../manifests/rapid.json"),
  "redstone-stocks": require("../../manifests/stocks.json"),
  "redstone": require("../../manifests/main.json"),
};

// Note: Before running this script you should generate sources.json config
// You can do this using tools/config/generate-sources-config.js script

const OUTPUT_FILE = "./src/config/tokens.json";
const IMG_URL_FOR_EMPTY_LOGO = "https://cdn.redstone.finance/symbols/logo-not-found.png";
const URL_PREFIX_FOR_EMPTY_URL = "https://www.google.com/search?q=";
const TRY_TO_LOAD_FROM_COINGECKO_API = true;

const tokensConfig = {};
const coingeckoClient = new CoinGecko();

main();

async function main() {
  await generateTokensConfig();
  saveTokensConfigToFile();
}

async function generateTokensConfig() {
  // Adding tokens with sources
  for (const fetcher of Object.keys(fetchers)) {
    try {
      if (!isCcxtFetcher(fetcher)) {
        await addAllTokensForSource(fetcher);
      }
    } catch (err) {
      console.log("Error when getting a token list for: " + fetcher);
      console.log(err);
    }
  }
  await addAllTokensForCcxtSources();

  // Loading tokens from coingecko
  console.log("Loading data from coingecko - started");
  const coingeckoData = await getAllTokensFromCoingecko();
  console.log("Loading data from coingecko - completed");

  // Adding token details
  const standardLists = await getStandardLists();
  let counter = 0;
  const tokens = Object.keys(tokensConfig);
  const total = tokens.length;
  for (const token of tokens) {
    counter++;
    console.log(`Loading details for token: ${token} (${counter}/${total})`);
    tokensConfig[token] = await getAllDetailsForSymbol(
      token,
      standardLists,
      coingeckoData);
  }
}

// This function should handle
// - getting details (imgURL, url, chainId...)
// - getting providers
// - getting tags
async function getAllDetailsForSymbol(symbol, standardLists, coingeckoData) {
  const providers = getProvidersForSymbol(symbol);
  const tags = getTagsForSymbol(symbol);
  const details = getDetailsForSymbol(symbol, standardLists);

  if (TRY_TO_LOAD_FROM_COINGECKO_API && !details.logoURI || !details.url) {
    const coingeckoDetails = getDetailsFromCoingecko(symbol, coingeckoData);
    console.log({coingeckoDetails});
    if (coingeckoDetails) {
      if (coingeckoDetails.image && !details.logoURI) {
        details.logoURI = coingeckoDetails.image.large;
      }
      if (coingeckoDetails.links && !details.url) {
        details.url = coingeckoDetails.links.homepage[0];
      }
      if (coingeckoDetails.name) {
        details.name = coingeckoDetails.name;
      }
    }
  }

  if (!details.logoURI) {
    details.logoURI = IMG_URL_FOR_EMPTY_LOGO;
  }
  if (!details.name) {
    details.name = symbol;
  }
  if (!details.url) {
    details.url = URL_PREFIX_FOR_EMPTY_URL + symbol;
  }

  return {
    ...details,
    tags,
    providers,
  };
}

function getDetailsForSymbol(symbol, standardLists) {
  // Checking if predefined config contains details for the symbol
  const details = predefinedTokensConfig[symbol];
  if (details) {
    return details;
  }

  // Searching for token details in popular standard token lists
  for (const standardList of standardLists) {
    const symbolDetails = standardList.find(el => el.symbol === symbol);
    if (symbolDetails) {
      return symbolDetails;
    }
  }

  // Returning empty details
  return {};
}


function getProvidersForSymbol(symbol) {
  return Object.keys(providerToManifest)
    .filter(p => symbol in providerToManifest[p].tokens);
}

// This function can work based on manifests and predefined config
// Returning "crypto" as a default tag
function getTagsForSymbol(symbol) {
  let tags = [];
  if (predefinedTokensConfig[symbol] && predefinedTokensConfig[symbol].tags) {
    tags = predefinedTokensConfig[symbol].tags;
  }

  if (tags.length === 0 && !providerToManifest["redstone-stocks"][symbol]) {
    tags.push("crypto");
  }

  return tags;
}

function isCcxtFetcher(fetcherName) {
  return ccxtSupportedExchanges.includes(fetcherName);
}

async function addAllTokensForCcxtSources() {
  console.log("Fetching tokens for all ccxt feetchers");
  const ccxtFetchersWithTokens = await getCcxtTokenList();
  for (const ccxtFetcher in ccxtFetchersWithTokens) {
    addTokensToConfig(
      ccxtFetchersWithTokens[ccxtFetcher],
      ccxtFetcher);
  }
}

async function addAllTokensForSource(source) {
  console.log("Fetching supported tokens for: " + source);
  const { getTokenList } = require(
    `../../src/fetchers/${source}/generate-list`);
  const tokens = await getTokenList();
  addTokensToConfig(tokens, source);
}

async function getAllTokensFromCoingecko() {
  const pageSize = 250, allTokens = {};
  let pageNr = 0, finished = false;
  while (!finished) {
    const response = await coingeckoClient.coins.all({
      per_page: pageSize,
      page: pageNr,
    });

    if (!response.data || response.data.length == 0) {
      finished = true;
    }

    for (const token of response.data) {
      allTokens[token.id] = _.pick(token, ["name", "image"]);
    }

    console.log(`Loading tokens from coingecko from page: ${pageNr}. Page size: ${response.data.length}`);

    pageNr++;
  }

  console.log(JSON.stringify(allTokens, null, 2));

  return allTokens;
}

function getDetailsFromCoingecko(symbol, coingeckoData) {
  const coinId = coingeckoSymbolToId[symbol];
  if (!coinId) {
    return null;
  } else {
    console.log({ symbol, coinId });
    return coingeckoData[coinId];
  }
}

function addTokensToConfig(tokens, source) {
  for (const token of tokens) {
    addTokenToConfig(token, source);
  }
}

function addTokenToConfig(token, source) {
  if (token in tokensConfig) {
    if (Array.isArray(tokensConfig[token].source)) {
      tokensConfig[token].source.push(source);
    } else {
      tokensConfig[token].source = [source];
    }
  } else {
    tokensConfig[token] = { source: [source] };
  }
}

function saveTokensConfigToFile() {
  const json = JSON.stringify(tokensConfig, null, 2) + "\n";
  fs.writeFileSync(OUTPUT_FILE, json);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

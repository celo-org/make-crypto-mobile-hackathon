const fs = require("fs");
const ccxt = require("ccxt");
const redstone = require("redstone-api");
const exchanges = require("../../src/fetchers/ccxt/all-supported-exchanges.json");
const allSupportedTokensManifest = require("../../manifests/main.json");

const OUTPUT_DIR = "./manifests";
const MIN_SIMILAR_VALUES_PERCENTAGE = 70; // %
const MAX_DEVIATION_FOR_SIMILAR_PRICES = 25; // %
const MIN_NUMBER_OF_SUPPORTED_EXCHANGES = 2;
const VERBOSE_MODE = true;
const DONT_ADD_NEW_TOKENS = true; // If set to true, the script will not add tokens to sources that don't already support them in current main manifest

main();

async function main() {
  const aggregatedTickers = await getAllTickers();

  for (const exchange of exchanges) {
    const tokens = getSupportedTokensForExchange(exchange, aggregatedTickers);
    log(`Manifest for ${exchange} will contain ${tokens.length} tokens`);
    saveManifestToFile({ tokens, exchange });
  }
}

async function getAllTickers() {
  let result = {};

  for (const exchangeName of exchanges) {
    const tickers = await getTickersForExchange(exchangeName);
    log(`Loaded ${Object.keys(tickers).length} tickers for: ${exchangeName}`);
    result = mergeTickers(tickers, exchangeName, result);
  }

  // Adding current tickers from redstone-api
  // to avoid big price deviation with non-ccxt sources (like coingecko)
  const redstoneApiTickers = await getRedstoneApiTickers();
  result = mergeTickers(redstoneApiTickers, "___redstone-api___", result);

  return result;
}

async function getTickersForExchange(exchangeName) {
  const supportedTickers = {};

  // Fetch data
  const exchange = new ccxt[exchangeName];
  const tickers = await exchange.fetchTickers();

  // Parse response
  for (const ticker of Object.values(tickers)) {
    const pairSymbol = ticker.symbol;
    if (pairSymbol) {
      if (pairSymbol.endsWith("/USD")) {
        const symbol = pairSymbol.replace("/USD", "");
        supportedTickers[symbol] = ticker.last;
      } else if (pairSymbol.endsWith("/USDT")) {
        const symbol = pairSymbol.replace("/USDT", "");
        if (!supportedTickers[symbol]) {
          supportedTickers[symbol] = ticker.last;
        }
      }
    }
  }

  return supportedTickers;
}

async function getRedstoneApiTickers() {
  const redstoneTickers = {};
  const prices = await redstone.getAllPrices();
  for (const symbol in prices) {
    redstoneTickers[symbol] = prices[symbol].value;
  }
  return redstoneTickers;
}

function mergeTickers(newTickers, exchangeName, prevResult) {
  const newResult = { ...prevResult };
  for (const symbol of Object.keys(newTickers)) {
    const priceValue = newTickers[symbol];
    if (newResult[symbol]) {
      newResult[symbol][exchangeName] = priceValue;
    } else {
      newResult[symbol] = { [exchangeName]: priceValue };
    }
  }

  return newResult;
}

// This function generates a list of supported symbols for exchange
// Symbol is considered to be supported by exchange if its price
// value is similar to majority of prices from other exchanges that
// support this symbol
function getSupportedTokensForExchange(exchange, aggregatedTickers) {
  return Object.keys(aggregatedTickers).filter(symbol => {
    const pricesWithSources = aggregatedTickers[symbol];
    const priceValues = Object.values(pricesWithSources);
    const price = pricesWithSources[exchange];
    const shouldBeIncluded = price > 0
      && priceValues.length >= MIN_NUMBER_OF_SUPPORTED_EXCHANGES
      && (!DONT_ADD_NEW_TOKENS || isTokenIncludedInCurrentManifest({ exchange, symbol }))
      && isPriceSimilarWithMajority(price, priceValues);

    return shouldBeIncluded;
  });
}

function isTokenIncludedInCurrentManifest({ exchange, symbol }) {
  const tokens = allSupportedTokensManifest.tokens;
  return tokens[symbol] && tokens[symbol].source.includes(exchange);
}

function isPriceSimilarWithMajority(price, prices) {
  const similarPrices = prices.filter(p => arePricesSimilar(p, price))
  const similarPricesPercentage = (similarPrices.length / prices.length) * 100;
  return similarPricesPercentage >= MIN_SIMILAR_VALUES_PERCENTAGE;
}

// This function compares 2 price values and returns true
// if the difference between them is less than
function arePricesSimilar(price1, price2) {
  if (price1 === 0 || price2 === 0) {
    return false;
  }

  const diff = Math.abs(price1 - price2);
  const diffPercentage = (diff / Math.min(price1, price2)) * 100;

  return diffPercentage < MAX_DEVIATION_FOR_SIMILAR_PRICES;
}

function saveManifestToFile({ tokens, exchange }) {
  const manifestFilePath = `${OUTPUT_DIR}/${exchange}.json`;
  const manifest = {
    interval: 60000,
    priceAggregator: "median",
    defaultSource: [
      exchange,
    ],
    sourceTimeout: 50000,
    maxPriceDeviationPercent: 25,
    evmChainId: 1,
    tokens: generateTokensObj(tokens),
  };
  fs.writeFileSync(manifestFilePath, JSON.stringify(manifest, null, 2) + "\n");
}

function generateTokensObj(tokens) {
  const result = {};
  for (const token of tokens) {
    result[token] = {};
  }
  return result;
}

function log(...args) {
  if (VERBOSE_MODE) {
    console.log(...args);
  }
}

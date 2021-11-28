const popularTokens = require("./popular-tokens.json");

const DEFAULT_MAX_DEVIATION = 25;
const MAX_DEVIATION_FOR_POPULAR_TOKENS = 25;
const MAX_DEVIATION_FOR_UNPOPULAR_TOKENS = 80;

function getTokensConfig(tokens) {
  const result = {};
  for (const symbol in tokens) {
    const maxPriceDeviationPercent = getDeviationForToken(symbol);
    result[symbol] = {
      ...tokens[symbol],
      maxPriceDeviationPercent,
    };
  }
  return result;
}

function getDeviationForToken(symbol) {
  if (popularTokens.includes(symbol)) {
    return MAX_DEVIATION_FOR_POPULAR_TOKENS;
  } else {
    return MAX_DEVIATION_FOR_UNPOPULAR_TOKENS;
  }
}

function generateManifest({ tokens, interval = 60000, sourceTimeout = 50000 }) {
  return {
    interval,
    priceAggregator: "median",
    sourceTimeout,
    maxPriceDeviationPercent: DEFAULT_MAX_DEVIATION,
    evmChainId: 1,
    tokens: getTokensConfig(tokens),
  };
}

module.exports = { generateManifest };

const allAssets = require("redstone-node/dist/src/config/tokens.json");
const stocksManifest = require("redstone-node/dist/manifests/stocks.json");

const SUPPORTED_CATEGORIES = ["grains", "energies", "metals", "livestocks", "softs"];

main();

function main() {
  const commodities = getCommodities();
  printConfig(commodities);
}

function printConfig(config) {
  console.log(JSON.stringify(config, null, 2));
}


function getCommodities() {
  const result = {};
  for (const [symbol, details] of Object.entries(allAssets)) {
    if (shouldAssetBeIncluded(symbol, details)) {
      result[symbol] = details;
    }
  }
  return result;
}

function shouldAssetBeIncluded(symbol, details) {
  let hasSupportedTag = false;
  for (const supportedCategory of SUPPORTED_CATEGORIES) {
    if (details.tags.includes(supportedCategory)) {
      hasSupportedTag = true;
      break;
    }
  }
  return stocksManifest.tokens[symbol] && hasSupportedTag;
}

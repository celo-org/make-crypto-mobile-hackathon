const fs = require("fs");
const manifestForMainProvider = require("../../manifests/main.json");

module.exports = function(symbols, outputFilePath, predefinedManifest = {}) {
  const manifest = {
    "interval": 10000,
    "priceAggregator": "median",
    "defaultSource": ["coingecko"],
    "sourceTimeout": 7000,
    "maxPriceDeviationPercent": 25,
    "evmChainId": 1,
    tokens: {},
    ...predefinedManifest,
  };

  // Building tokens
  for (const symbol of symbols) {
    manifest.tokens[symbol] = manifestForMainProvider.tokens[symbol];
  }

  // Saving manifest to the output file
  console.log(`Saving manifest to: ${outputFilePath}`);
  fs.writeFileSync(outputFilePath, JSON.stringify(manifest, null, 2) + "\n");
}

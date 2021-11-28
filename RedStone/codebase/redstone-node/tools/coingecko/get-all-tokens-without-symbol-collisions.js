const mainManifest = require("../../manifests/main.json");
const coingeckoSymbolToDetails = require("../../src/fetchers/coingecko/coingecko-symbol-to-details.json");

const EXCLUDE_SYMBOLS_FROM_MAIN_MANIFEST = true;

main();

function main() {
  const symbolsWithoutCollision = [];
  for (const symbol in coingeckoSymbolToDetails) {
    const details = coingeckoSymbolToDetails[symbol];
    if (details.length === 1 && (!EXCLUDE_SYMBOLS_FROM_MAIN_MANIFEST || !symbolIncludedInManifest(symbol))) {
      symbolsWithoutCollision.push(symbol);
    }
  }
  console.log(JSON.stringify(symbolsWithoutCollision, null, 2));
}

function symbolIncludedInManifest(symbol) {
  return mainManifest.tokens[symbol] !== undefined;
}

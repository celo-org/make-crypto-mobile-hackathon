const fs = require("fs");

const SYMBOL_TO_DETAILS_PATH = "./src/fetchers/coingecko/coingecko-symbol-to-details.json";
const SYMBOL_TO_ID_PATH = "./src/fetchers/coingecko/coingecko-symbol-to-id.json";

// If you want to add a token which symbol has collision with another token
// You can hardcode it in the `hardcodedValues` object
const hardcodedValues = {
  "QI": "benqi",
};

main();

function main() {
  const symbolToDetails = readJSON(SYMBOL_TO_DETAILS_PATH);
  const symbolToIds = readJSON(SYMBOL_TO_ID_PATH);

  const newSymbolToIds = { ...symbolToIds };

  for (const [symbol, details] of Object.entries(symbolToDetails)) {
    if (!newSymbolToIds[symbol] && details && details.length === 1) {
      console.log(`Adding a new token: ${symbol}`);
      newSymbolToIds[symbol] = details[0].id;
    }
  }

  saveJSON({ ...newSymbolToIds, ...hardcodedValues }, SYMBOL_TO_ID_PATH);
}

function readJSON(path) {
  const data = fs.readFileSync(path);
  return JSON.parse(data);
}

function saveJSON(obj, path) {
  console.log(`Saving updated symbol-to-id object to: ${path}`);
  const content = JSON.stringify(obj, null, 2) + "\n";
  fs.writeFileSync(path, content);
}

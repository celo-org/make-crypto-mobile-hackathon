const _ = require("lodash");
const allSupportedConfig =
  require("../../manifests/main.json");
const coingeckoTokens =
  require("../../src/fetchers/coingecko/coingecko-symbol-to-details.json");

const hardcodedNames = {
  SOL: "Solana",
  EUR: "Euro",
  GBP: "Pound sterling",
  wNXM: "Wrapped NXM",
  sUSD: "sUSD",
  JPY: "Japanese yen",
  CHF: "Swiss Franc",
  YFV: "YFValue",
  AUD: "Australian dollar",
};

main();

async function main() {
  const tokens = Object.keys(allSupportedConfig.tokens);

  printTokensObj(tokens);
}

function printTokensObj(tokens) {
  let result = "{\n";
  for (const token of tokens) {
    let comment = "------------------- TODO -------------------";
    if (hardcodedNames[token]) {
      comment = hardcodedNames[token];
    } else if (coingeckoTokens[token]) {
      comment = _.last(coingeckoTokens[token]).name;
    }
    result +=
`
  /**
   * ${comment}
   */
  "${token}": "${token}",
`;
  }
  result += "}\n";
  console.log(result);
}

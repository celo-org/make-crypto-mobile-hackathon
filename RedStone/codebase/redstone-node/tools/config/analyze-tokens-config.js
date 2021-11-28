const tokensConfig = require("../../src/config/tokens.json");
const manifests = {
  "redstone-rapid": require("../../manifests/rapid.json"),
  "redstone-stocks": require("../../manifests/stocks.json"),
  "redstone": require("../../manifests/main.json"),
};

const IMG_URL_FOR_EMPTY_LOGO = "https://cdn.redstone.finance/symbols/logo-not-found.png";
const ONLY_ACTIVE_SYMBOLS = false;

main();


function main() {
  const report = {
    total: 0,
    noDetails: 0,
    noLogoURI: 0,
    emptyLogo: 0,
    ipfsLogoURI: 0,
    noName: 0,
    noUrl: 0,
    tags: {},
    providers: {},
    symbolsWithoutLogo: [],
    symbolsWithEmptyLogo: [],
  };

  const activeSymbols = getAllActiveTokens();
  const allSymbols = Object.keys(tokensConfig);
  const symbols = ONLY_ACTIVE_SYMBOLS ? activeSymbols : allSymbols;

  for (const symbol of symbols) {
    report.total++;

    const details = tokensConfig[symbol];

    if (!details) {
      report.noDetails++;
    } else {
      if (!details.logoURI) {
        report.noLogoURI++;
        report.symbolsWithoutLogo.push(symbol);
      } else {
        if (details.logoURI.startsWith("ipfs")) {
          report.ipfsLogoURI++;
        }
        if (details.logoURI === IMG_URL_FOR_EMPTY_LOGO) {
          report.emptyLogo++;
          report.symbolsWithEmptyLogo.push(symbol);
        }
      }

      if (!details.name) {
        report.noName++;
      }

      if (!details.url) {
        report.noUrl++;
      }

      if (details.tags) {
        for (const tag of details.tags) {
          if (report.tags[tag]) {
            report.tags[tag]++;
          } else {
            report.tags[tag] = 1;
          }
        }
      }

      for (const provider of details.providers) {
        if (report.providers[provider]) {
          report.providers[provider]++;
        } else {
          report.providers[provider] = 1;
        }
      }
    }
  }

  console.log(JSON.stringify(report, null, 2));
}

function getAllActiveTokens() {
  const symbols = {};
  for (const manifest of Object.values(manifests)) {
    for (const symbol of Object.keys(manifest.tokens)) {
      symbols[symbol] = 1;
    }
  }
  return Object.keys(symbols);
}

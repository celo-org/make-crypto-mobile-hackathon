const ccxt = require("ccxt");
const fs = require("fs");
const predefinedSourcesConfig = require("./predefined-configs/sources.json");
const fetchers = require("../../dist/src/fetchers/index");

// NOTE! Before running this script you should build redstone-node source code
// to dist folder (use `yarn build`)

const OUTPUT_FILE = "./src/config/sources.json";

main();

async function main() {
  const config = getSourcesConfig();

  const path = OUTPUT_FILE;
  console.log(`Saving sources list to: ${path}`);
  fs.writeFileSync(path, JSON.stringify(config, null, 2) + "\n");
}

function getSourcesConfig() {
  const sourcesConfig = {};
  const fetcherNames = Object.keys(fetchers.default);

  for (const fetcherName of fetcherNames) {
    sourcesConfig[fetcherName] = getSourceDetails(fetcherName);
  }

  return sourcesConfig;
}

function getSourceDetails(sourceName) {
  let details = {};

  if (predefinedSourcesConfig[sourceName]) {
    details = predefinedSourcesConfig[sourceName];
  } else {
    details = getSourceDetailsWithCcxt(sourceName);
  }

  return details;
}

function getSourceDetailsWithCcxt(sourceName) {
  const exchange = new ccxt[sourceName]();

  return {
    logoURI: exchange.urls.logo,
    url: exchange.urls.www,
  };
}

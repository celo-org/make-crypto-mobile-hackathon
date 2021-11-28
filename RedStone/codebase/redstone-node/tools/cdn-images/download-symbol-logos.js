const download = require("download");
const fs = require("fs");
const _ = require("lodash");
const cdnUtils = require("./cdn-utils");
const tokens = require("../../src/config/tokens.json");
const manifests = {
  "redstone-rapid": require("../../manifests/rapid.json"),
  "redstone-stocks": require("../../manifests/stocks.json"),
  "redstone": require("../../manifests/main.json"),
};

const IMG_URL_FOR_EMPTY_LOGO = "https://cdn.redstone.finance/symbols/logo-not-found.png";
const TARGET_FOLDER = "./symbol-logos-active";
const DOWNLOAD_CHUNK_SIZE = 20;
const ONLY_ACTIVE_SYMBOLS = false;

let failsCount = 0;

main();

async function main() {
  createTargetFolderIfNeeded();

  const activeSymbols = getActiveSymbols();
  const symbols = ONLY_ACTIVE_SYMBOLS ? activeSymbols : Object.keys(tokens);

  for (const chunk of _.chunk(symbols, DOWNLOAD_CHUNK_SIZE)) {
    const promises = [];
    for (const symbol of chunk) {
      const logoURI = tokens[symbol].logoURI;
      if (logoURI) {
        promises.push(downloadImage(logoURI, symbol));
      }
    }
    await Promise.all(promises);
  }

  console.log("Downloading completed!");
  console.log({ failsCount });
}

async function downloadImage(logoURI, symbol) {
  try {
    console.log(`Downloading ${symbol} logo from: ${logoURI}`);
    const filePath = getFilePathForSymbol(logoURI, symbol);
    const fileContent = await download(logoURI);
    fs.writeFileSync(filePath, fileContent);
  } catch (e) {
    console.error(
      `Downloading failed for ${symbol}. Downloading image for empty logo...`);
    console.error(JSON.stringify(e));
    failsCount++;
    return await downloadImage(IMG_URL_FOR_EMPTY_LOGO, symbol);
  }
}

function getFilePathForSymbol(url, symbol) {
  const filename = cdnUtils.getFileName(symbol, url);
  return `${TARGET_FOLDER}/${filename}`;
}

function createTargetFolderIfNeeded() {
  if (!fs.existsSync(TARGET_FOLDER)){
    fs.mkdirSync(TARGET_FOLDER);
  }
}

function getActiveSymbols() {
  const symbols = {};
  for (const manifest of Object.values(manifests)) {
    for (const symbol of Object.keys(manifest.tokens)) {
      symbols[symbol] = 1;
    }
  }
  return Object.keys(symbols);
}


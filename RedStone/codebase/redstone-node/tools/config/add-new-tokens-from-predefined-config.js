const fs = require("fs");
const download = require("download");

const cdnUtils = require("../cdn-images/cdn-utils");
const config = require("../../src/config/tokens.json");
const predefinedTokensConfig = require("./predefined-configs/tokens.json");

const DOWNLOAD_IMAGES_FOR_NEW_TOKENS = true;
const USE_REDSTONE_CDN_URLS = true;
const OUTPUT_CONFIG_FILE = "./src/config/tokens.json"; // TODO: update
const OUTPUT_FOLDER_FOR_NEW_TOKEN_LOGOS = "./new-symbol-logos";

main();

async function main() {
  const newTokens = getNewTokens();
  console.log(
    "New tokens have been found",
    JSON.stringify(newTokens, null, 2));

  // Download images for the new tokens
  if (DOWNLOAD_IMAGES_FOR_NEW_TOKENS) {
    await downloadImagesForTokens(newTokens);
  }

  // Caculating the updated version of config
  const newConfig = { ...config };
  for (const [symbol, details] of Object.entries(newTokens)) {
    newConfig[symbol] = details;
    if (USE_REDSTONE_CDN_URLS) {
      newConfig[symbol].logoURI = cdnUtils.getSymbolLogoUrl(symbol, details.logoURI);
    }
  }

  // Saving config
  saveNewConfig(newConfig);
}

function getNewTokens() {
  const result = {};
  for (const [symbol, details] of Object.entries(predefinedTokensConfig)) {
    if (!config[symbol]) {
      result[symbol] = details;
    }
  }
  return result;
}

async function downloadImagesForTokens(newTokens) {
  // Folder creation
  const folder = OUTPUT_FOLDER_FOR_NEW_TOKEN_LOGOS;
  console.log(`Downloading token images to ${folder}`);
  if (!fs.existsSync(folder)){
    console.log(`Folder ${folder} does not exist. Creating...`);
    fs.mkdirSync(folder);
  } else {
    console.log(`Folder ${folder} already exists`);
  }

  // Image downloading
  for (const [symbol, details] of Object.entries(newTokens)) {
    const filename = cdnUtils.getFileName(symbol, details.logoURI);
    const filePath = folder + "/" + filename;
    console.log(`Downloading image for: ${symbol}. Saving to ${filePath}`);
    const fileContent = await download(details.logoURI);
    fs.writeFileSync(filePath, fileContent);
  }
}

function saveNewConfig(newConfig) {
  const path = OUTPUT_CONFIG_FILE;
  console.log(`Saving updated config to: ${path}`);
  fs.writeFileSync(path, JSON.stringify(newConfig, null, 2) + "\n");
}

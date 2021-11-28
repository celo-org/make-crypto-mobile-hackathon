const download = require("download");
const fs = require("fs");

const cdnUtils = require("./cdn-utils");
const sources = require("../config/predefined-configs/sources.json");

const TARGET_FOLDER = "./source-logos";

main();

async function main() {
  createTargetFolderIfNeeded();

  const promises = [];
  for (const source of Object.keys(sources)) {
    const logoURI = sources[source].logoURI;
    promises.push(downloadImage(logoURI, source));
  }
  await Promise.all(promises);
  console.log("Downloading completed!");
}

async function downloadImage(logoURI, sourceName) {
  try {
    console.log(`Downloading ${sourceName} logo from: ${logoURI}`);
    const filePath = getFilePathForSource(logoURI, sourceName);
    const fileContent = await download(logoURI);
    fs.writeFileSync(filePath, fileContent);
  } catch (e) {
    console.error(`Downloading failed for ${sourceName}`, e);
  }
}

function getFilePathForSource(url, sourceName) {
  const filename = cdnUtils.getFileName(sourceName, url);
  return `${TARGET_FOLDER}/${filename}`;
}

function createTargetFolderIfNeeded() {
  if (!fs.existsSync(TARGET_FOLDER)){
    fs.mkdirSync(TARGET_FOLDER);
  }
}

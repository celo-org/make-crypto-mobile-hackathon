const REDSTONE_CDN_URL_PREFIX = "https://cdn.redstone.finance";
const SOURCES_FOLDER = "sources";
const SYMBOLS_FOLDER = "symbols";

function getSourceLogoUrl(source, externalUrl) {
  const filename = getFileName(source, externalUrl);
  return `${REDSTONE_CDN_URL_PREFIX}/${SOURCES_FOLDER}/${filename}`;
}

function getSymbolLogoUrl(symbol, externalUrl) {
  const filename = getFileName(symbol, externalUrl);
  return `${REDSTONE_CDN_URL_PREFIX}/${SYMBOLS_FOLDER}/${filename}`;
}

function getFileName(id, externalUrl) {
  let extension = "png";
  if (externalUrl.includes(".svg")) {
    extension = "svg";
  } else if (externalUrl.includes(".jpeg")) {
    extension = "jpeg";
  } else if (externalUrl.includes(".jpg")) {
    extension = "jpg";
  }
  const nameWithSafeSymbols = id.toLowerCase().replace("/", "-");
  return `${nameWithSafeSymbols}.${extension}`;
}

module.exports = {
  getSourceLogoUrl,
  getSymbolLogoUrl,
  getFileName,
};

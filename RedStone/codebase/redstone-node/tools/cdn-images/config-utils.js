const fs = require("fs");

// Updates config to use images from RedStone CDN
function updateConfigLogos({
  pathToCurrentConfig,
  pathToNewConfig,
  fileUrlGetter,
  property = "logoURI",
}) {
  const config = require(pathToCurrentConfig);
  const newConfig = {};
  for (const id in config) {
    const details = config[id];
    const newLogoURI = fileUrlGetter(id, details[property]);
    newConfig[id] = {
      ...details,
      [property]: newLogoURI,
    };
  }

  console.log(`Updating config in file: ${pathToNewConfig}`);
  fs.writeFileSync(pathToNewConfig, JSON.stringify(newConfig, null, 2) + "\n");
}

module.exports = { updateConfigLogos };

const { updateConfigLogos } = require("./config-utils");
const { getSymbolLogoUrl } = require("./cdn-utils");

updateConfigLogos({
  pathToCurrentConfig: "../../src/config/tokens.json",
  pathToNewConfig: "./src/config/tokens.json",
  fileUrlGetter: getSymbolLogoUrl,
});

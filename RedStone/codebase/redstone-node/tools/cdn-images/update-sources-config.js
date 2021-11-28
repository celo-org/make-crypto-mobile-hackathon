const { updateConfigLogos } = require("./config-utils");
const { getSourceLogoUrl } = require("./cdn-utils");

updateConfigLogos({
  pathToCurrentConfig: "../../src/config/sources.json",
  pathToNewConfig: "./src/config/sources.json",
  fileUrlGetter: getSourceLogoUrl,
});

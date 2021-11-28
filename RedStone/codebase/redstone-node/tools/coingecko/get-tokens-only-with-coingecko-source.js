const allSupportedConfig =
  require("../../manifests/main.json");

main();

function main() {
  for (const token in allSupportedConfig.tokens) {
    const sources = allSupportedConfig.tokens[token].source;
    // console.log(sources);
    if (sources.length === 1 && sources[0] === "coingecko") {
      console.log(token);
    }
  }
}

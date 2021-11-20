const fs = require("fs");

task("unpause", "pause dogeGameline")
  .setAction(async () => {
    const contractsDir = config.paths.abis

console.log('network id ' + network.config.chainId)

    const dogeGameAddressesFile = contractsDir + "/DogeGame" + "." + network.config.chainId +  ".json"
    const dogeGameAddressJson = fs.readFileSync(dogeGameAddressesFile);
    const dogeGameAddress = JSON.parse(dogeGameAddressJson);
    const dogeGame = await ethers.getContractAt("DogeGame", dogeGameAddress);

    await dogeGame.unpause()

    console.log(`DogeGame unpaused`);
});

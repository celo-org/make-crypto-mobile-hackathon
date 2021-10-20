// We also save the contract's artifacts and address in the frontend directory
const saveFrontendFiles = ({artifact, address}) => {
  const fs = require("fs");
  const contractsDir = config.paths.abis

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/" + artifact.contractName + "." + network.config.chainId +  ".json",
    JSON.stringify(address)
  );

  fs.writeFileSync(
    contractsDir + "/" + artifact.contractName + ".json",
    JSON.stringify(artifact, null, 2)
  );
}

module.exports = {
  saveFrontendFiles
}

const hardutils = require('../libs/hardutils')

const nfts = (require('./dogeGameParams'))[0]

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const DogeGame = await ethers.getContractFactory("DogeGame")
  const dogeGame = await DogeGame.deploy(
    nfts
  )
  await dogeGame.deployed()

  console.log("DogeGame address:", dogeGame.address);

  // We also save the contract's artifacts and address in the frontend directory
  hardutils.saveFrontendFiles({
    artifact: artifacts.readArtifactSync('DogeGame'),
    address: dogeGame.address
  });

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

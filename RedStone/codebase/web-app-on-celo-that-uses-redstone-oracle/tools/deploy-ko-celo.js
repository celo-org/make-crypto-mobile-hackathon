const ethers = require("ethers");
const wallet = require("./celo-wallet");
const { WrapperBuilder } = require("redstone-flash-storage");
const provider = require("./ehters-provider");
const KoTokenCelo = require("../artifacts/contracts/KoTokenCELO.sol/KoTokenCELO");
const utils = require("./utils");

const toBytes32 = ethers.utils.formatBytes32String;

const GAS_LIMIT = 10000000;

async function deployKoTokenCELO(asset) {
  const addresses = {};
  const koFactory = new ethers.ContractFactory(KoTokenCelo.abi, KoTokenCelo.bytecode, wallet);
  
  // Contract deployment
  addresses.koToken = await utils.getNextContractAddress(wallet);
  let koToken = await koFactory.deploy({gasLimit: GAS_LIMIT});
  await koToken.deployed();
  console.log("KoTokenCelo deployed: " + addresses.koToken);
  koToken = new ethers.Contract(addresses.koToken, KoTokenCelo.abi, wallet);

  // Provider authorization
  const wrappedTokenContract = WrapperBuilder
    .wrapLite(koToken)
    .usingPriceFeed("redstone-stocks");
  const providerAuthTx = await wrappedTokenContract.authorizeProvider();
  await providerAuthTx.wait();
  console.log("Provider authorized: " + providerAuthTx.hash);
  addresses.providerAuthTx = providerAuthTx.hash;

  // Token init
  const initTx = await koToken.initialize(
    toBytes32(asset),
    `komodo-${asset}`,
    `k${asset}`
  );
  await initTx.wait();
  console.log("KoTokenCELO initialized: " + initTx.hash);
  addresses.initTx = initTx.hash;

  return addresses;
}

module.exports = deployKoTokenCELO;

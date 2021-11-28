const ethers = require("ethers");
const utils = require("./utils");
const { WrapperBuilder } = require("redstone-flash-storage");
const wallet = require("./celo-wallet");
const KoTokenCUSD = require("../artifacts/contracts/KoTokenCUSD.sol/KoTokenCUSD");
const { CUSD_ADDRESS } = require("./tools-config");

const toBytes32 = ethers.utils.formatBytes32String;

const GAS_LIMIT = 10000000;

async function deployKoTokenCUSD(asset) {
  const addresses = {};
  const koFactory = new ethers.ContractFactory(KoTokenCUSD.abi, KoTokenCUSD.bytecode, wallet);
  
  // Contract deployment
  addresses.koToken = await utils.getNextContractAddress(wallet);
  let koToken = await koFactory.deploy({gasLimit: GAS_LIMIT});
  await koToken.deployed();
  console.log("KoTokenCUSD deployed: " + addresses.koToken);
  koToken = new ethers.Contract(addresses.koToken, KoTokenCUSD.abi, wallet);

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
    CUSD_ADDRESS,
    `komodo-${asset}-cusd-collateral`,
    `k$${asset}`
  );
  await initTx.wait();
  console.log("KoTokenCUSD initialized: " + initTx.hash);
  addresses.initTx = initTx.hash;
  
  return addresses;
}

module.exports = deployKoTokenCUSD;

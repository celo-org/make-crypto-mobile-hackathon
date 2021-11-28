const ethers = require('ethers');
const fs = require('fs');
const { WrapperBuilder } = require("redstone-flash-storage");
const provider = require("./ehters-provider");

const toBytes32 = ethers.utils.formatBytes32String;

const PRIV = fs.readFileSync(".secret").toString().trim();

const main = new ethers.Wallet(PRIV, provider);
console.log("Main address: " + main.address);

const KO_TOKEN = require('../artifacts/contracts/KoTokenBoostedUSD.sol/KoTokenBoostedUSD');
const koFactory = new ethers.ContractFactory(KO_TOKEN.abi, KO_TOKEN.bytecode, main);

const { USDC_ADDRESS } = require("./tools-config");

async function deployKoToken(asset) {

  const addresses = {};

  // Contract deployment
  let koToken = await koFactory.deploy();
  await koToken.deployed();
  console.log("KoToken deployed: " + koToken.address);
  addresses.koToken = koToken.address;

  // Provider authorization
  const wrappedTokenContract = WrapperBuilder
    .wrapLite(koToken)
    .usingPriceFeed("redstone-stocks");
  const providerAuthTx = await wrappedTokenContract.authorizeProvider();
  await providerAuthTx.wait();
  console.log("Provider authorized: " + providerAuthTx.hash);
  addresses.providerAuthTx = providerAuthTx.hash;

  // Token initialization
  let initTx = await koToken.bInitialize(
    toBytes32(asset),
    USDC_ADDRESS,
    "komodo-" + asset,
    "k" + asset,
    "e0fba4fc209b4948668006b2be61711b7f465bae",
    "0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0"
  );
  await initTx.wait();
  console.log("Ko Token initialized: " + initTx.hash);
  addresses.koTokenInitTx = initTx.hash;

  return addresses;
}

module.exports = deployKoToken;

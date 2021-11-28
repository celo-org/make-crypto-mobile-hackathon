const ethers = require('ethers');
const fs = require('fs');
const { WrapperBuilder } = require("redstone-flash-storage");
const provider = require("./ehters-provider");
const KoTokenBoostedETH = require('../artifacts/contracts/KoTokenBoostedETH.sol/KoTokenBoostedETH');

const toBytes32 = ethers.utils.formatBytes32String;

const PRIV = fs.readFileSync(".secret").toString().trim();
const main = new ethers.Wallet(PRIV, provider);
console.log("Main address: " + main.address);

const koFactory = new ethers.ContractFactory(KoTokenBoostedETH.abi, KoTokenBoostedETH.bytecode, main);

const WETH_GATEWAY_ADDRESS = "0xa61ca04df33b72b235a8a28cfb535bb7a5271b70";
const ETH_LENDING_POOL = "0xe0fba4fc209b4948668006b2be61711b7f465bae";
const AWETH = "0x87b1f4cf9bd63f7bbd3ee1ad04e8f52540349347";

async function deployKoTokenLite(asset) {

  const addresses = {};
  
  // Contract deployment
  let koToken = await koFactory.deploy();
  await koToken.deployed();
  console.log("KoTokenBoostedEth deployed: " + koToken.address);
  addresses.koToken = koToken.address;

  // Provider authorization
  const wrappedTokenContract = WrapperBuilder
    .wrapLite(koToken)
    .usingPriceFeed("redstone-stocks");
  const providerAuthTx = await wrappedTokenContract.authorizeProvider();
  await providerAuthTx.wait();
  console.log("Provider authorized: " + providerAuthTx.hash);
  addresses.providerAuthTx = providerAuthTx.hash;

  // Token Initializing 
  let initTx = await koToken.bInitialize(
    toBytes32(asset),
    "komodo-" + asset,
    "k" + asset,
    WETH_GATEWAY_ADDRESS,
    ETH_LENDING_POOL,
    AWETH
  );
  await initTx.wait();
  console.log("KoTokenBoostedEth initialized: " + initTx.hash);
  addresses.koTokenInitTx = initTx.hash;
  
  return addresses;
}

module.exports = deployKoTokenLite;

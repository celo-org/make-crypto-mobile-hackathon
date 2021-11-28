const ethers = require('ethers');
const wallet = require("./celo-wallet");
const { CUSD_ADDRESS, UBESWAP_FACTORY_ADDRESS } = require("./tools-config");
const UBESWAP_FACTORY_ABI = require("../abi/ubeswap-factory.json");
const ERC20_ABI = require("../abi/erc20.json");

const cusd = new ethers.Contract(CUSD_ADDRESS, ERC20_ABI, wallet);

async function createPool(tokenAddress) {
  const ubeswapFactory = getUbeswapFactoryContract(wallet);
  const tx = await ubeswapFactory.createPair(tokenAddress, cusd.address, {gasLimit: 5000000});

  await tx.wait();
  console.log("Pool created: " + tx.hash);

  return {   
    ubeswapTradeUrl: `https://app.ubeswap.org/#/swap?inputCurrency=${tokenAddress}&outputCurrency=${CUSD_ADDRESS}`,
    ubeswapPoolUrl: `https://app.ubeswap.org/#/add/${tokenAddress}/${CUSD_ADDRESS}`,
    ubeswapPoolTx: tx.hash,
  };
}

function getUbeswapFactoryContract(wallet) {
  return new ethers.Contract(UBESWAP_FACTORY_ADDRESS, UBESWAP_FACTORY_ABI, wallet);
}


module.exports = {
  createPool,
};

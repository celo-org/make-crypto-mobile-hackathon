const ethers = require("ethers");
const { getContractAddress } = require('@ethersproject/address')

const toBytes32 = ethers.utils.formatBytes32String;
const fromBytes32 = ethers.utils.parseBytes32String;

const toEth = function(val) {
  return ethers.utils.parseEther(val.toString());
}
const toVal = function(val) {
  return ethers.utils.parseUnits(val.toString(), 26);
}
const toUsd = function(val) {
  return ethers.utils.parseUnits(val.toString(), 6);
}
const bigNumberPriceToNumber = function(bn) {
  return Number(ethers.utils.formatEther(bn));
}
const formatUsdcUnits = function(bn) {
  return Number(ethers.utils.formatUnits(bn, 6));
}
const formatBigUsdVal = function(bn) {
  return Number(ethers.utils.formatUnits(bn, 26));
}

async function getNextContractAddress(wallet) {
  const txCount = await wallet.getTransactionCount();
  const futureAddress = getContractAddress({
    from: wallet.address,
    nonce: txCount
  });

  return futureAddress;
}

module.exports = {
  toBytes32,
  fromBytes32,

  toEth,
  toVal,
  toUsd,

  bigNumberPriceToNumber,
  formatUsdcUnits,
  formatBigUsdVal,

  getNextContractAddress,
};

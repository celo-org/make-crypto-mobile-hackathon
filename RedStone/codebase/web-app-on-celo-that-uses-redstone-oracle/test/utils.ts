import { ethers } from "hardhat";

const toBytes32 = ethers.utils.formatBytes32String;
const fromBytes32 = ethers.utils.parseBytes32String;

function mockPrices(values: { [symbol: string]: number }) {
  return (forTime: number) => ({
    prices: Object.entries(values).map(([symbol, value]) => ({
      symbol,
      value,
    })),
    timestamp: forTime - 5000,
  });
}

async function syncTime() {
  const now = Math.ceil(new Date().getTime() / 1000);
  try {
    await ethers.provider.send('evm_setNextBlockTimestamp', [now]);
  } catch (error) {
    // Skipping time sync - block is ahead of current time
  }
};

const toEth = function(val: Number) {
  return ethers.utils.parseEther(val.toString());
}
const toVal = function(val: Number) {
  return ethers.utils.parseUnits(val.toString(), 26);
}
const toUsd = function(val: Number) {
  return ethers.utils.parseUnits(val.toString(), 6);
}

export default {
  toBytes32,
  fromBytes32,
  mockPrices,
  syncTime,

  toEth,
  toVal,
  toUsd,
};

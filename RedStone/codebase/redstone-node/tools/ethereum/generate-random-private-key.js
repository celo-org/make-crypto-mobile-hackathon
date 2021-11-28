const { ethers } = require("ethers");

function main() {
  const ethereumPrivateKey = ethers.Wallet.createRandom().privateKey;
  console.log(ethereumPrivateKey);
}

main();

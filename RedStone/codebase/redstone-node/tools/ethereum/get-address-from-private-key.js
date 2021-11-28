const { ethers } = require("ethers");

main();

function main() {
  const myArgs = process.argv.slice(2);
  const privateKey = myArgs[0];
  const address = new ethers.Wallet(privateKey).address;
  console.log(`Address for priate key "${privateKey}" is: ${address}`);
}

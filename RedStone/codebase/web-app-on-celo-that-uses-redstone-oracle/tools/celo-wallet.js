const { CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const fs = require("fs");
const provider = require("./ehters-provider");

const PRIV = fs.readFileSync(".secret").toString().trim();

const wallet = new CeloWallet(PRIV, provider);

console.log("Used wallet: " + wallet.address);

module.exports = wallet;

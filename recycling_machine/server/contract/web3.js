const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

const alfajoresProvider = new HDWalletProvider(
  process.env.PRIVATE_KEY,
  process.env.CELO_ALFAJORES_RPC_URL);

const web3Alfajores = new Web3(alfajoresProvider);

module.exports = {
  web3Alfajores,
};

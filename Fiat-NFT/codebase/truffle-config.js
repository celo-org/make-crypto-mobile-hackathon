const path = require ('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require("dotenv").config();
const { privateKey, mnemonic, infuraKey, ethMnemonic } = process.env;

const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');
const web3 = new Web3(process.env.REST_URL);
const client = ContractKit.newKitFromWeb3(web3);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
client.addAccount(account.privateKey);

// const infuraKey = "fj4zzjll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {

  contracts_build_directory: path.join(__dirname, "client/src/abis"),
  networks: {

     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

     rinkeby : {
       provider : ()=>
         new HDWalletProvider (
           ethMnemonic,
           `wss://rinkeby.infura.io/ws/v3/${infuraKey}`,
           0,
           3
         ),
         network_id: 4,
         skipDryRun: true,
         websockets: true

     },

     alfajores: {
      provider: client.connection.web3.currentProvider, // CeloProvider
      network_id: 44787  // latest Alfajores network id
    }

  },

  mocha: {
  },

  compilers: {
    solc: {
       version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
         optimizer: {
          enabled: true,
          runs: 100
        },
      //  evmVersion: "byzantium"
       }
    }
  },

  db: {
    enabled: false
  }
};

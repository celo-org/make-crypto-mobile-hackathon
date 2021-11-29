const Web3 = require('web3');
const ContractKit = require('@celo/contractkit');
require('dotenv').config();

const alfajoresKit = () => {
  const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
  const kit = ContractKit.newKitFromWeb3(web3);

  const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

  kit.connection.addAccount(account.privateKey);
  return kit;
};

module.exports = {
  networks: {
    local: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: '*' // Any network (default: none)
    },
    alfajores: {
      provider: alfajoresKit().connection.web3.currentProvider, // CeloProvider
      network_id: '44787' // latest Alfajores network id
    }
  },

  compilers: {
    solc: {
      version: "^0.8.0"
    }
  },
  contracts_build_directory: './abi',
};


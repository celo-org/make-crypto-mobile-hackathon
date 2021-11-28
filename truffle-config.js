const Web3 = require('web3');

module.exports = {
  networks: {
  local: {
    host: '127.0.0.1', // Localhost (default: none)
    port: 8545, // Standard Ethereum port (default: none)
    network_id: '*' // Any network (default: none)
  }
  },
  contracts_directory: './src/contracts',
  contracts_build_directory: './src/abis',

  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "^0.8.0" 
    }
  }
};
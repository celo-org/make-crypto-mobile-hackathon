/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const mnemonic = process.env.NOMIC

;module.exports = {
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      }
    }
  },
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      chainId: 31337,
      accounts: {
        mnemonic
      },
    },
    hardhat: {
      accounts: {
        mnemonic
      },
    },
  },
  paths: {
    abis: __dirname + '/abis'
  }
}

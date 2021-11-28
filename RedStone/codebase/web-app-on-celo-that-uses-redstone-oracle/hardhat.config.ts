import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
import "hardhat-gas-reporter"

export default {
  solidity: {
    compilers: [
      {
      version: "0.8.2",
      },
      {
        version: "0.6.12",
      }
  ]},
  networks: {
    hardhat: {
      chainId: 7
    }
  }
};


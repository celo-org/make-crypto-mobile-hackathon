import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { fornoURLs, ICeloNetwork } from "@ubeswap/hardhat-celo";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      url: fornoURLs[ICeloNetwork.MAINNET],
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: ICeloNetwork.MAINNET,
      gasPrice: 0.5 * 10 ** 9,
      gas: 8000000,
    },
    alfajores: {
      url: fornoURLs[ICeloNetwork.ALFAJORES],
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: ICeloNetwork.ALFAJORES,
      gasPrice: 0.5 * 10 ** 9,
      gas: 8000000,
    },
  },
  gasReporter: {
    enabled: !!process.env.REPORT_GAS,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./farm-bot/codebase/contracts",
    artifacts: "./farm-bot/codebase/artifacts",
    cache: "./farm-bot/codebase/hardhat-cache",
  },
};

export default config;

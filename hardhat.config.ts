import * as dotenv from "dotenv";

import * as path from "path";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { ActionType, HDAccountsUserConfig } from "hardhat/types";
import { fornoURLs, ICeloNetwork, makeDeployTask } from "@ubeswap/hardhat-celo";
import { main } from './farm-bot/codebase/scripts/deploy'

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const deployers = {
  'deploy-bot': main
}

task("deploy", "Deploys a step", (async (...args) =>
  (await makeDeployTask({
    deployers,
    rootDir: path.resolve(__dirname)
  })).deploy(...args)) as ActionType<{
    step: string;
  }>).addParam("step", "The step to deploy");

const accounts: HDAccountsUserConfig = {
  mnemonic:
    process.env.MNEMONIC ||
    "test test test test test test test test test test test junk",
  path: "m/44'/52752'/0'/0/",
};
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      url: fornoURLs[ICeloNetwork.MAINNET],
      accounts,
      //process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: ICeloNetwork.MAINNET,
      gasPrice: 0.5 * 10 ** 9,
      gas: 8000000,
    },
    alfajores: {
      url: fornoURLs[ICeloNetwork.ALFAJORES],
      accounts,
      //process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
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

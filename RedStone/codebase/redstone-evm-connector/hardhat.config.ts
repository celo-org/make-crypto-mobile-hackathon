import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-typechain";
import "hardhat-deploy";
import fs from "fs";

const pathToSecrets = "./.secret.json";
const secrets = fs.existsSync(pathToSecrets)
    ? require(pathToSecrets)
    : require("./sample.secret.json");

export default {
    solidity: "0.8.4",
    networks: {
        hardhat: {
            chainId: 7
        },
        kovan: {
            url: `https://eth-kovan.alchemyapi.io/v2/ET4VByJfAKxqeIn6Trsw-lcWEsA1yzB1`,
            //0xDd662cDCCdcfBA01519d6f5c9882e28EB3412745
            accounts: [secrets.testPrivKey],
        },
    },
    paths: {
        tests: "./test/"
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
            41: secrets.testPrivKey
        }
    }
};


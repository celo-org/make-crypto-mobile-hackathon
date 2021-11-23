import { DeployerFn } from '@ubeswap/hardhat-celo';
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// import { ethers } from "hardhat";

import {
  FarmBot__factory
 } from '../../../typechain/factories/FarmBot__factory'

export const main: DeployerFn<{}> = async ({
  deployCreate2,
  deployer,
  provider
}) => {

  const farmBot = await deployCreate2('FarmBot_1', {
    factory: FarmBot__factory,
    signer: deployer,
    args: [],
  })

  return {
    FarmBot: farmBot.address
  }
}

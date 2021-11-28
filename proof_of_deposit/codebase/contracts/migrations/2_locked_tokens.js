const Web3 = require('web3');

const LockedCGLD = artifacts.require("LockedCGLD");
const LockedCUSD = artifacts.require("LockedCUSD");
const LockedCEUR = artifacts.require("LockedCEUR");
const AddressSortedLinkedList = artifacts.require("AddressSortedLinkedList");
const FixidityLib = artifacts.require("FixidityLib");
const Election = artifacts.require("Election");
const CGLDAddress = require('../abis/CGLD.json').networks["44787"].address;
const CUSDAddress = require('../abis/CUSD.json').networks["44787"].address;
const CEURAddress = require('../abis/CEUR.json').networks["44787"].address;

module.exports = async function (deployer) {
  deployer.then(async () => {
    // Deploy Locked Tokens
    await deployer.deploy(LockedCGLD, CGLDAddress, 10); // seconds to unlock
    const locked_cgld = await LockedCGLD.deployed();
    await deployer.deploy(LockedCUSD, CUSDAddress, 10); // seconds to unlock
    const locked_cusd = await LockedCUSD.deployed();
    await deployer.deploy(LockedCEUR, CEURAddress, 10); // seconds to unlock
    const locked_ceur = await LockedCEUR.deployed();

    // link libs to Election
    await deployer.deploy(AddressSortedLinkedList);
    await deployer.link(AddressSortedLinkedList, Election);
    await deployer.deploy(FixidityLib);
    await deployer.link(FixidityLib, Election);

    // Deploy Election
    const toWei = Web3.utils.toWei;
    await deployer.deploy(
      Election, 
      [locked_cgld.address, locked_cusd.address, LockedCEUR.address], // token addresses
      ["50", "25", "25"], // token weights. 
      [
        "0x000000000000000000000000000000000000000A",
        "0x000000000000000000000000000000000000000B",
        "0x000000000000000000000000000000000000000C",
        "0x000000000000000000000000000000000000000D"
      ], // validator group addresses
      [
        [toWei("900"), toWei("1800"), toWei("2700"), toWei("3600")],
        [toWei("600"), toWei("1150"), toWei("280"), toWei("900")],
        [toWei("400"), toWei("1700"), toWei("1300"), toWei("900")],
      ], // validator default votes
      [
        ["0", "1", "2", "3"],
        ["2", "0", "3", "1"],
        ["0", "3", "2", "1"],
      ], // ordering
      2, // max number groups to vote for
      "0xe3d8bd6aed4f159bc8000a9cd47cffdb95f96121", // SWAP ADDRESS
      CGLDAddress
    );
    const election = await Election.deployed();

    // Update Locked Tokens with Election Address
    await locked_cgld.setElection(election.address);
    await locked_cusd.setElection(election.address);
    await locked_ceur.setElection(election.address);
  })
};

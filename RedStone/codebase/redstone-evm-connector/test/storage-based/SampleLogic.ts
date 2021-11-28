import {ethers} from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { SampleStorageBased } from "../../typechain/SampleStorageBased";
import { MockPriceFeed } from "../../typechain/MockPriceFeed";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity);
const { expect } = chai;

const toBytes32 = ethers.utils.formatBytes32String;

//This test suite test a simple StorageBased contract that simulates typical Defi Behaviour
describe("Sample Storage Based", function () {
    let owner:SignerWithAddress;
    let sample: SampleStorageBased;
    let priceFeed: MockPriceFeed;


    it("should deploy contracts", async function () {
        [owner] = await ethers.getSigners();

        const SampleStorageBased = await ethers.getContractFactory("SampleStorageBased");
        const MockPriceFeed = await ethers.getContractFactory("MockPriceFeed");

        priceFeed = (await MockPriceFeed.deploy()) as MockPriceFeed;
        sample = (await SampleStorageBased.deploy()) as SampleStorageBased;
        await sample.initialize(priceFeed.address);
    });


    it("should deposit ETH", async function () {
        await priceFeed.setPrice(toBytes32("ETH"), 10);
        await sample.deposit(toBytes32("ETH"), 100);

        expect(await sample.balanceOf(owner.address, toBytes32("ETH"))).to.be.equal(100);
    });


    it("should check ETH value with prices", async function () {
        expect(await sample.currentValueOf(owner.address, toBytes32("ETH"))).to.be.equal(1000);
    });


    it("should deposit AVAX", async function () {
        await priceFeed.setPrice(toBytes32("AVAX"), 5);
        await sample.deposit(toBytes32("AVAX"), 50);

        expect(await sample.balanceOf(owner.address, toBytes32("AVAX"))).to.be.equal(50);
    });


    it("should check AVAX value with prices", async function () {
        expect(await sample.currentValueOf(owner.address, toBytes32("AVAX"))).to.be.equal(250);
    });


    it("should swap ETH to AVAX", async function () {
        await sample.swap(toBytes32("ETH"), toBytes32("AVAX"), 10);

        expect(await sample.balanceOf(owner.address, toBytes32("ETH"))).to.be.equal(90);
        expect(await sample.balanceOf(owner.address, toBytes32("AVAX"))).to.be.equal(70);

        expect(await sample.currentValueOf(owner.address, toBytes32("ETH"))).to.be.equal(900);
        expect(await sample.currentValueOf(owner.address, toBytes32("AVAX"))).to.be.equal(350);
    });

});

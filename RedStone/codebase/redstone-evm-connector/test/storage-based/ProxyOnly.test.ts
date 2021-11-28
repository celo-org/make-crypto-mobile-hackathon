import {ethers} from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { SampleStorageBased } from "../../typechain/SampleStorageBased";
import { MockPriceFeed } from "../../typechain/MockPriceFeed";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity);
const { expect } = chai;


//We test proxy functionality without any pricing data attached
describe("Sample Storage contract with Proxy contract but no pricing data", function() {


  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let sample: SampleStorageBased;
  let priceFeed: MockPriceFeed;

  const toBytes32 = ethers.utils.formatBytes32String;

  it("Deployment should have zero balance", async function() {
    [owner, admin] = await ethers.getSigners();

    const Defi = await ethers.getContractFactory("SampleStorageBased");
    const Proxy = await ethers.getContractFactory("RedstoneUpgradeableProxy");
    const PriceFeed = await ethers.getContractFactory("MockPriceFeed");


    priceFeed = (await PriceFeed.deploy()) as MockPriceFeed;
    sample = (await Defi.deploy()) as SampleStorageBased;

    const proxy = await Proxy.deploy(sample.address, priceFeed.address, admin.address, []);

    sample = (await Defi.attach(proxy.address)) as SampleStorageBased;
    await sample.initialize(priceFeed.address);
    
  });


  it("Should send a simple write transaction via proxy contract", async function() {

    await priceFeed.setPrice(toBytes32("ETH"), 10);
    await sample.deposit(toBytes32("ETH"), 100);

  });


  it("Should send a simple read transaction via proxy contract", async function() {

    expect(await sample.balanceOf(owner.address, toBytes32("ETH"))).to.be.equal(100);
    expect(await sample.currentValueOf(owner.address, toBytes32("ETH"))).to.be.equal(1000);

  });


  it("Should send a reverted transaction via proxy contract", async function() {
    await expect(sample.deposit(toBytes32("ETH"), 0)).to.be.revertedWith("Amount must be greater than zero");
  });

});

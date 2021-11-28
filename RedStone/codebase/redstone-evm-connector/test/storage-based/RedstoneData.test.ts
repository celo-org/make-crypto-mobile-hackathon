import {ethers} from "hardhat";
import chai from "chai";
import {solidity} from "ethereum-waffle";
import {SampleStorageBased} from "../../typechain/SampleStorageBased";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import redstone from 'redstone-api';
import {PriceFeed} from "../../typechain/index";
import WrapperBuilder from "../../utils/v2/impl/builder/WrapperBuilder";

chai.use(solidity);

const {expect} = chai;

const toBytes32 = ethers.utils.formatBytes32String;
const serialized = function (x: number): number {
  return x * 10 ** 8;
};

describe("MockDefi with Proxy contract and real pricing Data", function () {

  const REDSTONE_STOCKS_PROVIDER_ADDRESS = "0x926E370fD53c23f8B71ad2B3217b227E41A92b12";

  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let defi: SampleStorageBased;
  let priceFeed: PriceFeed;
  let apiPrices: any;

  async function loadApiPrices() {
    apiPrices = await redstone.getAllPrices({
      provider: "redstone-stocks",
    });
  }

  it("Deployment should have zero balance", async function () {
    [owner, admin] = await ethers.getSigners();

    const Defi = await ethers.getContractFactory("SampleStorageBased");
    const Proxy = await ethers.getContractFactory("RedstoneUpgradeableProxyWithoutClearing");
    const PriceFeed = await ethers.getContractFactory("PriceFeed");

    priceFeed = (await PriceFeed.deploy()) as PriceFeed;
    await priceFeed.authorizeSigner(REDSTONE_STOCKS_PROVIDER_ADDRESS);

    defi = (await Defi.deploy()) as SampleStorageBased;

    const proxy = await Proxy.deploy(defi.address, priceFeed.address, admin.address, []);

    defi = (await Defi.attach(proxy.address)) as SampleStorageBased;
    await defi.initialize(priceFeed.address);

  });


  it("Should deposit - write no pricing info multi", async function () {

    defi = WrapperBuilder
      .wrap(defi)
      .usingPriceFeed("redstone-stocks");

    await defi.deposit(toBytes32("GOOG"), 1);
    await defi.deposit(toBytes32("IBM"), 1);

  });


  it("Should inject correct prices from API multi", async function () {

    await loadApiPrices();

    expect(await defi.currentValueOf(owner.address, toBytes32("GOOG")))
      .to.be.equal(serialized(apiPrices['GOOG'].value).toFixed(0));
    expect(await defi.currentValueOf(owner.address, toBytes32("IBM")))
      .to.be.equal(serialized(apiPrices['IBM'].value).toFixed(0));

  });


  it("Should deposit - write no pricing info single", async function () {

    defi = WrapperBuilder
      .wrap(defi)
      .usingPriceFeed("redstone-stocks", "FB");

    await Promise.all([
      defi.deposit(toBytes32("FB"), 1),
      loadApiPrices(),
    ]);

  });


  it("Should inject correct prices from API single", async function () {
    expect(await defi.currentValueOf(owner.address, toBytes32("FB")))
      .to.be.equal(serialized(apiPrices['FB'].value).toFixed(0));
  });


});

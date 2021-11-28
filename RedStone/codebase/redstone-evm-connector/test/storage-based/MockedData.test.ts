import {ethers} from "hardhat";
import {Wallet} from "ethers";
import chai from "chai";
import {solidity} from "ethereum-waffle";
import {SampleStorageBased} from "../../typechain/SampleStorageBased";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {syncTime} from "../_helpers";

import {PriceFeedWithClearing} from "../../typechain/PriceFeedWithClearing";
import {EthersContractWrapper} from "../../utils/v2/impl/EthersContractWrapper";
import {DEFAULT_PRICE, MockableContract} from "../../utils/v2/impl/builder/MockableEthersContractWrapperBuilder";
import WrapperBuilder from "../../utils/v2/impl/builder/WrapperBuilder";

chai.use(solidity);

const {expect} = chai;

const toBytes32 = ethers.utils.formatBytes32String;
const serialized = function (x: number): number {
  return x * 10 ** 8;
};

describe("MockDefi with Proxy contract and mock pricing Data", function () {

  const PRIV = "0xae2b81c1fe9e3b01f060362f03abd0c80a6447cfe00ff7fc7fcf000000000000";

  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let defi: MockableContract<SampleStorageBased>;
  let priceFeed: PriceFeedWithClearing;
  let signer: Wallet;

  it("Deployment should have zero balance", async function () {
    [owner, admin] = await ethers.getSigners();

    const Defi = await ethers.getContractFactory("SampleStorageBased");
    const Proxy = await ethers.getContractFactory("RedstoneUpgradeableProxy");
    const PriceFeedWithClearing = await ethers.getContractFactory("PriceFeedWithClearing");

    signer = new ethers.Wallet(PRIV, owner.provider);

    priceFeed = (await PriceFeedWithClearing.deploy()) as PriceFeedWithClearing;
    await priceFeed.authorizeSigner(signer.address);

    defi = (await Defi.deploy()) as MockableContract<SampleStorageBased>;

    const proxy = await Proxy.deploy(defi.address, priceFeed.address, admin.address, []);

    defi = (await Defi.attach(proxy.address)) as MockableContract<SampleStorageBased>;
    await defi.initialize(priceFeed.address);

    defi = defi.connect(signer);

    await owner.sendTransaction({to: signer.address, value: ethers.utils.parseEther("1")});

  });


  it("Should deposit - write no pricing info", async function () {

    defi = WrapperBuilder
      .mock(defi)
      .using(DEFAULT_PRICE);

    await syncTime();
    await defi.deposit(toBytes32("ETH"), 100);
    await defi.deposit(toBytes32("AVAX"), 50);

  });


  it("Should check balance - read no pricing info", async function () {
    await syncTime();
    expect(await defi.balanceOf(signer.address, toBytes32("ETH"))).to.be.equal(100);
    expect(await defi.balanceOf(signer.address, toBytes32("AVAX"))).to.be.equal(50);
  });


  it("Should check value - read with pricing info", async function () {

    defi.mockPrice((forTime: number) => {
      return {
        prices: [
          {symbol: "ETH", value: 200},
          {symbol: "AVAX", value: 4}
        ],
        timestamp: forTime - 1000
      }
    });

    await syncTime();

    expect(await defi.currentValueOf(signer.address, toBytes32("ETH"))).to.be.equal(serialized(100 * 200));
    expect(await defi.currentValueOf(signer.address, toBytes32("AVAX"))).to.be.equal(serialized(50 * 4));
  });

  it("Should check value - read with different pricing info", async function () {
    defi.mockPrice((forTime: number) => {
      return {
        prices: [
          {symbol: "ETH", value: 400},
          {symbol: "AVAX", value: 8}
        ],
        timestamp: forTime - 1000
      }
    });

    await syncTime();

    expect(await defi.currentValueOf(signer.address, toBytes32("ETH"))).to.be.equal(serialized(100 * 400));
    expect(await defi.currentValueOf(signer.address, toBytes32("AVAX"))).to.be.equal(serialized(50 * 8));
  });


  it("Should swap - write with pricing info", async function () {

    defi.mockPrice(DEFAULT_PRICE);
    await syncTime();
    let tx = await defi.swap(toBytes32("ETH"), toBytes32("AVAX"), 10);
    expect(tx).is.not.undefined;

    expect(await defi.balanceOf(signer.address, toBytes32("ETH"))).to.be.equal(90);
    expect(await defi.balanceOf(signer.address, toBytes32("AVAX"))).to.be.equal(70);

  });

});

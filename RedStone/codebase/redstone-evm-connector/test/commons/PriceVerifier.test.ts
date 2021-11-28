import {ethers} from "hardhat";
import {Wallet} from "ethers";
import chai from "chai";
import {solidity} from "ethereum-waffle";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

import {MockPriceVerifierProxy} from "../../typechain/MockPriceVerifierProxy";
import {PricePackage} from "redstone-node/dist/src/types";
import {PriceDataType} from "../../utils/v2/connector/PriceFeedConnector";
import EvmPriceSigner from "redstone-node/dist/src/signers/EvmPriceSigner";

chai.use(solidity);
const { expect } = chai;

describe("Price Verifier", function() {

  const PRIV = "0xae2b81c1fe9e3b01f060362f03abd0c80a6447cfe00ff7fc7fcf000000000000";

  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let signer: Wallet;
  let verifier: MockPriceVerifierProxy;
  const priceSigner = new EvmPriceSigner();

  it("Should deploy functions", async function() {
    [owner, admin] = await ethers.getSigners();

    const Verifier = await ethers.getContractFactory("MockPriceVerifierProxy");

    signer = new ethers.Wallet(PRIV, owner.provider);
    verifier = (await Verifier.deploy()) as MockPriceVerifierProxy;
  });


  //The verifier shouldn't validate the content - just the signature logic

  it("Should sign and verify empty price data", async function() {
    const pricePackage: PricePackage = {
      prices: [],
      timestamp: 1111
    };

    const signedData = priceSigner.signPricePackage(pricePackage, signer.privateKey);
    const serializedMessage = priceSigner.serializeToMessage(pricePackage) as PriceDataType;
    expect(await verifier.recoverDataSignerPublic(serializedMessage, signedData.signature)).equals(signer.address);
  });


  it("Should not verify price data with a signature for a different price", async function() {
    const pricePackage: PricePackage = {
      prices: [
        {symbol: "ETH", value: 1800}
      ],
      timestamp: 1111
    };

    const differentPricePackage:PricePackage = {
        prices: [
            {symbol: "ETH", value: 1799}
        ],
        timestamp: 1111
    };


    const signedData = priceSigner.signPricePackage(differentPricePackage, signer.privateKey);
    const serializedMessage = priceSigner.serializeToMessage(pricePackage) as PriceDataType;
    expect(await verifier.recoverDataSignerPublic(serializedMessage, signedData.signature)).not.equals(signer.address);
  });
  


  it("Should not verify price data with a signature for a different symbol", async function() {
      const pricePackage: PricePackage = {
          prices: [
              {symbol: "ETH", value: 1800}
          ],
          timestamp: 1111
      };

      const differentPricePackage:PricePackage = {
          prices: [
              {symbol: "ETH2", value: 1799}
          ],
          timestamp: 1111
      };


      const signedData = priceSigner.signPricePackage(differentPricePackage, signer.privateKey);
      const serializedMessage = priceSigner.serializeToMessage(pricePackage) as PriceDataType;
      expect(await verifier.recoverDataSignerPublic(serializedMessage, signedData.signature)).not.equals(signer.address);
  });


  it("Should not verify price data with a signature for a different timestamp", async function() {
      const pricePackage: PricePackage = {
          prices: [
              {symbol: "ETH", value: 1800}
          ],
          timestamp: 1111
      };

      const differentPricePackage:PricePackage = {
          prices: [
              {symbol: "ETH2", value: 1799}
          ],
          timestamp: 1112
      };


      const signedData = priceSigner.signPricePackage(differentPricePackage, signer.privateKey);
      const serializedMessage = priceSigner.serializeToMessage(pricePackage) as PriceDataType;
      expect(await verifier.recoverDataSignerPublic(serializedMessage, signedData.signature)).not.equals(signer.address);
  });


  it("Should sign and verify single price data", async function() {
      const pricePackage: PricePackage = {
          prices: [
              {symbol: "ETH", value: 1800}
          ],
          timestamp: 1111
      };

      const signedData = priceSigner.signPricePackage(pricePackage, signer.privateKey);
      const serializedMessage = priceSigner.serializeToMessage(pricePackage) as PriceDataType;
      expect(await verifier.recoverDataSignerPublic(serializedMessage, signedData.signature)).equals(signer.address);
  });


  it("Should sign and verify double price data", async function() {
      const pricePackage: PricePackage = {
          prices: [
              {symbol: "ETH", value: 1800},
              {symbol: "AR", value: 20}
          ],
          timestamp: 1111
      };

      const signedData = priceSigner.signPricePackage(pricePackage, signer.privateKey);
      const serializedMessage = priceSigner.serializeToMessage(pricePackage) as PriceDataType;
      expect(await verifier.recoverDataSignerPublic(serializedMessage, signedData.signature)).equals(signer.address);
  });


  it("Should sign and verify 10 price data", async function() {
      const pricePackage: PricePackage = {
          prices: [
              {symbol: "T1", value: 1},
              {symbol: "T2", value: 2},
              {symbol: "T3", value: 3},
              {symbol: "T4", value: 4},
              {symbol: "T5", value: 5},
              {symbol: "T6", value: 6},
              {symbol: "T7", value: 7},
              {symbol: "T8", value: 8},
              {symbol: "T9", value: 9},
              {symbol: "T10", value: 10},
          ],
          timestamp: 1111
      };

      const signedData = priceSigner.signPricePackage(pricePackage, signer.privateKey);
      const serializedMessage = priceSigner.serializeToMessage(pricePackage) as PriceDataType;
      expect(await verifier.recoverDataSignerPublic(serializedMessage, signedData.signature)).equals(signer.address);
  });


});










import { toBuffer, bufferToHex, keccak256 } from "ethereumjs-util";
import { ethers } from "ethers";
import sortDeepObjectArrays from "sort-deep-object-arrays";
import {
  signTypedMessage,
  recoverTypedMessage,
  personalSign,
  recoverPersonalSignature,
  TypedMessage,
} from "eth-sig-util";
import {
  PricePackage,
  ShortSinglePrice,
  SignedPricePackage,
  SerializedPriceData,
} from "../types";
import _ from "lodash";

interface MessageTypeProperty {
  name: string;
  type: string;
};
interface PriceDataMessageType {
  EIP712Domain: MessageTypeProperty[];
  PriceData: MessageTypeProperty[];
  [additionalProperties: string]: MessageTypeProperty[];
};

const PriceData = [
  { name: "symbols", type: "bytes32[]" },
  { name: "values", type: "uint256[]" },
  { name: "timestamp", type: "uint256" },
];

const EIP712Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" }
];

const serializePriceValue = (value: number) => Math.round(value * (10 ** 8));

export default class EvmPriceSigner {
  private _domainData: object;

  constructor(version: string = "0.4", chainId: number = 1) {
    this._domainData =  {
      name: "Redstone",
      version: version,
      chainId : chainId,
    };
  }

  getDataToSign(priceData: SerializedPriceData): TypedMessage<PriceDataMessageType> {
    return {
      types: {
        EIP712Domain,
        PriceData,
      },
      domain: this._domainData,
      primaryType: "PriceData",
      message: priceData as Record<string, any>,
    };
  }

  getLiteDataBytesString(priceData: SerializedPriceData): string {
    // Calculating lite price data bytes array
    let data = "";
    for (let i = 0; i < priceData.symbols.length; i++) {
      const symbol = priceData.symbols[i];
      const value = priceData.values[i];
      data += symbol.substr(2) + value.toString(16).padStart(64, "0");
    }
    data += Math.ceil(priceData.timestamp / 1000)
      .toString(16)
      .padStart(64, "0");

    return data;
  }

  private getLiteDataToSign(priceData: SerializedPriceData): string {
    const data = this.getLiteDataBytesString(priceData);
    const hash = bufferToHex(keccak256(toBuffer("0x" + data)));
    return hash;
  }

  calculateEvmSignature(priceData: SerializedPriceData, privateKey: string): string {
    const data = this.getDataToSign(priceData);
    return signTypedMessage(toBuffer(privateKey), { data }, "V4");
  }

  calculateLiteEvmSignature(priceData: SerializedPriceData, privateKey: string): string {
    const data = this.getLiteDataToSign(priceData);
    return personalSign(toBuffer(privateKey), { data });
  }

  serializeToMessage(pricePackage: PricePackage): SerializedPriceData {
    // We clean and sort prices to be sure that prices
    // always have the same format
    const cleanPricesData = pricePackage.prices.map(
      (p) => _.pick(p, ["symbol", "value"]));
    const sortedPrices = sortDeepObjectArrays(cleanPricesData);

    return {
      symbols: sortedPrices.map((p: ShortSinglePrice) =>
        ethers.utils.formatBytes32String(p.symbol)),
      values: sortedPrices.map((p: ShortSinglePrice) =>
        serializePriceValue(p.value)),
      timestamp: pricePackage.timestamp,
    };
  }

  signPricePackage(pricePackage: PricePackage, privateKey: string): SignedPricePackage {
    const serializedPriceData = this.serializeToMessage(pricePackage);
    return {
      pricePackage,
      signer: (new ethers.Wallet(privateKey)).address,
      signature: this.calculateEvmSignature(serializedPriceData, privateKey),
      liteSignature: this.calculateLiteEvmSignature(serializedPriceData, privateKey),
    };
  }

  verifySignature(signedPricePackage: SignedPricePackage): boolean {
    const serializedPriceData = this.serializeToMessage(signedPricePackage.pricePackage);
    const data = this.getDataToSign(serializedPriceData);

    const signer = recoverTypedMessage({
      data,
      sig: signedPricePackage.signature,
    });

    return signer.toUpperCase() === signedPricePackage.signer.toUpperCase();
  }

  verifyLiteSignature(signedPricePackage: SignedPricePackage): boolean {
    const serializedPriceData = this.serializeToMessage(signedPricePackage.pricePackage);
    const data = this.getLiteDataToSign(serializedPriceData);

    const signer = recoverPersonalSignature({
      data,
      sig: signedPricePackage.liteSignature,
    });

    return signer.toUpperCase() === signedPricePackage.signer.toUpperCase();
  }
}

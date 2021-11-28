// TODO: aren't those type available in the redstone-node lib?
import {MockPricePackage} from "./impl/MockPriceFeed";

export type PriceDataType = {
  symbols: string[],
  values: number[],
  timestamp: number
};

export type SignedPriceDataType = {
  priceData: PriceDataType,
  signer: string,
  signature: string,
  liteSignature: string
};

export interface PriceFeedConnector {
  getSignedPrice(): Promise<SignedPriceDataType>;
  getSigner(): Promise<string>
}

export interface MockablePriceFeedConnector extends PriceFeedConnector {
  mock(value: MockPricePackage): void;
}

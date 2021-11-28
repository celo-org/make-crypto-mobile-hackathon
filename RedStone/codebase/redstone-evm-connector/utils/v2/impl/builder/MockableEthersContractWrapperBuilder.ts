import {Contract} from "ethers";
import {MockPriceFeed, MockPricePackage} from "../../connector/impl/MockPriceFeed";
import {EthersContractWrapper} from "../EthersContractWrapper";
import {EthersContractWrapperLite} from "../EthersContractWrapperLite";
import {WrapperType} from "./EthersContractWrapperBuilder";

export type MockableContract<T extends Contract> = T & {
  mockPrice: (value: MockPricePackage) => void
};

export const DEFAULT_PRICE = (forTime: number) => ({
  prices: [
    {symbol: "ETH", value: 10},
    {symbol: "AVAX", value: 5}
  ],
  timestamp: forTime - 1000
});

export class MockableEthersContractWrapperBuilder<T extends Contract> {
  constructor(
    private readonly baseContract: T,
    private readonly wrapperType: WrapperType) {
  }

  using(mockPricePackage: MockPricePackage): MockableContract<T> {
    const mockConnector = new MockPriceFeed(mockPricePackage);
    const wrapper = this.wrapperType === "full"
      ? new EthersContractWrapper(this.baseContract, mockConnector)
      : new EthersContractWrapperLite(this.baseContract, mockConnector);
    const result = wrapper.finish();

    // exposing "mockPrice" method on input Contract
    (result["mockPrice"] as any) = mockConnector.mock;

    return result as MockableContract<T>;
  }
}

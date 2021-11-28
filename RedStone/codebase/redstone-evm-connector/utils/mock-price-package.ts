import {PricePackage} from "redstone-node/dist/src/types";

export function mockPricePackage(forTime: number): PricePackage {
  return {
    prices: [
      {symbol: "ETH", value: 10},
      {symbol: "AVAX", value: 5},
      {symbol: "IBM", value: 100},
    ],
    timestamp: forTime - 1000
  }
}

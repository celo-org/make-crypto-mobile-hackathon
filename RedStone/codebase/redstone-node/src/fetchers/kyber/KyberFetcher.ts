import axios from "axios";
import _ from "lodash";
import redstone from "redstone-api";
import { PricesObj } from "../../types";
import { BaseFetcher } from "../BaseFetcher";

const ETH_PAIRS_URL = "https://api.kyber.network/api/tokens/pairs";

export class KyberFetcher extends BaseFetcher {
  constructor() {
    super("kyber");
  }

  async fetchData() {
    return await axios.get(ETH_PAIRS_URL);
  }

  async extractPrices(response: any, symbols: string[]): Promise<PricesObj> {
    const lastEthPrice = (await redstone.getPrice("ETH")).value;

    const pricesObj: PricesObj = {};

    const pairs = response.data;
    for (const symbol of symbols) {
      const pair = pairs["ETH_" + symbol];
      if (pair !== undefined) {
        pricesObj[symbol] = lastEthPrice * pair.currentPrice;
      }
    }

    return pricesObj;
  }

};

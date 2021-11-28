import _ from "lodash";
import { BaseFetcher } from "../BaseFetcher";
import { PricesObj } from "../../types";
import CoinbaseProxy from "./CoinbaseProxy";


export class CoinbaseFetcher extends BaseFetcher {
  coinbaseProxy: CoinbaseProxy;

  constructor() {
    super("coinbase");
    this.coinbaseProxy = new CoinbaseProxy();
  }

  async fetchData(): Promise<any> {
    return await this.coinbaseProxy.getExchangeRates();
  }

  async extractPrices(response: any): Promise<PricesObj> {
    const pricesObj: { [symbol: string]: number } = {};

    const rates = response.data.rates;
    for (const symbol of Object.keys(rates)) {
      const exchangeRate = rates[symbol];
      pricesObj[symbol] = 1 / exchangeRate;
    }

    return pricesObj;
  }
};

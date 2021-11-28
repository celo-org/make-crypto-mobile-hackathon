import _ from "lodash";
import { PricesObj } from "../../types";
import { BaseFetcher } from "../BaseFetcher";
import YahooFinanceProxy from "./YahooFinanceProxy";

export class YfUnofficialFetcher extends BaseFetcher {
  private yahooFinanceProxy: YahooFinanceProxy;

  constructor() {
    super("yf-unofficial");
    this.yahooFinanceProxy = new YahooFinanceProxy();
  }

  async fetchData(symbols: string[]) {
    return await this.yahooFinanceProxy.getExchangeRates(symbols);
  }

  async extractPrices(response: any): Promise<PricesObj> {
    const pricesObj: { [symbol: string]: number } = {};

    for (const symbol of Object.keys(response)) {
      const details = response[symbol];

      let value: any = details.price.regularMarketPrice;
      if (isNaN(value)) {
        value = value.raw;
      }

      pricesObj[symbol] = value;
    }

    return pricesObj;
  }

};

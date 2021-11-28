import _ from "lodash";
import { PricesObj } from "../../types";
import { BaseFetcher } from "../BaseFetcher";
import CoingeckoProxy from "./CoingeckoProxy";

const symbolToId: { [symbol: string]: string } =
  require("./coingecko-symbol-to-id.json") as any;

export class CoingeckoFetcher extends BaseFetcher {
  private coingeckoProxy: CoingeckoProxy;
  private idToSymbol: { [id: string]: string } = {};

  constructor() {
    super("coingecko");
    this.coingeckoProxy = new CoingeckoProxy();
  }

  async fetchData(symbols: string[]): Promise<any> {
    this.updateIdToSymbolMapping(symbols);
    const ids = Object.keys(this.idToSymbol);
    return await this.coingeckoProxy.getExchangeRates(ids);
  }

  async extractPrices(response: any): Promise<PricesObj> {
    const pricesObj: { [symbol: string]: number } = {};

    const rates = response.data;
    for (const id of Object.keys(rates)) {
      const symbol = this.idToSymbol[id];
      pricesObj[symbol] = rates[id].usd;
    }

    return pricesObj;
  }

  private updateIdToSymbolMapping(symbols: string[]): void {
    for (const symbol of symbols) {
      const id = symbolToId[symbol];
      if (id !== undefined) {
        this.idToSymbol[id] = symbol;
      } else {
        this.logger.warn(
          `No mapping for "${symbol}" for ${this.name} source`);
      }
    }
  }
};

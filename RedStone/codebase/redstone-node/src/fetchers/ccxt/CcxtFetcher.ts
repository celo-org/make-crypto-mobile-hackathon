import { BaseFetcher } from "../BaseFetcher";
import { PricesObj } from "../../types";
import redstone from "redstone-api";
import ccxt, { Exchange, Ticker } from "ccxt";

const CCXT_FETCHER_MAX_REQUEST_TIMEOUT_MS = 120000;

export class CcxtFetcher extends BaseFetcher {
  private readonly exchange: Exchange;

  // CCXT-based fetchers must have names that are exactly equal to
  // the appropriate exchange id in CCXT
  // List of ccxt exchanges: https://github.com/ccxt/ccxt/wiki/Exchange-Markets
  constructor(name: ccxt.ExchangeId) {
    super(name);
    const exchangeClass = ccxt[name];
    if (!exchangeClass) {
      throw new Error(`Exchange ${name} is not accessible through CCXT`);
    }
    this.exchange = new exchangeClass({
      timeout: CCXT_FETCHER_MAX_REQUEST_TIMEOUT_MS,
      enableRateLimit: false, // This config option is required to avoid problems with requests timeout
    }) as Exchange;
  }

  async fetchData(): Promise<any> {
    if (!this.exchange.has["fetchTickers"]) {
      throw new Error(
        `Exchange ${this.name} doesn't support fetchTickers method`);
    }

    return await this.exchange.fetchTickers();
  }

  async extractPrices(response: any): Promise<PricesObj> {
    const lastUsdtPrice = (await redstone.getPrice("USDT")).value;

    const pricesObj: PricesObj = {};

    for (const ticker of Object.values(response) as Ticker[]) {
      const pairSymbol = ticker.symbol;
      const lastPrice = ticker.last as number;

      if (pairSymbol.endsWith("/USD")) {
        const symbol = pairSymbol.replace("/USD", "");
        pricesObj[symbol] = lastPrice;
      } else if (pairSymbol.endsWith("/USDT")) {
        const symbol = pairSymbol.replace("/USDT", "");
        if (!pricesObj[symbol]) {
          pricesObj[symbol] = lastPrice * lastUsdtPrice;
        }
      }
    }

    return pricesObj;
  }
};

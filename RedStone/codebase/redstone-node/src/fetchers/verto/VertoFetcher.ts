import axios from "axios";
import redstone from "redstone-api";
import { BaseFetcher } from "../BaseFetcher";
import { PricesObj } from "../../types";

const vertoSymbolToId = require("./verto-symbol-to-id.json");

const BASE_URL = "https://v2.cache.verto.exchange";

// URL or fetching all tokens details: https://v2.cache.verto.exchange/tokens

export class VertoFetcher extends BaseFetcher {
  constructor() {
    super("verto");
  }

  async fetchData(symbols: string[]): Promise<any> {
    const tokenPromises = symbols.map(s =>
      axios.get(`${BASE_URL}/token/${vertoSymbolToId[s]}/price`));

    return await Promise.all(tokenPromises);
  }

  async extractPrices(responses: any): Promise<PricesObj> {
    const lastArPrice = (await redstone.getPrice("AR")).value;

    const pricesObj: { [symbol: string]: number } = {};

    for (const response of responses) {
      if (response && response.data) {
        const quote = response.data;
        pricesObj[quote.ticker] = quote.price * lastArPrice;
      }
    }

    return pricesObj;
  }
};

import { BaseFetcher } from "../BaseFetcher";
import { PricesObj } from "../../types";
import pangolinPairs from "./pangolin-pairs.json";
import graphProxy from "../../utils/graph-proxy";

const PANGOLIN_SUBGRAPH_FETCHER = "https://api.thegraph.com/subgraphs/name/dasconnor/pangolin-dex";
const MIN_RESERVE_USD = 10;

export class PangolinFetcher extends BaseFetcher {
  protected retryForInvalidResponse: boolean = true;

  constructor(
    name: string,
    private readonly baseTokenSymbol: string) {
      super(name);
    }

  async fetchData(symbols: string[]) {
    const ids = this.getPairIdsForSymbols(symbols);

    const query = `{
      pairs(where: { id_in: ${JSON.stringify(ids)} }) {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
        reserve0
        reserve1
        reserveUSD
      }
    }`;

    return await graphProxy.executeQuery(
      PANGOLIN_SUBGRAPH_FETCHER,
      query);
  }

  validateResponse(response: any): boolean {
    return response !== undefined && response.data !== undefined;
  }

  async extractPrices(response: any): Promise<PricesObj> {
    const pricesObj: { [symbol: string]: number } = {};

    for (const pair of response.data.pairs) {
      const symbol0 = pair.token0.symbol;
      const symbol1 = pair.token1.symbol;
      const reserveUSD = parseFloat(pair.reserveUSD);

      if (reserveUSD > MIN_RESERVE_USD) {
        if (symbol0 === this.baseTokenSymbol) {
          const value = reserveUSD / (2 * parseFloat(pair.reserve1));
          pricesObj[symbol1] = value;
        } else {
          const value = reserveUSD / (2 * parseFloat(pair.reserve0));
          pricesObj[symbol0] = value;
        }
      }
    }

    return pricesObj;
  }

  private getPairIdsForSymbols(symbols: string[]): string[] {
    const pairIds = [];

    for (const pair of pangolinPairs) {
      const symbol0 = pair.token0.symbol;
      const symbol1 = pair.token1.symbol;
      const pairIdShouldBeIncluded =
        (symbol0 == this.baseTokenSymbol && symbols.includes(symbol1))
        || (symbol1 == this.baseTokenSymbol && symbols.includes(symbol0));
      if (pairIdShouldBeIncluded) {
        pairIds.push(pair.id);
      }
    }

    return pairIds;
  }
};

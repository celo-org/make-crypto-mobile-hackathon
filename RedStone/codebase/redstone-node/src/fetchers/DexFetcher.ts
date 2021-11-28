import graphProxy from "../utils/graph-proxy";
import { PricesObj } from "../types";
import { BaseFetcher } from "./BaseFetcher";

interface SymbolToPairId {
  [symbol: string]: string;
};

export class DexFetcher extends BaseFetcher {
  protected retryForInvalidResponse: boolean = true;

  constructor(
    name: string,
    private readonly subgraphUrl: string,
    private readonly symbolToPairIdObj: SymbolToPairId) {
      super(name);
    }

  async fetchData(symbols: string[]) {
    const ids = this.convertSymbolsToPairIds(
      symbols,
      this.symbolToPairIdObj);

    const query = `{
      pairs(where: { id_in: ${JSON.stringify(ids)} }) {
        id
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
      this.subgraphUrl,
      query);
  }

  validateResponse(response: any): boolean {
    return response !== undefined && response.data !== undefined;
  }

  async extractPrices(response: any, symbols: string[]): Promise<PricesObj> {
    const pricesObj: { [symbol: string]: number } = {};

    for (const currentSymbol of symbols) {
      const pairId = this.symbolToPairIdObj[currentSymbol];
      const pair = response.data.pairs.find((p: any) => p.id === pairId);

      if (!pair) {
        this.logger.warn(
          `Pair is not in response. Id: ${pairId}. Symbol: ${currentSymbol}. Source: ${this.name}`);
      } else {
        const symbol0 = pair.token0.symbol;
        const symbol1 = pair.token1.symbol;
        const reserve0 = parseFloat(pair.reserve0);
        const reserve1 = parseFloat(pair.reserve1);
        const reserveUSD = parseFloat(pair.reserveUSD);

        if (symbol0 === currentSymbol) {
          pricesObj[currentSymbol] = reserveUSD / (2 * reserve0);
        } else if (symbol1 === currentSymbol) {
          pricesObj[currentSymbol] = reserveUSD / (2 * reserve1);
        }
      }
    }

    return pricesObj;
  }

  private convertSymbolsToPairIds(
    symbols: string[],
    symbolToPairId: SymbolToPairId): string[] {
      const pairIds = [];

      for (const symbol of symbols) {
        const pairId = symbolToPairId[symbol];
        if (pairId === undefined) {
          this.logger.warn(
            `Source "${this.name}" does not support symbol: "${symbol}"`);
        } else {
          pairIds.push(pairId);
        }
      }

      return pairIds;
    }
};

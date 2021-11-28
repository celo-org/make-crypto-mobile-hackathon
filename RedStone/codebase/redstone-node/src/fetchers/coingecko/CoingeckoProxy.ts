export default class CoingeckoProxy {
  private coinGeckoClient: any;
  private symbolToId: { [symbol: string]: string };

  constructor() {
    const CoinGecko = require("coingecko-api") as any;
    this.coinGeckoClient = new CoinGecko();
    this.symbolToId = require("./coingecko-symbol-to-id.json") as any;
  }

  async getExchangeRates(ids: string[]) {
    return await this.coinGeckoClient.simple.price({ ids });
  }
}

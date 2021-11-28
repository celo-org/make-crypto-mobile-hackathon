import Coinbase, {Client, ExchangeRate} from "coinbase";

export default class CoinbaseProxy {
  private coinbaseClient: Client;

  constructor() {
    this.coinbaseClient = new Coinbase.Client({
      "apiKey": "KEY",
      "apiSecret": "SECRET",
      "strictSSL": false,
    } as any);
  }

  async getExchangeRates(): Promise<ExchangeRate> {
    return await new Promise((resolve, reject) => {
      this.coinbaseClient.getExchangeRates({
        "currency": "USD",
      }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }
}

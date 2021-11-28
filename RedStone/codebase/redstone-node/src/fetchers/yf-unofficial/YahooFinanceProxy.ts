import yahooFinance from "yahoo-finance";

export default class YahooFinanceProxy {
  constructor() {
  }

  async getExchangeRates(symbols: string[]): Promise<any> {
    return await new Promise((resolve, reject) => {
      yahooFinance.quote({
        symbols,
        modules: ["price"],
      }, (err: any, quotes: any) => {
        if (err) {
          reject(err);
        }
        resolve(quotes);
      });
    });
  }
}

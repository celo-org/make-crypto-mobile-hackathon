import axios from "axios";
import { BaseFetcher } from "../BaseFetcher";
import { FetcherOpts, PricesObj } from "../../types";
import _ from "lodash";

const RAPID_API_HOST = "yh-finance.p.rapidapi.com";
const URL = `https://${RAPID_API_HOST}/market/v2/get-quotes`;
const DEFAULT_REGION = "US";
const MAX_TOKENS_SIZE_PER_REQUEST = 50;

export class ApiDojoRapidFetcher extends BaseFetcher {
  constructor() {
    super("api-dojo-rapid");
  }

  // API docs: https://rapidapi.com/apidojo/api/yahoo-finance1/
  async fetchData(tokens: string[], opts?: FetcherOpts): Promise<any> {
    // Apidojo rapid limits tokens per request to 50
    // that's why we need to split them to chunks
    const tokenChunks = _.chunk(tokens, MAX_TOKENS_SIZE_PER_REQUEST);
    const promises = tokenChunks.map(tokensInChunk => {
      return axios.get(URL, {
        params: {
          region: DEFAULT_REGION,
          symbols: tokensInChunk.join(","),
        },
        headers: {
          "x-rapidapi-key": opts!.credentials!.yahooFinanceRapidApiKey!,
          "x-rapidapi-host": RAPID_API_HOST,
        },
      });
    });
    return await Promise.all(promises);
  }

  async extractPrices(responses: any): Promise<PricesObj> {
    // Merging quotes from all responses
    let quotes: {[symbol: string]: number}[] = [];
    for (const response of responses) {
      quotes = quotes.concat(response.data.quoteResponse.result);
    }

    // Building price object
    const pricesObj: { [symbol: string]: number } = {};
    for (const quote of quotes) {
      pricesObj[quote.symbol] = quote.regularMarketPrice;
    }

    return pricesObj;
  }
};

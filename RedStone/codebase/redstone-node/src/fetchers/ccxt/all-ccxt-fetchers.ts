import { ExchangeId } from "ccxt";
import { CcxtFetcher } from "./CcxtFetcher";
import exchanges from "./all-supported-exchanges.json";

const fetchersObj: { [name: string]: CcxtFetcher } = {};

// Fetcher names must be the same as their exchange names
for (const fetcherName of exchanges) {
  fetchersObj[fetcherName] = new CcxtFetcher(fetcherName as ExchangeId);
}

export default fetchersObj;

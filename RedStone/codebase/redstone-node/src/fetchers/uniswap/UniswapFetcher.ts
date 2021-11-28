import { DexFetcher } from "../DexFetcher";

const symbolToPairIdObj: { [symbol: string]: string } =
  require("./uniswap-symbol-to-pair-id.json");

const subgraphUrl = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";

export class UniswapFetcher extends DexFetcher {
  constructor() {
    super("uniswap", subgraphUrl, symbolToPairIdObj);
  }
};

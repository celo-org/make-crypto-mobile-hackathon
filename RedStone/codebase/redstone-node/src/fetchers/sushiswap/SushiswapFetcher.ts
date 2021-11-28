import { DexFetcher } from "../DexFetcher";

const symbolToPairIdObj: { [symbol: string]: string } =
  require("./sushiswap-symbol-to-pair-id.json");

const subgraphUrl = "https://api.thegraph.com/subgraphs/name/sushiswap/exchange";

export class SushiswapFetcher extends DexFetcher {
  constructor() {
    super("sushiswap", subgraphUrl, symbolToPairIdObj);
  }
};

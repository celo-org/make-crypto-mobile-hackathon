import { DexFetcher } from "../DexFetcher";

const symbolToPairIdObj: { [symbol: string]: string } =
  require("./trader-joe-symbol-to-pair-id.json");

const subgraphUrl = "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange";

export class TraderJoeFetcher extends DexFetcher {
  constructor() {
    super("trader-joe", subgraphUrl, symbolToPairIdObj);
  }
};

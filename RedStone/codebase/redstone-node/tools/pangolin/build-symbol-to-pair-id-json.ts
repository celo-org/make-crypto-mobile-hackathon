import graphProxy from "../../src/utils/graph-proxy";

const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/dasconnor/pangolin-dex";
const MIN_RESERVE_USD = 50;

interface Pair {
  id: string;
  symbol0: string;
  reserveUSD: any;
  volumeUSD: any;
};

main();

async function main() {
  const pairs = await get1KMostPopularPairs();

  const symbolToPairId: { [symbol: string]: any } = {};

  const filteredPairs = pairs.filter(p => Number(p.reserveUSD) > MIN_RESERVE_USD);

  for (const pair of filteredPairs) {
    if (symbolToPairId[pair.symbol0] === undefined
      || Number(symbolToPairId[pair.symbol0].reserveUSD) < Number(pair.reserveUSD)) {
        symbolToPairId[pair.symbol0] = pair.id;
    }
  }

  console.log(JSON.stringify(symbolToPairId, null, 2));
}

async function get1KMostPopularPairs(): Promise<Pair[]> {
  const query = `{
    pairs(first: 1000, orderBy: reserveUSD, orderDirection: desc) {
      id
      token0 {
        symbol
        name
      }
      token1 {
        symbol
        name
      }
      reserve0
      reserve1
      reserveUSD
      txCount
      totalSupply
      token0Price
      token1Price
      liquidityProviderCount
      volumeUSD
    }
  }`;

  let response;
  try {
    response = await graphProxy.executeQuery(SUBGRAPH_URL, query);
  } catch (e) {
    console.log("Error occured", e);
    throw "stop";
  }


  return response.data.pairs.map((pair: any) => {
    return {
      id: pair.id,
      symbol0: pair.token0.symbol,
      reserveUSD: pair.reserveUSD,
      volumeUSD: pair.volumeUSD,
    };
  });
}

import graphProxy from "../../src/utils/graph-proxy";

interface Pair {
  id: string;
  symbol0: string;
};

main();

async function main() {
  const pairs = await get1KMostPopularPairs();

  const symbolToPairId: { [symbol: string]: string } = {};
  for (const pair of pairs) {
    if (symbolToPairId[pair.symbol0] === undefined) {
      symbolToPairId[pair.symbol0] = pair.id;
    }
  }

  console.log(JSON.stringify(symbolToPairId, null, 2));
}

async function get1KMostPopularPairs(): Promise<Pair[]> {
  const url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
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

  const response = await graphProxy.executeQuery(url, query);

  return response.data.pairs.map((pair: any) => {
    return {
      id: pair.id,
      symbol0: pair.token0.symbol,
    };
  });
}

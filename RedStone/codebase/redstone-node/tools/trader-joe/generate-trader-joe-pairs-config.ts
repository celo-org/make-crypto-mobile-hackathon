import fs from "fs";
import _ from "lodash";
import graphProxy from "../../src/utils/graph-proxy";

const OUTPUT_FILE = "./src/fetchers/trader-joe/trader-joe-pairs.json";
const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange";
const MIN_RESERVE_USD = 1;

main();

async function main() {
  // Fetching data
  const pairs = await getAllPairs();

  // Filtering
  const filteredPairs = pairs.filter(p => Number(p.reserveUSD) > MIN_RESERVE_USD);

  // Saving data to config file
  const path = OUTPUT_FILE;
  console.log(`Saving pairs config to ${path}`);
  fs.writeFileSync(path, JSON.stringify(filteredPairs, null, 2) + "\n");
}

async function getAllPairs(): Promise<any[]> {
  const pageSize = 1000;
  let allPairsFetched = false,
      pageNr = 0,
      lastId = "",
      allPairs: any[] = [];

  while (!allPairsFetched) {
    console.log(
      `Getting ${pageSize} pairs on page ${pageNr}. Last id: ${lastId}`);

    const pairs = await getPairs(pageSize, lastId);

    if (pairs.length === 0) {
      allPairsFetched = true;
    } else {
      const lastItem: { id: string } = _.last(pairs);
      lastId = lastItem.id;
      pageNr++;
      allPairs = allPairs.concat(pairs);
    }
  }

  return allPairs;
}

async function getPairs(pageSize: number, lastId: string): Promise<any[]> {
  const query = `{
    pairs(
      first: ${pageSize},
      where: { id_gt: "${lastId}" }
    ) {
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

  const response = await graphProxy.executeQuery(SUBGRAPH_URL, query);

  if (response.data !== undefined && response.data.pairs !== undefined) {
    return response.data.pairs;
  } else {
    console.log(response);
    return [];
  }
}

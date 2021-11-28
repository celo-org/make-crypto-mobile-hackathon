const CoinGecko = require("coingecko-api");
const _ = require("lodash");

const coinGeckoClient = new CoinGecko();

main();

async function main() {
  const coins = (await coinGeckoClient.coins.list()).data;

  const symbolToDetails = {};

  for (const coin of coins) {
    const symbol = coin.symbol.toUpperCase();
    const details = _.pick(coin, ["id", "name"]);
    if (symbolToDetails[symbol] === undefined) {
      symbolToDetails[symbol] = [details];
    } else {
      symbolToDetails[symbol].push(details);
    }
  }

  console.log(JSON.stringify(symbolToDetails, null, 2));
}

const ccxt = require("ccxt");
const fs = require("fs");

const MIN_SUPPORTED_TICKERS = 3;
const OUTPUT_FILE_PATH = "./src/fetchers/ccxt/all-supported-exchanges.json";

main();

async function main() {
  const exchanges = [];
  for (const exchangeName of ccxt.exchanges) {
    const supported = await shouldExchangeBeSupported(exchangeName);
    if (supported) {
      exchanges.push(exchangeName);
    }
  }
  const path = OUTPUT_FILE_PATH;
  fs.writeFileSync(path, JSON.stringify(exchanges, null, 2) + "\n");
  console.log(`Exchanges saved to ${path}`);
}

async function shouldExchangeBeSupported(exchangeName) {
  const exchange = new ccxt[exchangeName]();
  if (exchange.has["fetchTickers"]) {
    try {
      const tickers = Object.values(await exchange.fetchTickers());
      const tickersWithUsdt = tickers.filter(t => t.symbol.endsWith("/USDT"));
      const tickersWithUsd = tickers.filter(t => t.symbol.endsWith("/USD"));
      const supported =
        tickersWithUsdt.length + tickersWithUsd.length > MIN_SUPPORTED_TICKERS;
      console.log({
        exchangeName,
        supported,
        allTickersCount: tickers.length,
        tickersWithUsdtCount: tickersWithUsdt.length,
        tickersWithUsdCount: tickersWithUsd.length,
      });
      return supported;
    } catch (e) {
      console.error(e);
      // Some exchanges will raise AuthenticationError. We don't want to use them
      return false;
    }
  } else {
    return false;
  }
}

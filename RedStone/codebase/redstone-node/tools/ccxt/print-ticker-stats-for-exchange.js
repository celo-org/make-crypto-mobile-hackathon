const ccxt = require("ccxt");

const EXCHANGE_NAME = "currencycom";

main();

async function main() {
  const exchange = new ccxt[EXCHANGE_NAME];
  const tickers = Object.values(await exchange.fetchTickers());
  console.log({
    allTickersCount: tickers.length,
    tickersWithUsdt: tickers.filter(tickerHasUsdt).length,
    tickersWithUsd: tickers.filter(tickerHasUsd).length,
    other: exchange,
  });
}

function tickerHasUsd(ticker) {
  return ticker && ticker.symbol.endsWith("/USD");
}

function tickerHasUsdt(ticker) {
  return ticker && ticker.symbol.endsWith("/USDT");
}

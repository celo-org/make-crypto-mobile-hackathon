const dateFormat = require("dateformat");
const limestone = require("limestone-api");
const axios = require("axios");
const CoinGecko = require("coingecko-api");
const uuid = require("uuid-random");
const signPrice = require("./sign-price");

const coinGeckoClient = new CoinGecko();

// IMPORTANT! Before running this script
// you should disable timestamp verification
// in limestone mongo endpoint. After migration
// please enable it again ;)

const START_DATE = "2019-11-01";
const END_DATE = "2021-04-09";

main();

async function main() {
  const startDate = new Date(START_DATE);
  startDate.setMinutes(59);
  const endDate = new Date(END_DATE);
  endDate.setMinutes(59);
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  let timestamp = startTimestamp;

  while (timestamp <= endTimestamp) {
    const exists = await doesPriceWithSameTimestampExist(timestamp);
    if (exists) {
      console.warn(`[WARNING] Price with timestamp ${timestamp} already exists in DB`);
    } else {
      const value = await getARPriceForDateFromCoingecko(timestamp);
      const price = await generateAndSignPriceObj({
        value,
        timestamp,
      });
      await uploadPriceToRedstone(price);
    }
    timestamp += 24 * 3600 * 1000; // + 1 day
  }
}

async function getARPriceForDateFromCoingecko(timestamp) {
  const formattedTime = dateFormat(timestamp, "dd-mm-yyyy");
  console.log(formattedTime);
  const response = await coinGeckoClient.coins.fetchHistory("arweave", {
    date: formattedTime,
    localization: false,
  });

  return response.data.market_data.current_price.usd;
}

async function generateAndSignPriceObj({
  value,
  timestamp,
}) {
  const priceObj = {
    symbol: "AR",
    value,
    timestamp,
    provider: "I-5rWUehEv-MjdK9gFw09RxfSLQX9DIHxG614Wf8qo0",
    id: uuid(),
    permawebTx: "historical-ar-prices-migration-so-no-tx-id",
    version: "3",
    source: {"coingecko": value},
  };

  priceObj.signature = await signPrice(priceObj);

  return priceObj;
}

async function uploadPriceToRedstone(price) {
  console.log("Uploading price to redstone");
  await axios.post("https://api.limestone.finance/prices", price);
  console.log(`Price uploaded: ${price.id}`);
}

async function doesPriceWithSameTimestampExist(timestamp) {
  try {
    const price = await limestone.getHistoricalPrice("AR", {
      date: timestamp,
    });
    return Math.abs(price.timestamp - timestamp) === 0;
  } catch (e) {
    if (e.toString().includes("Price not found for symbol")) {
      return false;
    } else {
      throw e;
    }
  }
}

const limestone = require("limestone-api");
const dateFormat = require("dateformat");

const START_DATE = "2020-01-02";
const END_DATE = "2021-04-09";

main();

async function main() {
  const startDate = new Date(START_DATE);
  const endDate = new Date(END_DATE);
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  let timestamp = startTimestamp;

  while (timestamp <= endTimestamp) {
    const dateStr = dateFormat(timestamp, "isoDate");
    const price = await limestone.getHistoricalPrice("AR", {
      date: dateStr,
      verifySignature: true,
    });
    const diff = (timestamp - price.timestamp) / (60 * 1000);
    console.log(`Got AR price for ${dateStr}: ${price.value}. Diff: ${diff} mins`);
    timestamp += 24 * 3600 * 1000;
  }
}

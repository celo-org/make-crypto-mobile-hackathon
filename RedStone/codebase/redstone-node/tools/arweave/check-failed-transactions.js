const axios = require("axios");
const Arweave = require("arweave/node");

// const LIMIT = 300;
const SKIP = 5;
const LIMIT = 24 * 60;

const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443,           // Port
  protocol: "https",   // Network protocol http or https
  timeout: 60000,      // Network request timeouts in milliseconds
  logging: false,      // Enable network request logging
});

main();

async function main() {
  const txIds = await loadLastTxIds(LIMIT);

  console.log(`Loaded ${txIds.length} transaction ids`);

  let counter = 0;
  for (const txId of txIds) {
    counter++;
    if (counter > SKIP) {
      await checkTxStatus(txId);
    }
  }
}

async function checkTxStatus(txId) {
  const response = await arweave.transactions.getStatus(txId);
  if (response.status === 200 && response.confirmed) {
    console.log(`${txId}: OK`);
  } else {
    console.log(`${txId}: FAIL`);
    console.log(response);
  }
}

async function loadLastTxIds(limit) {
  const response = await axios.get("https://api.redstone.finance/prices", {
    params: {
      symbol: "AR",
      provider: "redstone",
      limit,
    },
  });

  const prices = response.data;
  const txIds = prices.map(p => p.permawebTx);
  return txIds;
}

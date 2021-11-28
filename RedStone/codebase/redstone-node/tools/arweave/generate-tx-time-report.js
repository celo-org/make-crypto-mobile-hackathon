const Arweave = require("arweave/node");
const open = require("open");
const _ = require("lodash");
const { run } = require("ar-gql");
const plotly = require('plotly')("hatskier", "vyujwn0zVNWbWR73W5Jh");

const PROVIDER_ADDRESS = "I-5rWUehEv-MjdK9gFw09RxfSLQX9DIHxG614Wf8qo0";
const LAST_BLOCKS_TO_CHECK = 10000;
const VERSION = "0.4";

const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443,           // Port
  protocol: "https",   // Network protocol http or https
  timeout: 60000,      // Network request timeouts in milliseconds
  logging: false,      // Enable network request logging
});

main();

async function main() {
  const transactions = await getTransactionWithPagination({ maxPages: 50 });
  // const { transactions } = await getRedstoneTransactions();

  const minutesOfDelay = [], times = [];

  for (const transaction of transactions) {
    const blockTime = transaction.node.block.timestamp * 1000;
    const timestampInTag = transaction.node.tags.find(t => t.name === "timestamp").value;
    const diff = blockTime - timestampInTag;
    const diffMinutes = Number((diff / 60000).toFixed(2));

    console.log({
      diff,
      diffMinutes,
      blockTime,
      timestampInTag,
    });

    minutesOfDelay.push(diffMinutes);
    times.push(new Date(Number(timestampInTag)));
  }

  const avg = Number(_.mean(minutesOfDelay).toFixed(2));
  const median = _.sortBy(minutesOfDelay)[Math.round(minutesOfDelay.length / 2)];
  const max = _.max(minutesOfDelay);
  const min = _.min(minutesOfDelay);

  console.log("Stats for minutes of delays are below");
  console.log({
    median,
    avg,
    max,
    min,
  });

  showChart({
    x: times,
    y: minutesOfDelay,
  });
}

async function getTransactionWithPagination({ maxPages }) {
  let hasNextPage = true, allTransactions = [], after, pageNr = 0;

  while (hasNextPage && pageNr < maxPages) {
    console.log(`Getting transactions from page nr ${pageNr}. Cursor: ${after}`);
    const response = await getRedstoneTransactions(after);
    allTransactions = allTransactions.concat(response.transactions);
    after = _.last(response.transactions).cursor;
    hasNextPage = response.hasNextPage;
    pageNr++;
  }

  return _.sortBy(allTransactions, (tx =>
    tx.node.tags.find(t => t.name === "timestamp").value));
}

async function getRedstoneTransactions(after) {
  const networkInfo = await arweave.network.getInfo();
  const minBlock = networkInfo.height - LAST_BLOCKS_TO_CHECK;

  const query = `
      {
        transactions(
          tags: [
            { name: "app", values: "Redstone" }
            { name: "type", values: "data" }
            { name: "version", values: "${VERSION}" }
          ]
          block: { min: ${minBlock} }
          owners: ["${PROVIDER_ADDRESS}"]
          ${after ? "after: \"" + after + "\""  : ""}
          first: 50
        ) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              tags {
                name
                value
              }
              id
              block {
                timestamp
              }
            }
          }
        }
      }`;

  const res = await run(query);
  const transactions = res.data.transactions.edges;
  const hasNextPage = res.data.transactions.pageInfo.hasNextPage;

  return {
    transactions,
    hasNextPage,
  };
}

function showChart({x, y}) {
  const data = [{
    x,
    y,
    type: 'bar',
  }];
  const layout = {
    fileopt : "overwrite",
    filename: "transactions-report-" + Date.now(),
  };

  plotly.plot(data, layout, (err, msg) => {
    if (err) {
      return console.log(err);
    }
    console.log(msg);
    open(msg.url);
  });
}

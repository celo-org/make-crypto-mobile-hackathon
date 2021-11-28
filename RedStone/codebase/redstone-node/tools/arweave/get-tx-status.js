const Arweave = require("arweave/node");

// USAGE: node tools/arweave/get-tx-status <TRANSACTION_ID>

main();

async function main() {
  try {
    const arweave = Arweave.init({
      host: "arweave.net", // Hostname or IP address for a Arweave host
      port: 443,           // Port
      protocol: "https",   // Network protocol http or https
      timeout: 60000,      // Network request timeouts in milliseconds
      logging: false,      // Enable network request logging
    });

    // const txId = "UysIiAeVY-2vFcxdZwBkNKBDxXOzpzRU9rugllNzpWk";
    const txId = process.argv[2];
    console.log({txId});

    const response = await arweave.transactions.getStatus(txId);

    console.log({response});

    const tx = await arweave.transactions.get(txId);
    console.log({tx});

  } catch (e) {
    console.error(e);
  }
}



const Arweave = require("arweave/node");
const axios = require("axios");
const Tbjson = require('typed-binary-json');
// const _ = require("lodash");

const compressions = require("./compressions");
const jwk = require("../../.secrets/arweave.json");

const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443,           // Port
  protocol: "https",   // Network protocol http or https
  timeout: 60000,      // Network request timeouts in milliseconds
  logging: false,      // Enable network request logging
});

main();

async function main() {
  const data = await getExampleDataset();
  await testCompressions(data);
}

async function getExampleDataset() {
  // const response = await axios.get("https://arweave.net/xhCaEmnNqks8_zzxDDMqsGNR9oQjAS6DsT2djtEOl70");
  // const response = await axios.get("https://arweave.net/WtH2kZVHWew2Y56YcnG9e_rs1RzCvEnCEg8UcGm9S3k");
  // const response = await axios.get("https://arweave.net/rSozOWdWAtgD92BDScHbrtYX5RzRxFkQToxThdGtufg");
  const response = await axios.get("https://arweave.net/IFXTkxelPk0Z57ZGcPbajCdybNyhYMQBXsHzhjCEFlM");
  return response.data;
}

async function calculateGasCost(data) {
  const uploadTx = await arweave.createTransaction({ data }, jwk);
  uploadTx.addTag("app", "limestone-test-hehe");
  uploadTx.addTag("type", "data");
  uploadTx.addTag("version", "0");
  uploadTx.addTag("timestamp", Date.now());
  uploadTx.addTag("HMM", 1.2312312321);


  uploadTx.addTag("Content-Type", "application/json");
  uploadTx.addTag("Content-Encoding", "gzip");

  // Post tx
  // await arweave.transactions.sign(uploadTx, jwk);
  // await arweave.transactions.post(uploadTx, jwk);
  // console.log(`Tx id: ${uploadTx.id}`);

  return uploadTx.reward;
}

async function testCompressions(data) {
  const bytesInitial = Buffer.from(JSON.stringify(data), "utf8");
  const bytesInitialSize = bytesInitial.length;

  // Converting to binary using TBJSON
  const tbjson = new Tbjson();
  const bytesTBJSON = tbjson.serializeToBuffer(data);
  const bytesTBJSONSize = bytesTBJSON.length;

  // Compressing using gzip
  const gzipBytes = compressions.gzip.compress(bytesInitial);
  const gzipBytesSize = gzipBytes.length;

  // Compressing using deflate
  const deflateBytes = compressions.deflate.compress(bytesInitial);
  const deflateBytesSize = deflateBytes.length;

  // Checking gas cost for JSON.stringified data
  const jsonDataCost = await calculateGasCost(bytesInitial);

  // Check gas cost for gzipped data
  const gzippedDataCost = await calculateGasCost(gzipBytes);

  // Check gas cost for gzipped data
  const deflatedDataCost = await calculateGasCost(deflateBytes);

  console.log({
    sizes: {
      bytesInitialSize,
      bytesTBJSONSize,
      gzipBytesSize,
      deflateBytesSize,
    },
    gasCosts: {
      jsonDataCost,
      gzippedDataCost,
      deflatedDataCost,
    },
  });
}

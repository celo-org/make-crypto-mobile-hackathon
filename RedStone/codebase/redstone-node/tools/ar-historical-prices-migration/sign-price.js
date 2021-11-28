const Arweave = require("arweave/node");
const deepSortObject = require("deep-sort-object");
const jwk = require("../../.secrets/redstone-jwk.json");

module.exports = async (price) => {
  const priceWithSortedProps = deepSortObject(price);
  const priceStringified = JSON.stringify(priceWithSortedProps);

  const dataToSign = new TextEncoder().encode(priceStringified);
  const signature = await Arweave.crypto.sign(jwk, dataToSign);
  const buffer = Buffer.from(signature);

  return buffer.toString("base64");
};

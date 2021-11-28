const axios = require("axios");
const compressions = require("./compressions");

main();

async function main() {
  const prices = await getAllPrices();
  for (const price of prices) {
    await testCompressions(price);
  }
}

async function testCompressions(price) {
  const bytesInitial = Buffer.from(price.signature, "utf8");
  const initialSize = bytesInitial.length;

  const pureBytes = Buffer.from(price.signature, "base64");
  const pureBytesSize = pureBytes.length;

  // Gzip compression
  const gzipCompressedBytes = compressions.gzip.compress(pureBytes);
  const gzipCompressedBytesSize = gzipCompressedBytes.length;
  const gzipDecompressedBytes =
    compressions.gzip.decompress(gzipCompressedBytes);
  if (Buffer.compare(pureBytes, gzipDecompressedBytes) !== 0) {
    throw new Error(
      "Gzip decompressed value and precompressed value differ");
  }

  // Deflate compression
  const deflateCompressedBytes = compressions.deflate.compress(pureBytes);
  const deflateCompressedBytesSize = deflateCompressedBytes.length;
  const deflateDecompressedBytes =
    compressions.deflate.decompress(deflateCompressedBytes);
  if (Buffer.compare(pureBytes, deflateDecompressedBytes) !== 0) {
    throw new Error(
      "Deflate decompressed value and precompressed value differ");
  }


  console.log({
    initialSize,
    pureBytesSize,
    gzipCompressedBytesSize,
    deflateCompressedBytesSize,
  });
}

async function getAllPrices() {
  const response = await axios.get("https://api.limestone.finance/prices", {
    params: { provider: "limestone" },
  });
  return Object.values(response.data);
}

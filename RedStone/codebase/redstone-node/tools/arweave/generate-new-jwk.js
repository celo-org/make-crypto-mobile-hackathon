const Arweave = require("arweave/node");
const fs = require("fs");

const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443,           // Port
  protocol: "https",   // Network protocol http or https
  timeout: 60000,      // Network request timeouts in milliseconds
  logging: false,      // Enable network request logging
});

main();

async function main() {
  const jwk = await arweave.wallets.generate();
  const address = await arweave.wallets.jwkToAddress(jwk);
  const publicKey = getPublicKey(jwk);

  const filename = `arweave-jwk-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(jwk));
  console.log(`JWK saved to file: ${filename}`);
  console.log({
    address,
    publicKey,
  });
}

// Public key is saved in the "n"
// More info: https://docs.arweave.org/developers/server/http-api#addressing
function getPublicKey(jwk) {
  return jwk.n;
}

const { CeloProvider } = require("@celo-tools/celo-ethers-wrapper");

const provider = new CeloProvider("https://alfajores-forno.celo-testnet.org");

module.exports = provider;

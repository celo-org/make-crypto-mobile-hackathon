const web3 = require("./web3");
const PackagePrices = require("./abi/PackagePrices.json");

const packagePricesAlfajores = new web3.web3Alfajores.eth.Contract(
  PackagePrices.abi,
  process.env.CELO_ALFAJORES_PRICES_ADDRESS
);

module.exports = {
  packagePricesAlfajores,
}

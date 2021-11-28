const web3 = require("./web3");
const RecyclingMachine = require("./abi/RecyclingMachine.json");

const recyclingMachineAlfajores = new web3.web3Alfajores.eth.Contract(
  RecyclingMachine.abi,
  process.env.CELO_ALFAJORES_CONTRACT_ADDRESS
);

module.exports = {
  recyclingMachineAlfajores,
}

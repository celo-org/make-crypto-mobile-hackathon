const deployedChainlink = require("../deployments/kovan/SampleChainlink.json");
const secrets = require("../.secret.json");
const ethers = require('ethers');

const signer = new ethers.Wallet(secrets.testPrivKey, ethers.getDefaultProvider("kovan"));

let sampleContract = new ethers.Contract( deployedChainlink.address , deployedChainlink.abi , signer);

async function check() {
  let tx = await sampleContract.executeWithPrice(1);
  console.log("Executed with Redstone price tx: " + tx.hash);
  let receipt = await tx.wait();
  console.log("Result: " + (receipt.status === 1 ? "success" : "failure"));
  console.log("Gas used: " + receipt.gasUsed.toString());

}

async function checkMultipleIterations(max, index) {
  if (index >= max) {
    return;
  }
  await check();
  setTimeout(() => { checkMultipleIterations(max, index+1);}, 5000);
}

checkMultipleIterations(10, 0);


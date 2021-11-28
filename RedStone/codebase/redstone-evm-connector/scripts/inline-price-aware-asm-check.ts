const deployedPriceAware = require("../deployments/kovan/SampleInlinedPriceAware.json");
const secrets = require("../.secret.json");
import {Wallet, Contract, getDefaultProvider} from "ethers";
import WrapperBuilder from "../utils/v2/impl/builder/WrapperBuilder";

const signer = new Wallet(secrets.testPrivKey, getDefaultProvider("kovan"));

let sampleContract = new Contract( deployedPriceAware.address , deployedPriceAware.abi , signer);
sampleContract = WrapperBuilder
    .wrapLite(sampleContract)
    .usingPriceFeed("redstone-stocks", "IBM");


async function check() {
    let tx = await sampleContract.executeWithPrice(1, {gasLimit: 35000});
    console.log("Executed with Redstone price tx: " + tx.hash);
    let receipt = await tx.wait();
    console.log("Result: " + (receipt.status === 1 ? "success" : "failure"));
    console.log("Gas used: " + receipt.gasUsed.toString());

}

async function checkMultipleIterations(max: number, index: number) {
    if (index >= max) {
        return;
    }
    await check();
    setTimeout(() => { checkMultipleIterations(max, index+1);}, 5000);
}

checkMultipleIterations(1, 0);




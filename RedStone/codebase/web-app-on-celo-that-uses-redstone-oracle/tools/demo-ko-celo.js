const ethers = require("ethers");
const wallet = require("./celo-wallet");
const { WrapperBuilder } = require("redstone-flash-storage");
const deployKoTokenCELO = require("./deploy-ko-celo");
const KO_TOKEN_CELO = require("../artifacts/contracts/KoTokenCELO.sol/KoTokenCELO");
const utils = require("./utils");

main();

async function main() {
  const addresses = await deployKoTokenCELO("ZC=F");
  console.log(addresses);
  const token = getTokenContract(addresses, wallet);
  const printStats = () => printExtendedBalanceAndSolvency(token, wallet.address);

  console.log("=== Contracts deployed. Demo starting ===");
  await printStats(token, wallet.address);

  console.log("=== Minting ===");
  const mintTx = await token.mint(utils.toEth(0.001), {value: utils.toEth(0.3), gasLimit: 1000000});
  await mintTx.wait();
  console.log("Minting completed");
  await printStats();

  console.log("=== Collateral removing ===");
  const collateralRemovingTx = await token.removeCollateral(utils.toEth(0.01));
  await collateralRemovingTx.wait();
  console.log("Collateral removing completed");
  await printStats();

  console.log("=== Collateral adding ===");
  const collateralAddingTx = await token.addCollateral({value: utils.toEth(0.05)});
  await collateralAddingTx.wait();
  console.log("Collateral adding completed");
  await printStats();

  console.log("=== Burning ===");
  const burningTx = await token.burn(utils.toEth(0.0007));
  await burningTx.wait();
  console.log("Burning completed");
  await printStats();
}

async function printExtendedBalanceAndSolvency(token, address) {
  const balance = utils.bigNumberPriceToNumber(await token.balanceOf(address));
  const balanceValue = utils.formatBigUsdVal(await token.balanceValueOf(address));
  const collateral = utils.bigNumberPriceToNumber(await token.collateralOf(address));
  const collateralValue = utils.formatBigUsdVal(await token.collateralValueOf(address));
  let solvency = await getSolvency(token, address);

  console.log("Printing stats: ", { balance, balanceValue, collateral, collateralValue, solvency });
}

async function getSolvency(token, address) {
  const solvency = await token.solvencyOf(address);
  if (solvency.gt(100000)) {
    return "N/A";
  } else {
    return solvency.toNumber() / 10 + '%';
  }
}

function getTokenContract(addresses, wallet) {
  const tokenContract = new ethers.Contract(addresses.koToken, KO_TOKEN_CELO.abi, wallet);
  return WrapperBuilder
    .wrapLite(tokenContract)
    .usingPriceFeed("redstone-stocks");
}

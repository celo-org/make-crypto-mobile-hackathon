const ethers = require("ethers");
const wallet = require("./celo-wallet");
const { WrapperBuilder } = require("redstone-flash-storage");
const deployKoTokenCUSD = require("./deploy-ko-cusd");
const KO_TOKEN_CUSD = require("../artifacts/contracts/KoTokenCUSD.sol/KoTokenCUSD");
const utils = require("./utils");
const { CUSD_ADDRESS } = require("./tools-config");
const ERC20_ABI = require("../abi/erc20.json");

const GAS_LIMIT = 1000000;

main();

async function main() {
  const addresses = await deployKoTokenCUSD("ZC=F");
  const token = getTokenContract(addresses, wallet);
  const cusd = getCusdContract(wallet);
  const printStats = () => printExtendedBalanceAndSolvency(token, wallet.address);

  console.log("=== Contracts deployed. Demo starting ===");
  await printStats(token, wallet.address);

  console.log("=== Minting ===");
  const approveCusdTx1 = await cusd.approve(addresses.koToken, utils.toEth(10));
  await approveCusdTx1.wait();
  const mintTx = await token.mint(utils.toEth(0.001), utils.toEth(1), { gasLimit: GAS_LIMIT });
  await mintTx.wait();
  console.log("Minting completed");
  await printStats();

  console.log("=== Collateral removing ===");
  const collateralRemovingTx = await token.removeCollateral(utils.toEth(0.01));
  await collateralRemovingTx.wait();
  console.log("Collateral removing completed");
  await printStats();

  console.log("=== Collateral adding ===");
  const approveCusdTx2 = await cusd.approve(addresses.koToken, utils.toEth(0.05));
  await approveCusdTx2.wait();
  const collateralAddingTx = await token.addCollateral(utils.toEth(0.05));
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
  const tokenContract = new ethers.Contract(addresses.koToken, KO_TOKEN_CUSD.abi, wallet);
  return WrapperBuilder
    .wrapLite(tokenContract)
    .usingPriceFeed("redstone-stocks");
}

function getCusdContract(wallet) {
  return new ethers.Contract(CUSD_ADDRESS, ERC20_ABI, wallet);
}

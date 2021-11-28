import { ethers } from "ethers";
import sleep from "./sleep";
import store from "@/store";
import { WrapperBuilder } from "redstone-flash-storage";
import deployedTokens from "@/assets/data/deployed-tokens.json";
// const { CeloProvider } = require("@celo-tools/celo-ethers-wrapper");

const KO_TOKEN_CELO = require('../../artifacts/contracts/KoTokenCELO.sol/KoTokenCELO');
const KO_TOKEN_CUSD = require('../../artifacts/contracts/KoTokenCUSD.sol/KoTokenCUSD');
const ERC20_ABI = require('../../abi/erc20.json');

const DEFAULT_SOLVENCY = 150; // 150%
const MIN_SOLVENCY = 121; // 121%
const CUSD_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // cUSD on alfajores testnet

const { ethereum, web3 } = window;

// Connect app to metamask
if (ethereum) {
  ethereum.enable();
}

// Will use metamask web3
let provider;
if (web3) {
  // TODO: maybe use CeloProvider??
  provider = new ethers.providers.Web3Provider(web3.currentProvider);
}

const parseNumber = (number) => ethers.utils.parseEther(String(number));
const bigNumberPriceToNumber = (bn) => Number(ethers.utils.formatEther(bn));

function getRequiredBlockchainNetworkName() {
  return "alfajores";
}

async function getAddress() {
  const signer = await getSigner();
  return signer.getAddress();
}

async function getCusdContract() {
  const signer = await getSigner();
  return new ethers.Contract(CUSD_ADDRESS, ERC20_ABI, signer);
}

function getAddressForSymbol(symbol, addressType) {
  const tokenAddresses = deployedTokens[symbol];
  const baseCurrency = getBaseCurrency();
  if (!tokenAddresses || !tokenAddresses[baseCurrency]) {
    throw new Error(`Token addresses not found for token: ${symbol}`);
  }

  const address = tokenAddresses[baseCurrency][addressType];
  if (!address) {
    throw new Error(`No "${addressType}" address for token: ${symbol}`);
  }
  return address;
}

function getEtherscanUrlForToken(symbol) {
  const tokenAddress = getAddressForSymbol(symbol, "koToken");
  const network = getRequiredBlockchainNetworkName();
  if (network === "alfajores") {
    return 'https://alfajores-blockscout.celo-testnet.org/address/' + tokenAddress;
  } else {
    return "";
  }
}

async function getTokenContract(symbol, opts = {}) {
  const tokenAddress = getAddressForSymbol(symbol, "koToken");

  // Getting signer if needed
  let signerOrProvider = provider;
  if (opts.withSigner) {
    const signer = await getSigner();
    signerOrProvider = signer;
  }

  const abi = getTokenContractAbi();

  let token = new ethers.Contract(tokenAddress, abi, signerOrProvider);

  // Wrapping with redstone-api if needed
  if (opts.wrapWithRedstone) {
    token = WrapperBuilder
      .wrapLite(token)
      .usingPriceFeed("redstone-stocks");
  }

  return token;
}

function getTokenContractAbi() {
  const baseCurrency = getBaseCurrency();
  if (baseCurrency === "CELO") {
    return KO_TOKEN_CELO.abi;
  } else {
    return KO_TOKEN_CUSD.abi;
  }
}

async function getTokenContractForTxSending(symbol) {
  return await getTokenContract(symbol, {
    wrapWithRedstone: true,
    withSigner: true,
  });
}

async function getNetworkName() {
  await sleep(1000);
  if (provider && provider._network) {
    if (provider._network.chainId === 44787) {
      return "alfajores";
    } return provider._network.name;
  } else {
    return await getNetworkName();
  }
}

function onNetworkChange(callback) {
  window.ethereum.on('chainChanged', chainId => {
    callback(chainId);
  });
}

async function getLiquidityForToken(symbol) {
  const token = await getTokenContract(symbol);
  const toalSupplyBN = await token.totalSupply();
  return bigNumberPriceToNumber(toalSupplyBN);
}

async function getSigner() {
  await ethereum.enable();
  const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
  return signer;
}

async function mint(symbol, amount, stakeAmount) {
  const token = await getTokenContractForTxSending(symbol);
  const baseCurrency = getBaseCurrency();

  if (baseCurrency === "cUSD") {
    return await token.mint(
      parseNumber(amount),
      parseNumber(stakeAmount));
  } else if (baseCurrency === "CELO") {
    return await token.mint(parseNumber(amount), {
      value: parseNumber(stakeAmount),
    });
  }
}

async function burn(symbol, amount) {
  const token = await getTokenContractForTxSending(symbol);
  return await token.burn(parseNumber(amount));
}

async function addCollateral(symbol, amount) {
  const token = await getTokenContractForTxSending(symbol);
  const baseCurrency = getBaseCurrency();

  if (baseCurrency === "cUSD") {
    return await token.addCollateral(parseNumber(amount));  
  } else if (baseCurrency === "CELO") {
    return await token.addCollateral({ value: parseNumber(amount) });
  }
}

async function approveCusdSpending(amount, symbol) {
  const token = await getTokenContractForTxSending(symbol);
  const cusd = await getCusdContract();

  return await cusd.approve(token.address, parseNumber(amount));
}

async function removeCollateral(symbol, amount) {
  const token = await getTokenContractForTxSending(symbol);
  return await token.removeCollateral(parseNumber(amount));
}

async function getCollateralAmount(symbol) {
  const token = await getTokenContractForTxSending(symbol);
  const address = await getAddress();
  const collateral = await token.collateralOf(address);
  return bigNumberPriceToNumber(collateral);
}

async function getSolvency(symbol) {
  const token = await getTokenContractForTxSending(symbol);
  const address = await getAddress();
  const solvency = await token.solvencyOf(address);

  if (solvency.gt(100000)) {
    return 100000;
  } else {
    return solvency.toNumber() / 10;
  }
}

async function getBalance(symbol) {
  const token = await getTokenContractForTxSending(symbol);
  const address = await getAddress();
  const balance = await token.balanceOf(address);
  return bigNumberPriceToNumber(balance);
}

async function getCeloBalance() {
  const address = await getAddress();
  const balance = await provider.getBalance(address);
  return bigNumberPriceToNumber(balance);
}

async function getCusdBalance() {
  const address = await getAddress();
  const cusd = await getCusdContract();
  const balance = await cusd.balanceOf(address);
  return bigNumberPriceToNumber(balance);
}

function calculateStakeAmount({
  tokenAmount,
  tokenPrice,
  ethPrice,
  solvency = DEFAULT_SOLVENCY,
}) {
  const baseCurrency = getBaseCurrency();
  if (baseCurrency === "cUSD") {
    return (solvency / 100) * tokenAmount * tokenPrice;
  } else {
    const currentTokenEthPrice = tokenPrice / ethPrice;
    return (solvency / 100) * tokenAmount * currentTokenEthPrice;
  }
}

// Internal function for getting baseCurrency from global Vuex state
function getBaseCurrency() {
  return store.state.baseCurrency;
}

export default {
  // Utils
  calculateStakeAmount,
  getAddressForSymbol,
  getEtherscanUrlForToken,
  getRequiredBlockchainNetworkName,

  // Getters
  getLiquidityForToken,
  getSolvency,
  getCollateralAmount,
  getBalance,
  getCeloBalance,
  getCusdBalance,

  // Network
  getNetworkName,
  onNetworkChange,

  // Transactions methods
  mint,
  burn,
  addCollateral,
  removeCollateral,
  approveCusdSpending,

  // Const
  DEFAULT_SOLVENCY,
  MIN_SOLVENCY,
};

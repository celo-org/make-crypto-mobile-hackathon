const defaultTokenList = require('@ubeswap/default-token-list').tokens;
import Web3 from 'web3';
import { TokenInfo } from './types';
import { Token, TokenManager } from './token';
import { Pair, PairManager } from './pair';
import { PoolManager } from './pool-manager';
import BigNumber from 'bignumber.js';

const myAddress = "YOUR ALFAJORES ADDRESS HERE";
const myPrivateKey = "YOUR ALFAJORES PRIVATE KEY HERE";

const rpcURL = 'https://forno.celo.org';
const testRpcURL = 'https://alfajores-forno.celo-testnet.org'

const web3 = new Web3(testRpcURL);
const account = web3.eth.accounts.privateKeyToAccount(myPrivateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = myAddress;

console.log(`Head to https://alfajores-blockscout.celo-testnet.org/address/${myAddress} to validate all of these transactions!`)


async function main() {
  console.log('Fetching on-chain data and initializing tokens, pairs, and pools, this may take a sec...')
  const poolManager = new PoolManager(web3);
  await poolManager.initPools()

  console.log("Getting mcUSD-CELO pool")
  const pool = poolManager.fromSymbols("CELO", "mcUSD")

  let tokenABalance = await pool.stakingToken.tokenA.getBalanceInUnits()
  let tokenBBalance = await pool.stakingToken.tokenB.getBalanceInUnits()
  console.log(`Current Balance: ${tokenABalance.toString()} mcUSD, ${tokenBBalance.toString()} CELO`)

  console.log(`Swapping .1 CELO for mcUSD using the liquidity pool with slippage tolerance of 5%`)
  await pool.stakingToken.swapExactBForA(.1, .05, myAddress)

  tokenABalance = await pool.stakingToken.tokenA.getBalanceInUnits()
  tokenBBalance = await pool.stakingToken.tokenB.getBalanceInUnits()
  console.log(`Updated Balance after swap: ${tokenABalance.toString()} mcUSD, ${tokenBBalance.toString()} CELO`)

  console.log(`Depositing maximum possible amount of liquidity (likely constrained by mcUSD balance)`)
  await pool.stakingToken.addMaxLiquidity()

  tokenABalance = await pool.stakingToken.tokenA.getBalanceInUnits()
  tokenBBalance = await pool.stakingToken.tokenB.getBalanceInUnits()
  console.log(`Updated Balance after depositing liquidity: ${tokenABalance.toString()} mcUSD, ${tokenBBalance.toString()} CELO`)

  let lpBalance = await pool.stakingToken.getBalanceInUnits()
  console.log(`UBE LP Balance: ${lpBalance.toString()}`)

  console.log(`Staking all UBE LP`)
  await pool.pool.stakeMax()

  lpBalance = await pool.stakingToken.getBalanceInUnits()
  console.log(`UBE LP Balance after staking: ${lpBalance.toString()}`)

  const stakedBalance = await pool.pool.getBalanceInUnits()
  console.log(`UBE LP Balance held by staking contract: ${stakedBalance}`)

  const rewardsSymbol = pool.pool.rewardsToken.symbol
  console.log(`Farm rewards are paid out in ${rewardsSymbol}`)

  let rewardsBalance = await pool.pool.rewardsToken.getBalanceInUnits()
  console.log(`${rewardsSymbol} rewards balance: ${rewardsBalance.toString()}`)

  console.log(`Claiming rewards... (almost certainly will be 0)`)
  await pool.pool.getReward()

  rewardsBalance = await pool.pool.rewardsToken.getBalanceInUnits()
  console.log(`${rewardsSymbol} rewards balance after claiming: ${rewardsBalance.toString()}`)
}

Promise.all([main()])

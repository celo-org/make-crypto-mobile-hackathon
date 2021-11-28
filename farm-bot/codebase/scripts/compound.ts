import {
  claimRewards,
  FARM_BOT_ADDRESS_ALFAJORES,
  FarmBotContract, getClaimRewardsFeeFraction,
  getFarmBotContract,
  getKit,
  getStakingRewardsContractAddress
} from "../src/farm-bot-api"
import assert from "assert"
import {ContractKit} from "@celo/contractkit"
import * as fs from "fs";
import {promisify} from "util";
import BigNumber from "bignumber.js";

const STAKING_REWARDS_ABI = require('../abis/staking-rewards.json')
const UBE_FACTORY_ABI = require('../abis/ube-factory.json')
const UBE_PAIR_ABI = require('../abis/ube-pair.json')
const ERC20_ABI = require('../abis/erc20.json')

const UBE_FACTORY_ADDRESS = '0x62d5b84bE28a183aBB507E125B384122D2C25fAE' // on mainnet and alfajores
const CELO_ADDRESS_ALFAJORES = '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9'

const WEI_PER_GWEI = 10**9
const MIN_GAS_LIMIT = 21784

/**
 * Get the expected payout in Celo gwei
 *
 * @param kit
 * @param farmBot
 * @param _walletAddress
 */
async function payoutValueInGWei(kit: ContractKit, farmBot: FarmBotContract, _walletAddress: string): Promise<number> {
  const stakingRewardsContractAddress = await getStakingRewardsContractAddress(farmBot)
  const stakingRewards = new kit.web3.eth.Contract(STAKING_REWARDS_ABI, stakingRewardsContractAddress)
  const unclaimedRewardsWei = await stakingRewards.methods.earned(FARM_BOT_ADDRESS_ALFAJORES).call()
  const rewardsTokenAddress = await stakingRewards.methods.rewardsToken().call()
  const rewardsTokenContract = new kit.web3.eth.Contract(ERC20_ABI, rewardsTokenAddress)
  const rewardsTokenBalanceWei = await rewardsTokenContract.methods.balanceOf(FARM_BOT_ADDRESS_ALFAJORES).call()
  const feeFraction = await getClaimRewardsFeeFraction(farmBot)
  const balanceAfterClaimWei = new BigNumber(rewardsTokenBalanceWei).plus(new BigNumber(unclaimedRewardsWei))
  const payoutWei = balanceAfterClaimWei.multipliedBy(feeFraction).integerValue(BigNumber.ROUND_FLOOR)
  return CELOGWeiValue(kit, rewardsTokenAddress, payoutWei)
}

async function CELOGWeiValue(kit: ContractKit, tokenAddress: string, amountWei: BigNumber): Promise<number> {
  const exchangeRate = await getExchangeRate(kit, CELO_ADDRESS_ALFAJORES, tokenAddress)
  return amountWei.multipliedBy(exchangeRate).dividedBy(WEI_PER_GWEI).toNumber()
}

/**
 * Returns the exchange rate between token1 and token2.
 *
 * For example, if token1 is cUSD and token2 is cEUR, return value should be around 1.13, since
 *  1.13 USD is worth 1 Euro (at time of writing).
 *
 * @param kit
 * @param token1Address
 * @param token2Address
 */
async function getExchangeRate(kit: ContractKit, token1Address: string, token2Address: string): Promise<number> {
  if (token1Address === token2Address) {
    return 1
  }
  console.debug(`Getting exchange rate from ${token1Address} to ${token2Address}`)
  const ubeFactory = new kit.web3.eth.Contract(UBE_FACTORY_ABI, UBE_FACTORY_ADDRESS)
  const pairAddress = await ubeFactory.methods.getPair(token1Address, token2Address).call()
  const pairContract = new kit.web3.eth.Contract(
    UBE_PAIR_ABI,
    pairAddress
  )
  const { reserve0, reserve1 } = await pairContract.methods.getReserves().call();

  const numerator = 997 * reserve0;
  const denominator = reserve1 * 1000 + 997;
  const exchangeRate = numerator / denominator;
  const output = token1Address < token2Address ? 1 / exchangeRate : exchangeRate;
  console.debug(`exchange rate: ${output}`)
  return output
}

function getGasCostFileName() {
  return `${__dirname}/../data/compoundGasCost.txt`
}

async function saveGasCost(gasCostGWei: number) {
  await promisify(fs.writeFile)(getGasCostFileName(), gasCostGWei.toString(10), {flag: 'w+'})
}

async function getSavedGasCostGwei(): Promise<number> {
  try {
    const gasCostStr = await promisify(fs.readFile)(getGasCostFileName())
    return parseInt(gasCostStr.toString())
  } catch (err) {
    if (err instanceof Error && err.message.includes('ENOENT')) {
      console.log('No save gas cost found, returning 0')
      return 0
    } else {
      throw err
    }
  }

}

/**
 * Claim and re-invest rewards for a farm bot contract, if the expected payout exceeds the expected cost.
 *
 * Farm bot will re-invest the rewards to earn compound interest on the rewards.
 *
 * The wallet calling the farm bot method will receive a bounty proportional to the amount of rewards the contract
 *  has earned since the last time rewards were claimed/reinvested.
 *
 * Avoids sending the transaction if the expected gas cost is higher than the expected reward.
 */
async function main(){
  const privateKey = process.env.ALFAJORES_WALLET_PRIVATE_KEY
  assert.ok(privateKey)
  const kit = await getKit(privateKey)
  const walletAddress = kit.web3.eth.defaultAccount
  assert.ok(walletAddress)
  const farmBot = getFarmBotContract(kit)

  const rewardGWei = await payoutValueInGWei(kit, farmBot, walletAddress)
  const costGWei = Math.max(await getSavedGasCostGwei(), MIN_GAS_LIMIT)
  if (rewardGWei > costGWei) {
    console.debug(`expected reward: ${rewardGWei}`)
    const {status, gasUsed: gasUsedGWei} = await claimRewards(farmBot, walletAddress, Math.floor(rewardGWei))
    assert.ok(status)
    await saveGasCost(gasUsedGWei)
  } else {
    console.log(`Not enough unclaimed rewards to be worth the gas (reward: ${rewardGWei}, cost: ${costGWei}). Doing nothing.`)
  }
}

main().catch(console.error)

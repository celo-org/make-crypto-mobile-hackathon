import Web3 from 'web3';
import { Contract } from 'web3-eth-contract'
import { getStakingRewardsContract } from './utils';
import { TokenManager, Token } from './token'
import { Pair } from './pair'
import BigNumber from 'bignumber.js';

// https://github.com/Ubeswap/ubeswap-farming/blob/7106f62eda7830a5fa5b766c3e65e1410fc82d5a/contracts/synthetix/contracts/StakingRewards.sol
export class StakingRewards {
  contract: Contract
  web3: Web3
  address: string
  stakingToken: Pair
  tokenManager: TokenManager
  rewardsToken: Token

  constructor(address: string, web3: Web3, stakingToken: Pair, tokenManager: TokenManager) {
    this.web3 = web3
    this.address = address
    this.contract = getStakingRewardsContract(address, web3)
    this.stakingToken = stakingToken
    this.tokenManager = tokenManager
  }

  async init() {
    const rewardsTokenAddress = await this.contract.methods.rewardsToken().call()
    this.rewardsToken = await this.tokenManager.getOrCreateTokenFromAddress(rewardsTokenAddress)
  }

  async rewards(address: string): Promise<BigNumber> {
    const rewards = await this.contract.methods.rewards(address).call()
    return new BigNumber(rewards)
  }

  async userRewardPerTokenPaid(address: string): Promise<BigNumber> {
    const userReward = await this.contract.methods.userRewardPerTokenPaid(address).call()
    return new BigNumber(userReward)
  }

  async rewardPerToken(): Promise<BigNumber> {
    const rewardPerToken = await this.contract.methods.rewardPerToken().call()
    return new BigNumber(rewardPerToken)
  }

  async getBalanceInWei(): Promise<BigNumber> {
    const balance = await this.contract.methods.balanceOf(this.web3.eth.defaultAccount).call()
    return new BigNumber(balance)
  }

  async getBalanceInUnits(): Promise<number> {
    const balanceInWei = await this.getBalanceInWei()
    return this.stakingToken.weiToUnits(balanceInWei).toNumber()
  }

  async earned(): Promise<BigNumber> {
    const earned = await this.contract.methods.earned(this.web3.eth.defaultAccount).call()
    return new BigNumber(earned)
  }

  async getRewardRateInUnits(): Promise<number> {
    const rewardRate = await this.contract.methods.rewardRate().call()
    return this.rewardsToken.weiToUnits(new BigNumber(rewardRate)).toNumber()
  }

  async getRewardsDuration(): Promise<number> {
    const rewardsDuration = await this.contract.methods.rewardsDuration().call()
    return rewardsDuration
  }

  async getRewardForDurationInUnits(): Promise<number> {
    const rewardForDuration = await this.contract.methods.getRewardForDuration().call()
    return this.rewardsToken.weiToUnits(new BigNumber(rewardForDuration)).toNumber()
  }

  async stakeMax() {
    const stakingTokenBalance = await this.stakingToken.getBalanceInWei()
    await this.stakingToken.approve(stakingTokenBalance, this.address)
    await this.contract.methods.stake(stakingTokenBalance).send({
      from: this.web3.eth.defaultAccount,
      gas: 250000
    })
  }

  async getReward() {
    await this.contract.methods.getReward().send({
      from: this.web3.eth.defaultAccount,
      gas: 250000
    })
  }
}

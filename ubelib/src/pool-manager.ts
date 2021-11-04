import Web3 from 'web3';
import { Contract } from 'web3-eth-contract'
import { getPoolManagerContract } from './utils';
import { PoolInfo } from './types'
import { PairManager, Pair } from './pair'
import { StakingRewards } from './staking-rewards'

export class PoolManager {
  web3: Web3;
  pairManager: PairManager;
  contract: Contract;
  pools: Pool[] = []
  pairMap: Record<string, Pool> = {}

  constructor(web3: Web3) {
    this.web3 = web3
    this.contract = getPoolManagerContract(web3)
    this.pairManager = new PairManager(web3)
  }

  async initPools(): Promise<void> {
    await this.pairManager.initPairs()
    const allPoolInfo = await this.getAllPoolInfo()
    for (const poolInfo of allPoolInfo) {
      try {
	const stakingToken = this.pairManager.fromAddress(poolInfo.stakingToken)
	const stakingRewards = new StakingRewards(poolInfo.poolAddress, this.web3, stakingToken, this.pairManager.tokenManager)
	const pool = new Pool(this.web3, stakingToken, stakingRewards)
	this.pools.push(pool)
	this.pairMap[stakingToken.address] = pool
      } catch {
	//console.log(`Error while getting pair for poolAddress: ${poolInfo.poolAddress}`)
      }
    }

    for (const pool of this.pools) {
      await pool.init()
    }
  }

  fromSymbols(symbolA: string, symbolB: string): Pool {
    const pair = this.pairManager.fromSymbols(symbolA, symbolB)
    return this.pairMap[pair.address]
  }

  async getPoolsCount(): Promise<number> {
    const poolsCount = await this.contract.methods.poolsCount().call()
    return poolsCount
  }

  async getPoolAddressByIndex(index: number): Promise<string> {
    const poolAddress = await this.contract.methods.poolsByIndex(index).call()
    return poolAddress
  }

  async getPoolAddresses(): Promise<string[]> {
    const poolsCount = await this.getPoolsCount()
    const poolAddresses: string[] = []
    for (let i = 0; i < poolsCount; i++) {
      const poolAddress = await this.getPoolAddressByIndex(i)
      poolAddresses.push(poolAddress)
    }
    return poolAddresses
  }

  async getAllPoolInfo(): Promise<PoolInfo[]> {
    const poolAddresses = await this.getPoolAddresses()
    const allPoolInfo = []
    for (const address of poolAddresses) {
      const poolInfo = await this.getPoolInfo(address)
      allPoolInfo.push(poolInfo)
    }
    return allPoolInfo
  }

  async getPoolInfo(address: string): Promise<PoolInfo> {
    const poolInfo = await this.contract.methods.pools(address).call()
    return {
      index: Number(poolInfo.index),
      stakingToken: poolInfo.stakingToken,
      poolAddress: poolInfo.poolAddress,
      weight: Number(poolInfo.weight),
      nextPeriod: Number(poolInfo.nextPeriod)
    }
  }
}

export class Pool {
  web3: Web3
  stakingToken: Pair
  pool: StakingRewards

  constructor(web3: Web3, stakingToken: Pair, pool: StakingRewards) {
    this.web3 = web3
    this.stakingToken = stakingToken
    this.pool = pool
  }

  async init() {
    await this.pool.init()
  }
}

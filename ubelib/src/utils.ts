import RouterAbi from './abis/Router.json';
import PoolManagerAbi from './abis/PoolManager.json';
import StakingRewardsAbi from './abis/StakingRewards.json';
import PairAbi from './abis/Pair.json';
import FactoryAbi from './abis/Factory.json';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import ERC20Abi from './abis/ERC20.json';
import Web3 from 'web3';
import { CUSD_ADDRESS, ROUTER_ADDRESS, FACTORY_ADDRESS, POOL_MANAGER_ADDRESS } from './consts';

export function getContract(address: string, abi: AbiItem[], web3: Web3): Contract {
    return new web3.eth.Contract(abi, address);
}

export function getStakingRewardsContract(address: string, web3: Web3): Contract {
  return getContract(address, StakingRewardsAbi as AbiItem[], web3)
}

export function getPoolManagerContract(web3: Web3): Contract {
  return getContract(POOL_MANAGER_ADDRESS, PoolManagerAbi as AbiItem[], web3)
}

export function getERC20Contract(address: string, web3: Web3): Contract {
    return getContract(address, ERC20Abi as AbiItem[], web3);
}

export function getPairContract(address: string, web3: Web3): Contract {
    return getContract(address, PairAbi as AbiItem[], web3);
}
export function getRouterContract(web3: Web3): Contract {
    return getContract(ROUTER_ADDRESS, RouterAbi as AbiItem[], web3);
}

export function getCusdContract(web3: Web3): Contract {
    return getERC20Contract(CUSD_ADDRESS, web3);
}

export function getFactoryContract(web3: Web3): Contract {
    return getContract(FACTORY_ADDRESS, FactoryAbi as AbiItem[], web3);
}

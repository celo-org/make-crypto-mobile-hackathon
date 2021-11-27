import {ContractKit, newKit} from "@celo/contractkit";
import {WrapperCache} from "@celo/contractkit/lib/contract-cache";

import {CeloTransactionObject} from '@celo/connect'
import * as assert from "assert";

const FARM_BOT_ABI = require('../abis/farmBot.json')


const FORNO_ALFAJORES_URL = 'https://alfajores-forno.celo-testnet.org'
const FARM_BOT_ADDRESS_ALFAJORES = '0x3B1E4f872a174a33F89711033Ec133748e92aCa0'
const LP_TOKEN_ADDRESS = '0xe952fe9608a20f80f009a43AEB6F422750285638' // Celo-cUSD LP

interface FarmBotContract {
  methods: {
    deposit: (amount: string) => CeloTransactionObject<boolean>
    withdraw: (amount: string) => any
    claimRewards: (deadline: number) => any
  }
}

export async function getKit(privateKey: string): Promise<ContractKit> {
  const kit = await newKit(FORNO_ALFAJORES_URL)
  const account = kit.web3.eth.accounts.privateKeyToAccount(privateKey)
  kit.web3.eth.accounts.wallet.add(account)
  kit.web3.eth.defaultAccount = account.address
  console.log('Getting account with address ' + account.address)
  return kit
}

export async function approve(kit: ContractKit, amount: string) {
  const walletAddress = kit.web3.eth.defaultAccount
  assert.ok(walletAddress)
  const tokenContract = await (new WrapperCache(kit)).getErc20(LP_TOKEN_ADDRESS)
  const approveTx = await tokenContract.approve(FARM_BOT_ADDRESS_ALFAJORES, amount).send({
    from: walletAddress,
    gas: 50000,
    gasPrice: 1000000000
  })
  return approveTx.waitReceipt()
}

export function getFarmBotContract(kit: ContractKit): FarmBotContract {
  return new kit.web3.eth.Contract(FARM_BOT_ABI, FARM_BOT_ADDRESS_ALFAJORES)
}

export async function deposit(kit: ContractKit, amount: string) {
  // NOTE: this invests in a farm now!
  const farmBotContract = getFarmBotContract(kit)
  assert.ok(kit.web3.eth.defaultAccount)
  return farmBotContract.methods.deposit(amount).send({
    from:kit.web3.eth.defaultAccount,
    gas: 1076506,
    gasPrice: 1000000000,
  })
}

export async function withdraw(kit: ContractKit, amount: string) {
  const farmBotContract = getFarmBotContract(kit)
  return farmBotContract.methods.withdraw(amount).send({
    from: kit.web3.eth.defaultAccount,
    gas: 1076506,
    gasPrice: 1000000000,
  })
}

export async function claimRewards(kit: ContractKit): Promise<boolean> {
  const farmBotContract = getFarmBotContract(kit)
  const tenSecondsFromNowDeadline = new Date().getTime() + 10*1000;
  return farmBotContract.methods.claimRewards(tenSecondsFromNowDeadline).send({
    from: kit.web3.eth.defaultAccount,
    gas: 1076506,
    gasPrice: 1000000000,
  })
}

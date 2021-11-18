const {newKit} = require('@celo/contractkit')
const assert = require('assert')
const FARM_BOT_ABI = require('../abis/farmBot.json')
const {WrapperCache} = require("@celo/contractkit/lib/contract-cache");

const FORNO_ALFAJORES_URL = 'https://alfajores-forno.celo-testnet.org'
const FARM_BOT_ADDRESS_ALFAJORES = '0xdcC4aE4C2563A3918081791d3e8640D06b82aC63'
const TOKEN_ADDRESS = '0xf3098223845F37Ffe4B3A066F2D38A0587317269' // mcUSD-Celo LP

async function getKit(privateKey) {
  const kit = await newKit(FORNO_ALFAJORES_URL)
  const account = kit.web3.eth.accounts.privateKeyToAccount(privateKey)
  kit.web3.eth.accounts.wallet.add(account)
  kit.web3.eth.defaultAccount = account.address
  console.log('Getting account with address ' + account.address)
  return kit
}

async function approve(kit, amount) {
  const walletAddress = kit.web3.eth.defaultAccount
  const tokenContract = await (new WrapperCache(kit)).getErc20(TOKEN_ADDRESS)
  const approveTx = await tokenContract.approve(FARM_BOT_ADDRESS_ALFAJORES, amount).send({
    from: walletAddress,
    gas: 50000,
    gasPrice: 1000000000
  })
  return approveTx.waitReceipt()
}

function getFarmBotContract(kit) {
  return new kit.web3.eth.Contract(FARM_BOT_ABI, FARM_BOT_ADDRESS_ALFAJORES)
}

async function deposit(kit, amount) {
  // NOTE: this invests in a farm now!
  const farmBotContract = getFarmBotContract(kit)
  return farmBotContract.methods.deposit(amount).send({
    from:kit.web3.eth.defaultAccount,
    gas: 1076506,
    gasPrice: 1000000000,
  })
}

async function withdraw(kit, amount) {
  const farmBotContract = getFarmBotContract(kit)
  return farmBotContract.methods.withdraw(amount).send({
    from: kit.web3.eth.defaultAccount,
    gas: 1076506,
    gasPrice: 1000000000,
  })
}

async function invest(kit) {
  const farmBotContract = getFarmBotContract(kit)
  return farmBotContract.methods.investInFarm().send({
    from: kit.web3.eth.defaultAccount,
    gas: 99000,
    gasPrice: 1000000000,
  })
}

/**
 * Runs a test confirming that a user cannot withdraw without having deposited,
 *  even if another user has deposited (so the contract has funds).
 *
 * Also confirms that the user who has deposited may withdraw their funds.
 *
 * Required env vars:
 * - ALFAJORES_WALLET_PRIVATE_KEY : mapping to valid private key of Alfajores wallet with at least 0.1 cUSD
 * - ALFAJORES_WALLET_PRIVATE_KEY_2 : must be different than ALFAJORES_WALLET_PRIVATE_KEY
 *
 * Currently farm bot takes LP tokens with this address: 0xf3098223845F37Ffe4B3A066F2D38A0587317269
 * To get these, you must first obtain Celo (native asset) and mcUSD, which is at this address: 0x71DB38719f9113A36e14F409bAD4F07B58b4730b
 * Then you can stake the Celo/mCUSD here: https://app.ubeswap.org/#/add/0x71DB38719f9113A36e14F409bAD4F07B58b4730b/0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9
 *
 * @returns {Promise<void>}
 */
async function main() {
  const kit1 = await getKit(process.env.ALFAJORES_WALLET_PRIVATE_KEY)
  const amount = kit1.web3.utils.toWei('0.01', 'ether')

  console.log(`approving for account ${kit1.web3.eth.defaultAccount}`)
  const approveResult = await approve(kit1, amount)
  assert.equal(approveResult.status, true, 'Unexpected approve result')

  console.log(`depositing LP for account ${kit1.web3.eth.defaultAccount}`)
  const depositResult = await deposit(kit1, amount)
  assert.equal(depositResult.status, true, 'Unexpected deposit result')

  const kit2 = await getKit(process.env.ALFAJORES_WALLET_PRIVATE_KEY_2)
  try {
    await withdraw(kit2, amount) // should fail (none deposited!)
  } catch (error) {
    if (!error.message.includes('Transaction has been reverted by the EVM')) {
      throw error
    }
  }

  console.log(`withdrawing LP for account ${kit1.web3.eth.defaultAccount}`)
  const user1withdrawResult = await withdraw(kit1, amount) // should pass
  assert.equal(user1withdrawResult.status, true, 'User 1 should be able to withdraw since they deposited already')
}

main().catch(console.error)

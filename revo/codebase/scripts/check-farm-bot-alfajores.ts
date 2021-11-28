import {approve, claimRewards, deposit, getFarmBotContract, getKit, withdraw} from "../src/farm-bot-api"
import assert from "assert"

/**
 * Runs a test confirming that a user cannot withdraw without having deposited,
 *  even if another user has deposited (so the contract has funds).
 *
 * Also confirms that the user who has deposited may withdraw their funds.
 *
 * Required env vars:
 * - ALFAJORES_WALLET_PRIVATE_KEY : mapping to valid private key of Alfajores wallet with at least 0.01 of the Celo-cUSD LP token
 * - ALFAJORES_WALLET_PRIVATE_KEY_2 : must be different than ALFAJORES_WALLET_PRIVATE_KEY
 *
 * Currently farm bot takes LP tokens with the address LP_TOKEN_ADDRESS
 * To get these, you must first obtain Celo (native asset) and cUSD at https://celo.org/developers/faucet
 * Then you can stake the Celo/cUSD here: https://app.ubeswap.org/#/add/0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1/0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9
 *
 * @returns {Promise<void>}
 */
async function main() {
  const privateKey = process.env.ALFAJORES_WALLET_PRIVATE_KEY
  assert.ok(privateKey)
  const kit1 = await getKit(privateKey)
  const farmBot = getFarmBotContract(kit1)
  const amount = kit1.web3.utils.toWei('0.01', 'ether')

  const walletAddress1 = kit1.web3.eth.defaultAccount
  assert.ok(walletAddress1)
  console.log(`approving for account ${walletAddress1}`)
  const approveResult = await approve(kit1, amount)
  assert.equal(approveResult.status, true, 'Unexpected approve result')

  console.log(`depositing LP for account ${walletAddress1}`)
  const depositResult = await deposit(kit1, amount)
  assert.equal(depositResult.status, true, 'Unexpected deposit result')

  const privateKey2 = process.env.ALFAJORES_WALLET_PRIVATE_KEY_2
  assert.ok(privateKey2)
  const kit2 = await getKit(privateKey2)
  try {
    console.log(`attempting to withdraw before depositing`)
    await withdraw(kit2, amount) // should fail (none deposited!)
  } catch (error) {
    if (error instanceof Error && !error.message.includes('Transaction has been reverted by the EVM')) {
      throw error
    }
  }

  const claimResult = await claimRewards(farmBot, walletAddress1)
  assert.equal(claimResult.status, true, 'Unexpected claim rewards result')

  console.log(`withdrawing LP for account ${walletAddress1}`)
  const user1withdrawResult = await withdraw(kit1, amount) // should pass
  assert.equal(user1withdrawResult.status, true, 'User 1 should be able to withdraw since they deposited already')
}

main().catch(console.error)

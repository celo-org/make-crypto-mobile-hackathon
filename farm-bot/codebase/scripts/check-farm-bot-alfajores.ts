const assert = require('assert')
const {getKit, approve, deposit, withdraw, claimRewards} = require("../src/farm-bot-api.ts");


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
    console.log(`attempting to withdraw before depositing`)
    await withdraw(kit2, amount) // should fail (none deposited!)
  } catch (error) {
    if (error instanceof Error && !error.message.includes('Transaction has been reverted by the EVM')) {
      throw error
    }
  }

  console.log(`claiming rewards`)
  const claimResult = await claimRewards(kit1)
  assert.equal(claimResult.status, true, 'Unexpected claim rewards result')

  console.log(`withdrawing LP for account ${kit1.web3.eth.defaultAccount}`)
  const user1withdrawResult = await withdraw(kit1, amount) // should pass
  assert.equal(user1withdrawResult.status, true, 'User 1 should be able to withdraw since they deposited already')
}

main().catch(console.error)

const responses = require('async-lambda-responses')
const path = require('path');
const config = require('../libs/config')
const web3 = require('web3')
const Ethereum = require('../libs/ethereum')
const dogeGame = require(path.join(config.layerPath, 'abis/DogeGame'))

console.log(config.httpProvider)

;module.exports = async (event, context) => {
  try {
    const ethereum = new Ethereum()
    await ethereum.setUp()
    const dogeGameAddress = require(path.join(config.layerPath, 'abis/DogeGame.' + ethereum.web3NetworkId))

    let isPaused = await ethereum.call({
      artifact: dogeGame,
      method: 'paused',
      address: dogeGameAddress
    })
    console.log(`is paused: ${isPaused}`)

    await ethereum.send({
      artifact: dogeGame,
      method: 'unpause',
      address: dogeGameAddress
    })

    isPaused = await ethereum.call({
      artifact: dogeGame,
      method: 'paused',
      address: dogeGameAddress
    })
    console.log(`is paused: ${isPaused}`)

    return responses.success({
      message: 'DogeGame paused'
    })
  } catch (err) {
    console.error(err)
    throw new Error(
      responses.error({
        message: 'DogeGame not paused'
      })
    )
  }
}

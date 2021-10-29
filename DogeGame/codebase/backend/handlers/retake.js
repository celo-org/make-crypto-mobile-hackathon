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

    console.log('retaking')
    await ethereum.send({
      artifact: dogeGame,
      method: 'retake',
      address: dogeGameAddress
    })
    console.log('retaken')

    return responses.success({
      message: 'OK'
    })
  } catch (err) {
    console.error(err)
    throw new Error(
      responses.error({
        message: 'FAIL'
      })
    )
  }
}

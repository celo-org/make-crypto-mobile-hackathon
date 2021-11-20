const fs = require('fs')
const isDev = fs.existsSync('./layer')

module.exports = {
  region: 'eu-west-1',
  isDev,
  mnemonic: 'shibasun',
  httpProvider: 'wss://forno.celo.org/ws',
  layerPath: isDev ? '../layer' : '/opt'
}

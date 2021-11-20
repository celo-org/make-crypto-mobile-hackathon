const fs = require('fs')
const isDev = fs.existsSync('./layer')

module.exports = {
  region: 'eu-west-1',
  isDev,
  mnemonic: 'shibasun',
  httpProvider: 'wss://alfajores-forno.celo-testnet.org/ws',
  layerPath: isDev ? '../layer' : '/opt'
}

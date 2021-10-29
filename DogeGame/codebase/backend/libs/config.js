const fs = require('fs')
const isDev = fs.existsSync('./layer')

module.exports = {
  region: 'eu-west-1',
  isDev,
  mnemonic: 'shibasun',
  httpProvider: 'https://alfajores-blockscout.celo-testnet.org',
  layerPath: isDev ? '../layer' : '/opt'
}

// is dev: localhost
// mainnet: 127.0.0.1
// testnet: 127.0.0.1?testnet

const isDev = window.location.hostname === 'localhost'
const isTestnet = window.location.href.includes('testnet')

const wsProvider = (() => {
  if(isDev) return 'ws://localhost:8545'
  if(isTestnet) return 'wss://alfajores-forno.celo-testnet.org/ws'
  return 'wss://alfajores-forno.celo-testnet.org/ws'
})()

const networkId = (() => {
    if(isDev) return 31337
    if(isTestnet) return 44787
    return 44787
})()

const telegramUrl = (() => {
  return '//t.me/TheDogeGame'
})()

console.log(`isDev: ${isDev}`)
console.log(`isTestnet: ${isTestnet}`)

module.exports = {
  isDev,
  wsProvider,
  networkId,
  maxPunchlineLength: 75,
  noWalletMessage: 'Please connect crypto wallet',
  telegramUrl,
  web3WSOptions: {
    timeout: 30000, // ms

    clientConfig: {
      // Useful to keep a connection alive
      keepalive: true,
      keepaliveInterval: 60000 // ms
    },

    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false
    }
  },
  leaderboardSize: 10,
  rpc: { // for wallet connect
    44787: 'http://localhost:8545',
    31337: 'http://localhost:8545',
  }
}

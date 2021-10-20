// is dev: localhost
// default: 127.0.0.1 - thundercore prod

const isDev = window.location.hostname === 'localhost'
const isTestnet = window.location.href.includes('testnet')

const wsProvider = (() => {
  if(isDev) return 'ws://localhost:8545'
  if(isTestnet) return 'wss://speedy-nodes-nyc.moralis.io/92fd62a6c099c05d87a5e3c0/bsc/testnet/ws'
  return 'wss://speedy-nodes-nyc.moralis.io/92fd62a6c099c05d87a5e3c0/bsc/mainnet/ws'
})()

const networkId = (() => {
    if(isDev) return 31337
    if(isTestnet) return 97
    return 56
})()

const telegramUrl = (() => {
  return '//t.me/OxPunchline'
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
  leaderboardSize: 12,
  rpc: {
    31337: 'http://localhost:8545',
    56: 'https://speedy-nodes-nyc.moralis.io/92fd62a6c099c05d87a5e3c0/bsc/mainnet',
    97: 'https://speedy-nodes-nyc.moralis.io/92fd62a6c099c05d87a5e3c0/bsc/testnet'
  }
}

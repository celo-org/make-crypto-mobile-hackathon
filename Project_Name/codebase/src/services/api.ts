import axios from 'axios'

const api = axios.create({
  baseURL: 'https://best-nft-server.herokuapp.com'
});

const apiCoingeckoEthereumValue = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/coins/ethereum'
})

export {api, apiCoingeckoEthereumValue};

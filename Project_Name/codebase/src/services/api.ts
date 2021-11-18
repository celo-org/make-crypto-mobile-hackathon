import axios from 'axios'

const api = axios.create({
  baseURL: 'https://best-nft-server.herokuapp.com'
});

export default api;

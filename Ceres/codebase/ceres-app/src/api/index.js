import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://ceres.lovecrypto.net/v1/app',
});

export const contractApi = axios.create({
  baseURL: 'http://167.172.192.143:4040'
})
 
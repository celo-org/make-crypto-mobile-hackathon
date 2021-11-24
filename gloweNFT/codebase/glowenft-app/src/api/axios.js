import axios from 'axios';
import config from '../dotenv';
import { store } from '../state';
import { getUserToken } from '../state/user';

console.log(config.apiUrl)
axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.interceptors.request.use(conf => {
    const state = store.getState();
    const token = getUserToken(state);
    console.log({token})

    conf.headers['Authorization'] = `Bearer ${token}`;
    conf.headers['x-access-token'] = `${token}`;
    console.log({conf})
    return conf;
  },
  error => {
    return Promise.reject(error);
  }
);

export const axiosDefi = axios.create({
  baseURL: 'https://farm.army'
})

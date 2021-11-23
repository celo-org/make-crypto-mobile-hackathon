import axios from 'axios';
import config from '../dotenv';
import {store} from './../state';
import {
  setUserData,
  getUserId as getUserIdRedux,
  getUserToken,
  setUserOrders, setUserToken, getUserData, setAllNft, setMyNft, getUserId,
} from "../state/user";
import t from '../i18n';
import _ from 'lodash';
import base64 from 'base-64';
import {axiosDefi} from './axios';

export const uploadFile = async (uri, id, type) => {
  let data = new FormData();
  data.append('file', {
    uri,
    name: 'image',
    type: 'image/jpeg',
  });
  data.append('linkedEntity.linkedEntityType', type);
  data.append('linkedEntity.linkedEntityId', id);

  return await postData('/uploads', data);
};

const postData = async (url, body) => {
  try {
    const {data} = await axios.post(url, body);
    return {response: data};
  } catch (error) {
    return {error};
  }
};

// USER
export const apiRegister = async (email, password, username) => {
  try {
    const body = {
      email: email.toLowerCase(),
      password,
      username,
    }
    const {data: register} = await axios.post('/api/users/register', body);
    return register;
  } catch (e) {
    console.log({e});
    return null;
  }
};

export const apiLogin = async (email, password) => {
  try {
    const body = {
      email: email.toLowerCase(),
      password,
    }
    const {data: login} = await axios.post('/api/users/login', body);
    console.log({login})
    store.dispatch(setUserData(login));
    store.dispatch(setUserToken(login.token));
    return login;
  } catch (e) {
    console.log({e});
    return null;
  }
};

export const getAllNft = async () => {
  try {
    const {data: nfts} = await axios.get('/api/nfts');
    console.log({nfts})
    store.dispatch(setAllNft(nfts))
    getMyNft()
    return nfts
  } catch (e) {
    console.log({e});
    return null;
  }
};
export const getMyNft = async () => {
  try {
    const state = store.getState()
    const userId = getUserId(state)
    const {data: myNfts} = await axios.get(`/api/nfts?ownerId=${userId}`);
    console.log({myNfts})
    store.dispatch(setMyNft(myNfts))
    return myNfts
  } catch (e) {
    console.log({e});
    return null;
  }
};
export const getAllNftFiltered = async (search) => {
  try {
    const {data: nfts} = await axios.get('/api/nfts');
    console.log({nfts})
    return nfts
  } catch (e) {
    console.log({e});
    return null;
  }
};

export const getAllArtist = async () => {
  try {
    const {data: artist} = await axios.get('/api/users');
    console.log({artist})
    return artist

  } catch (e) {
    console.log({e});
    return null;
  }
};


export const uploadImageAndGetCid = async (image) => {
  try {
    console.log({image})
    let data = new FormData();
    data.append('file', {
      uri: image,
      name: 'nft.jpg',
      type: 'image/jpeg',
    });
    const {data: upload} = await axios.post('/api/nfts/uploadtoipfs', data);
    console.log({upload})
    return upload[0].path

  } catch (e) {
    console.log({e});
    return null;
  }
};


export const createNft = async (newNft) => {
  try {
    const state = store.getState()
    const userData = getUserData(state)
    const body = {
      name: newNft.name,
      description: newNft.description,
      url: newNft.url,
      number: newNft.copies,
      ownerId: userData._id,
      creatorId: userData._id,
      // "tags": [
      //   "gtd",
      //   "middle"
      // ],
      // "collectionId": "id1",
      // "batch": "1",
    }
    const {data: createdNft} = await axios.post('/api/nfts', body);
    console.log({createdNft})
    getAllNft()
    return createdNft

  } catch (e) {
    console.log({e});
    return null;
  }
};

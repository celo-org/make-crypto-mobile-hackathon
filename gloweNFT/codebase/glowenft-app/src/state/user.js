// @flow

import { combineReducers } from 'redux';
import {loginNetwork} from '../api';
import _ from 'lodash'
// ACTION TYPES

const USER_LOGIN = 'state/user/login';
const USER_LOGIN_SUCCESS = 'state/user/login/success';
const USER_LOGIN_FAILURE = 'state/user/login/failure';
const USER_LOGOUT = 'state/user/logout';
const USER_DATA_SET = 'state/user/data';
const USER_TEST = 'state/user/test';
const USER_ORDERS = 'state/user/orders';
const USER_TOKEN = 'state/user/token';
const USER_ALL_NFT = 'state/user/allNft';
const USER_MY_NFT = 'state/user/myNft';

// ACTIONS

export const userLoginSuccess = (payload) => ({
  type: USER_LOGIN_SUCCESS,
  payload,
});

export const userLoginFailed = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const setUserData = (userData) => {
  return {
    type: USER_DATA_SET,
    payload: userData,
  };
};

export const setUserTest = (userData) => {
  return {
    type: USER_TEST,
    payload: userData,
  };
};

export const setUserOrders = (orders) => {
  return {
    type: USER_ORDERS,
    payload: orders,
  };
};


export const setUserToken = (token) => {
  return {
    type: USER_TOKEN,
    payload: token,
  };
};
export const setAllNft = (nfts) => {
  return {
    type: USER_ALL_NFT,
    payload: nfts,
  };
};
export const setMyNft = (nfts) => {
  return {
    type: USER_MY_NFT,
    payload: nfts,
  };
};



// THUNKS

export const userLogin = (phone, password) => async (dispatch, getState) => {
  try {
    const { access_token, user } = await loginNetwork(phone, password);
    console.log({access_token, user})
    if (access_token && user) {
      dispatch(userLoginSuccess(access_token));
      dispatch(setUserData(user));
    } else {
      return Promise.reject('error');
    }
    return Promise.resolve({ access_token, user })
  } catch (e) {
    console.log(e);
    return Promise.reject(e)
  }

};

// REDUCERS

const userData = (state = {}, { type, payload }) => {

  switch (type) {
    case USER_DATA_SET:
      return { ...payload} ;

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

const orders = (state = [], { type, payload }) => {

  switch (type) {
    case USER_ORDERS:
      return [...payload];

    default:
      return state;
  }
};



const token = (state = [], { type, payload }) => {

  switch (type) {
    case USER_TOKEN:
      return payload;

    default:
      return state;
  }
};

const allNft = (state = [], { type, payload }) => {

  switch (type) {
    case USER_ALL_NFT:
      return [...payload];

    default:
      return state;
  }
};

const myNft = (state = [], { type, payload }) => {

  switch (type) {
    case USER_MY_NFT:
      return [...payload];

    default:
      return state;
  }
};



export default combineReducers({
  token,
  userData,
  orders,
  allNft,
  myNft
});

// SELECTORS

export const getUserToken = (state) => state.user.token;

export const getUserData = (state) => state.user.userData;

export const getUserOrders = (state) => state.user.orders || [];

export const getUserId = (state) => state.user.userData._id;

export const getStateAllNft = (state) => _.get(state, 'user.allNft', [])

export const getStateMyNft = (state) => _.get(state, 'user.myNft', [])


import { ethers } from "ethers";
import TokenCreator from "../../contracts/TokenCreator.json";
import addresses from "../../contracts/addresses.json";
import Vue from "vue";

const state = {
  tokens: [],
  tokenCreatorAbi: null,
  tokenCreatorAddress: null,
  tokenCreator: null,
  listener: null,
  error: null,
};

const getters = {
  getError(state) {
    return state.error;
  },
  getTokens(state) {
    return state.tokens;
  },
  getTokenCreatorAbi(state) {
    return state.tokenCreatorAbi;
  },
  getTokenCreatorAddress(state) {
    return state.tokenCreatorAddress;
  },
};

const actions = {
  async init({ commit, dispatch, rootState }) {
    commit("setError", null);
    try {
      const signer = rootState.accounts.signer;
      let chainIdDec = parseInt(rootState.accounts.network.chainId);
      let tokenCreatorAddress = addresses.TokenCreator[chainIdDec];

      let tokenCreator = new ethers.Contract(
        tokenCreatorAddress,
        TokenCreator.abi,
        signer
      );
      commit("setTokenCreatorAbi", TokenCreator.abi);
      commit("setTokenCreatorAddress", tokenCreatorAddress);
      commit("setTokenCreator", tokenCreator);
      dispatch("fetchTokens");
      dispatch("initListener");
    } catch (e) {
      commit("setError", "Wrong network");
    }
  },
  async fetchTokens({ commit, rootState, state }) {
    if (state.tokenCreator == null) return;
    let account = rootState.accounts.activeAccount;
    let tokensRaw = await state.tokenCreator.getTokensOfOwner(account);
    let tokens = tokensRaw.map((raw) => ({
      name: raw[0],
      symbol: raw[1],
      initialSupply: raw[2],
      type: raw[3],
      address: raw[4],
    }));

    commit("setTokens", tokens);
  },
  async initListener({ dispatch }) {
    if (state.listener != null) return;
    state.listener = state.tokenCreator.on(
      "CreatedSimpleToken",
      (_from, value) => {
        // show a toast
        Vue.toasted.show("New Token Created " + value, {
          type: "success",
          duration: 5000,
          theme: "bubble",
          position: "top-center",
        });
        dispatch("fetchTokens");
      }
    );
  },
  async createSimpleToken(_, data) {
    state.tokenCreator.createSimpleToken(
      data.initialSupply,
      data.name,
      data.symbol
    );
  },
  async clear({ commit }) {
    if (state.listener != null) {
      state.tokenCreator.removeListener("CreatedSimpleToken");
      state.listener = null;
    }
    commit("setTokens", []);
  },
};

const mutations = {
  setError(state, error) {
    state.error = error;
  },
  setTokens(state, _tokens) {
    state.tokens = _tokens;
  },
  setTokenCreatorAbi(state, abi) {
    state.tokenCreatorAbi = abi;
  },
  setTokenCreatorAddress(state, address) {
    state.tokenCreatorAddress = address;
  },
  setTokenCreator(state, tokenCreator) {
    state.tokenCreator = tokenCreator;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

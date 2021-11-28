import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    wallet: localStorage.getItem("wallet") || null,
    account: null,
    naffy: null,
  },
  mutations: {
    setWallet(state, wallet) {
      state.wallet = wallet
      localStorage.setItem("wallet", wallet)
    },

    setAccount(state, account) {
      state.account = account
    },

    setNaffy(state, naffy) {
      state.naffy = naffy
    },
  },

  actions: {
    setWallet({ commit }, wallet) {
      commit("setWallet", wallet)
    },
    setAccount({ commit }, account) {
      commit("setAccount", account)
    },
    setNaffy({ commit }, naffy) {
      commit("setNaffy", naffy)
    },
  },
})

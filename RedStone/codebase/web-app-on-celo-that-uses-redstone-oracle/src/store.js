import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prices: {},
    liquidity: {},
    liquidityLoadingCompleted: false,
    baseCurrency: localStorage.baseCurrency || 'CELO', // possible values: CELO, cUSD
  },
  mutations: {
    updatePrices(state, payload) {
      state.prices = payload;
    },

    setLiquidityForToken(state, payload) {
      state.liquidity = {
        ...state.liquidity,
        [payload.symbol]: payload.liquidity,
      };
    },

    completeLiquidityLoading(state) {
      state.liquidityLoadingCompleted = true;
    },

    setBaseCurrency(state, payload) {
      state.baseCurrency = payload;
    },
  },
  actions: {
    updatePrices({ commit }, prices) {
      commit('updatePrices', prices);
    },

    setLiquidityForToken({ commit }, { symbol, liquidity }) {
      commit('setLiquidityForToken', { symbol, liquidity });
    },

    completeLiquidityLoading({ commit }) {
      commit('completeLiquidityLoading');
    },

    setBaseCurrency({ commit }, baseCurrency) {
      localStorage.baseCurrency = baseCurrency;
      commit('setBaseCurrency', baseCurrency);
    },
  },
});

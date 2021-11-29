import Vue from "vue";
import Vuex from "vuex";
import accounts from "./modules/accounts";
import accounts2 from "./modules/accounts2";
import tokenCreator from "./modules/tokenCreator";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    accounts,
    accounts2,
    tokenCreator,
  },
});

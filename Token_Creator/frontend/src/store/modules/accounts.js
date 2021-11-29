import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import Authereum from "authereum";

const state = {
  activeAccount: null,
  activeBalance: 0,
  network: null,
  provider: null,
  signer: null,
  isConnected: false,
  web3Modal: null,
};

const getters = {
  getActiveAccount(state) {
    return state.activeAccount;
  },
  getActiveBalanceWei(state) {
    return state.activeBalance;
  },
  getActiveBalanceEth(state) {
    return ethers.utils.formatEther(state.activeBalance);
  },
  getNetwork(state) {
    return state.network;
  },
  getChainName(state) {
    return state.chainName;
  },
  getProviderEthers(state) {
    return state.provider;
  },
  getWeb3Modal(state) {
    return state.web3Modal;
  },
  isUserConnected(state) {
    return state.isConnected;
  },
};

const actions = {
  /**
   * Loads Accounts data when wallet is connected and initializes TokenCreator
   */
  async initWeb3Modal({ commit, dispatch }) {
    const web3Modal = new Web3Modal({
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            rpc: {
              44787: "https://alfajores-forno.celo-testnet.org",
              42220: "https://forno.celo.org",
            },
          },
        },
        burnerconnect: {
          package: BurnerConnectProvider, // required
        },
        authereum: {
          package: Authereum, // required
        },
      },
    });
    commit("setWeb3Modal", web3Modal);

    // This will get deprecated soon. Setting it to false removes a warning from the console.
    if (window.ethereum != null) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }

    if (localStorage.getItem("isConnectedWallet") === "true") {
      dispatch("connectWeb3Modal");
    }
  },

  async connectWeb3Modal({ commit, dispatch }) {
    let providerW3m = await state.web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(providerW3m);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const balance = await provider.getBalance(address);

    commit("setIsConnected", true);
    commit("setActiveAccount", address);
    commit("setSigner", signer);
    commit("setProvider", provider);
    commit("setNetwork", network);
    commit("setActiveBalance", balance);
    dispatch("tokenCreator/init", {}, { root: true });
  },
  async initListener() {},

  async disconnectWeb3Modal({ commit, dispatch }) {
    await state.web3Modal.clearCachedProvider();
    commit("disconnectWallet");
    commit("setIsConnected", false);
    dispatch("tokenCreator/clear", {}, { root: true });
  },

  /**
   * Fetches Tokens and Balances of an account.
   * Used when account or chain changed.
   */
  async fetchActiveData({ dispatch }) {
    dispatch("tokenCreator/fetchTokens", {}, { root: true });
    dispatch("fetchActiveBalance");
  },

  async fetchActiveBalance({ commit }) {
    let balance = await state.provider.getBalance(state.activeAccount);
    commit("setActiveBalance", balance);
  },
};

const mutations = {
  async disconnectWallet(state) {
    state.activeAccount = null;
    state.activeBalance = 0;
    state.provider = null;
    state.signer = null;
  },

  setActiveAccount(state, selectedAddress) {
    state.activeAccount = selectedAddress;
  },

  setActiveBalance(state, balance) {
    state.activeBalance = balance;
  },

  async setProvider(state, provider) {
    state.provider = provider;
  },

  setIsConnected(state, isConnected) {
    state.isConnected = isConnected;
    localStorage.setItem("isConnectedWallet", isConnected);
  },

  setWeb3Modal(state, web3Modal) {
    state.web3Modal = web3Modal;
  },
  setSigner(state, signer) {
    state.signer = signer;
  },
  setNetwork(state, network) {
    state.network = network;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

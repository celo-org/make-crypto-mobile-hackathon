import { ethers } from "ethers";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

const state = {
  web3Provider: null,
  activeAccount: null,
  activeBalance: 0,
  chainId: null,
  chainName: null,
  providerEthers: null, // this is "provider" for Ethers.js
  isConnected: false,
  providerW3m: null, // this is "provider" from Web3Modal
  web3Modal: null,
};

const getters = {};

const actions = {
  async connectWalletConnect() {
    const provider = new WalletConnectProvider({
      rpc: {
        44787: "https://alfajores-forno.celo-testnet.org",
        42220: "https://forno.celo.org",
      },
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    //  Wrap with Web3Provider from ethers.js
    const web3Provider = new providers.Web3Provider(provider);

    state.web3Provider = web3Provider;
    state.ethersProvider = new ethers.providers.Web3Provider(web3Provider);

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      console.log(chainId);
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
    });

    console.log(await state.ethersProvider.getSigner());
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

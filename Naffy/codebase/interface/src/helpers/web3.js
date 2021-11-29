import Web3 from "web3"
import { newKitFromWeb3 } from "@celo/contractkit"
import { abi } from "./abi"
import { store } from "../store"
import { common } from "../config/common"

export const web3 = {
  async connect(wallet = store.state.wallet) {
    let provider
    if (wallet === "Metamask") {
      provider = window.ethereum
    } else if (wallet === "Celowallet") {
      provider = window.celo
    }

    if (!provider) {
      const error = `Please use a blockchain enabled browser`
      return alert(error)
    } else {
      try {
        const accounts = await provider.request({ method: "eth_requestAccounts" })
        await this.switchChain(provider)

        window.provider = provider
        window.web3 = new Web3(provider)
        window.kit = newKitFromWeb3(window.web3)

        window.connection = window.kit.connection
        window.connection.defaultAccount = accounts[0]

        store.dispatch("setWallet", wallet)
        store.dispatch("setAccount", window.connection.defaultAccount)
        store.dispatch("setNaffy", new window.connection.web3.eth.Contract(abi.naffy, process.env.VUE_APP_NAFFY_CONTRACT_ADDRESS))

        return accounts[0]
      } catch (e) {
        store.dispatch("setWallet", null)
        alert(`Please choose an account from ${wallet}`)
        return
      }
    }
  },

  async switchChain(provider) {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaef3" }],
      })
    } catch (error) {
      if (error.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [common.alfajoresConnectParams],
          })
        } catch (error) {
          alert(error.message)
        }
      }
    }
  },

  getERC20Contract(address) {
    if (window.connection) {
      return new window.connection.web3.eth.Contract(abi.erc20, address)
    }
    throw new Error("Blockchain connection not established")
  },

  getNFTContract(address) {
    if (window.connection) {
      return new window.connection.web3.eth.Contract(abi.naffyNFT, address)
    }
    throw new Error("Blockchain connection not established")
  },
}

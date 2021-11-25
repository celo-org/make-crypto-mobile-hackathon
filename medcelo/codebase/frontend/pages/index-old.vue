<template>
  <div>
    <button @click="connectToWallet">Connect Wallet</button>
    <button @click="getItems">Get Item</button>
    <p>{{ cUSDBalance }}</p>

    <form action="http://localhost:8080" enctype="multipart/form-data" method="post">
      <input type="file" name="thumbnail">
      <button type="submit">Hello</button>
    </form>
  </div>
</template>

<script>
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'

import erc20Abi from "../contracts/erc20.abi.json"
import contractAbi from "../contracts/imagestock.abi.json"

const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
const contractAddress = '0x2e243862d8ef857455CF913c66f4eD2d0cD092e1';

const ERC20_DECIMALS = 18

export default {
  data() {
    return {
      provider: null,
      kit: null,
      cUSDBalance: 0,
      contract: null,
    }
  },
  async mounted() {

    try {

      await this.connectToWallet()

      await this.getWalletBalance()

    } catch (error) {
      console.log('can not wallet balance')
    }
          
  },
  methods: {
    
    connectToWallet: async function () {

      const provider = new WalletConnectProvider({
        rpc: {
          44787: 'https://alfajores-forno.celo-testnet.org',
          42220: 'https://forno.celo.org',
        },
      })

      await provider.enable()

      const web3 = new Web3(provider)

      let kit = newKitFromWeb3(web3)

      const accounts = provider.accounts;

      kit.defaultAccount = accounts[0]

      this.provider = provider

      this.kit = kit

      this.contract = new kit.web3.eth.Contract(contractAbi, contractAddress)

    },

    getItems : async function () {

      const _projectsLength = await this.contract.methods.getImageCount().call()

    },

    getWalletBalance: async function () {

      const totalBalance = await this.kit.getTotalBalance(this.kit.defaultAccount)
      
      const cUSDBalance = await totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2)

      this.cUSDBalance = cUSDBalance

      return cUSDBalance

    },

  },
}
</script>

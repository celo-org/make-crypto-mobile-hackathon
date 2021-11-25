<template>
  <main>
    <Header @connectToWallet="connectToWallet()" />
    <Banner />
    <Hero />
    <ItemHeader
      title="Campaigns"
      tagline="We are fully decentralized and the funds donated goes directly to the fundraisers."
    />
    <ListItem :items="items" />
    <Footer />
  </main>
</template>
<script>
import Banner from '~/components/widgets/Banner.vue'
import Header from '~/components/headers/Header.vue'
import ListItem from '~/components/widgets/ListItem.vue'
import Hero from '~/components/widgets/Hero.vue'
import Footer from '~/components/footers/Footer.vue'
import ItemHeader from '~/components/widgets/ItemHeader.vue'

import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'

import erc20Abi from '../contracts/erc20.abi.json'
import contractAbi from '../contracts/imagestock.abi.json'

const cUSDContractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'
const contractAddress = '0x2e243862d8ef857455CF913c66f4eD2d0cD092e1'

const ERC20_DECIMALS = 18

export default {
  components: { ListItem, Hero, Footer, Header, Banner, ItemHeader },
  data() {
    return {
      provider: null,
      kit: null,
      cUSDBalance: 0,
      contract: null,
      items: [
        {
          title: 'hehhevhehehg hjehgehe',
          excerpt: 'kshgsyugshvshgshgs',
          tags: ['yhejhee', 'yugwywtg', 'kjhsjghsg'],
          fundraiser: 'lkjshsjhjsj',
          goal: 1000,
          start_date: 'hsghhgsfgh',
          raised: 100,
        },
        {
          title: 'hehhevhehehg hjehgehe',
          excerpt: 'kshgsyugshvshgshgs',
          tags: ['yhejhee', 'yugwywtg', 'kjhsjghsg'],
          fundraiser: 'lkjshsjhjsj',
          goal: 1000,
          start_date: 'hsghhgsfgh',
          raised: 100,
        },
        {
          title: 'hehhevhehehg hjehgehe',
          excerpt: 'kshgsyugshvshgshgs',
          tags: ['yhejhee', 'yugwywtg', 'kjhsjghsg'],
          fundraiser: 'lkjshsjhjsj',
          goal: 1000,
          start_date: 'hsghhgsfgh',
          raised: 100,
        },
        {
          title: 'hehhevhehehg hjehgehe',
          excerpt: 'kshgsyugshvshgshgs',
          tags: ['yhejhee', 'yugwywtg', 'kjhsjghsg'],
          fundraiser: 'lkjshsjhjsj',
          goal: 1000,
          start_date: 'hsghhgsfgh',
          raised: 100,
        },
        {
          title: 'hehhevhehehg hjehgehe',
          excerpt: 'kshgsyugshvshgshgs',
          tags: ['yhejhee', 'yugwywtg', 'kjhsjghsg'],
          fundraiser: 'lkjshsjhjsj',
          goal: 1000,
          start_date: 'hsghhgsfgh',
          raised: 100,
        },
      ],
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

      try {
        const web3 = new Web3(provider)

        let kit = newKitFromWeb3(web3)

        const accounts = provider.accounts

        kit.defaultAccount = accounts[0]

        this.provider = provider

        this.kit = kit

        this.contract = new kit.web3.eth.Contract(contractAbi, contractAddress)
      } catch (error) {
        console.log(error);
      }
      
    },

    getItems: async function () {
      const _projectsLength = await this.contract.methods.getImageCount().call()
    },

    getWalletBalance: async function () {
      const totalBalance = await this.kit.getTotalBalance(
        this.kit.defaultAccount
      )

      const cUSDBalance = await totalBalance.cUSD
        .shiftedBy(-ERC20_DECIMALS)
        .toFixed(2)

      this.cUSDBalance = cUSDBalance

      return cUSDBalance
    },
  },
}
</script>
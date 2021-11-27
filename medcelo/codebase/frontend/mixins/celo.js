import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import BigNumber from "bignumber.js"


import erc20Abi from '../contracts/erc20.abi.json'
import contractAbi from '../contracts/medcelo.abi.json'

const cUSDContractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'
const contractAddress = '0x3D7135d3C55E76743341fc2C70F1ad794e2b1122'

const ERC20_DECIMALS = 18

export default {
    data() {
      return {
        provider: null,
        kit: null,
        cUSDBalance: 0,
        defaultAccount: null,
        contract: null,
      }
    },
    methods: {
      startProjectSample: async function () {
        await this.startProject()
      },
      connectToWallet: async function () {
        
        if(window.celo) {
  
          try {
  
            await window.celo.enable()
  
            const web3 = new Web3(window.celo)
  
            this.kit = newKitFromWeb3(web3)
  
            const accounts = await this.kit.web3.eth.getAccounts()
  
            this.defaultAccount = accounts[0]
          
            this.kit.defaultAccount = this.defaultAccount
  
            this.contract = new this.kit.web3.eth.Contract(contractAbi, contractAddress)
  
          } catch(e) {
  
            console.log(e)
  
          }
  
        }
  
      },

      getAllCampaign: async function() {

        const totalCampaign = await this.getTotalCampaign()
  
        for(let index = 0; index < totalCampaign; index++) {

          const item = await this.fetchCampaignFull(index)

          this.items.push(item)
        }
      },

      supportCampaign: async function (index, amount) {
        const totalCampaign = await this.contract.methods
          .supportCampaign(index, amount)
          .call()
        return totalCampaign
      },
  
      getTotalCampaign: async function () {
        const totalCampaign = await this.contract.methods
          .getTotalCampaign()
          .call()
        return totalCampaign
      },
  
      fetchCampaign: async function (_index) {
        const campaign = await this.contract.methods.fetchCampaign(_index).call()
  
        return Object.values(campaign)
      },
  
      fetchCampaignMeta: async function (_index) {
        const campaignMeta = await this.contract.methods.fetchCampaignMeta(_index).call()
  
        return Object.values(campaignMeta)
      },

      fetchCampaignFull: async function (index) {
            
        const campaign = await this.fetchCampaign(index)
  
        const campaignMeta = await this.fetchCampaignMeta(index)

        const [fundraiser, title, images, tags, description] = campaign

        const [supporters, goal, raised, end_time, active] = campaignMeta

        const item = {
            index: index,
            fundraiser: `${fundraiser.substring(0,16)}...`,
            title: title,
            images: images,
            tags: tags,
            excerpt: `${description.substring(0,50)}`,
            description: description,
            supporters: supporters,
            goal: parseFloat(goal),
            raised: parseFloat(raised),
            end_time: end_time,
            active: active,
        }
        return item
      },
  
      startCampaign: async function () {
        const result = this.contract.methods
          .startCampaign(
            'kshgsyugshvshgshgs',
            ['yhejhee', 'yugwywtg', 'kjhsjghsg', 'helloj', 'jahjhagh'],
            ['yhejhee', 'yugwywhsg'],
            'lkjshsjhjsj',
            1,
            100
          )
          .send({ from: this.kit.defaultAccount })
      },
  
      getWalletBalance: async function () {
        const totalBalance = await this.kit.getTotalBalance(
          this.defaultAccount
        )
  
        const cUSDBalance = await totalBalance.cUSD
          .shiftedBy(-ERC20_DECIMALS)
          .toFixed(2)
  
        this.cUSDBalance = cUSDBalance
  
        return cUSDBalance
      },
    },
  }
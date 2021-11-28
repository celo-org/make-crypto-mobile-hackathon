import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import BigNumber from "bignumber.js"


import erc20Abi from '../contracts/erc20.abi.json'
import contractAbi from '../contracts/medcelo.abi.json'


import Swal from 'sweetalert2'

const cUSDContractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'
const contractAddress = '0x6CBD7Fa1507124BF0E8b1812b5Fbc68554649db0'

const ERC20_DECIMALS = 18

export default {
    data() {
      return {
        provider: null,
        kit: null,
        cUSDBalance: 0,
        defaultAccount: null,
        contract: null,
        walletConnected: false
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


      approve:  async function (_price) {
        const cUSDContract = new this.kit.web3.eth.Contract(erc20Abi, cUSDContractAddress);
      
        const result = await cUSDContract.methods
          .approve(contractAddress, _price)
          .send({ from: this.defaultAccount });
        return result;
      },

      supportCampaign: async function(index) {
        
        Swal.fire({
          title: 'How much do you want to donate?',
          input: 'number',
          showCancelButton: true,
          confirmButtonText: 'Proceed',
          showLoaderOnConfirm: true,
          preConfirm: async (amount) => {
            console.log(amount)
            await this.supportCampaignHelper(index, parseInt(amount))
            Swal.fire(
              'Thank you!',
              'You just saved a live!',
              'success'
            )
          },
        })
      },

      supportCampaignHelper: async function (index, amount) {

        const _amount = BigNumber(amount).shiftedBy(18).toString()

        const params = [index, amount]

        await this.approve(_amount)

        const supportCampaign = await this.contract.methods
          .supportCampaign(...params)
          .send({ from: this.defaultAccount });
        return supportCampaign
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

        let _end_time = new Date(end_time * 1000);

        const item = {
            index: index,
            fundraiser: `${fundraiser.substring(0,16)}...`,
            title: title,
            images: Object.values(images),
            tags: Object.values(tags),
            excerpt: `${description.substring(0,50)}`,
            description: description,
            supporters: supporters,
            goal: parseFloat(goal),
            raised: parseFloat(raised),
            end_time:  `${_end_time.getUTCDay()}/${_end_time.getUTCMonth()}/${_end_time.getUTCFullYear()}`,
            active: active,
        }
        return item
      },
  
      startCampaign: async function (title,images, tags, description, goal, end_time) {
        const result = this.contract.methods
          .startCampaign(
            title,images, tags, description, goal
            .toString(), end_time
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
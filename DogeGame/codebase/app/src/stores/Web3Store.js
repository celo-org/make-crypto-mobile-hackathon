// /* global BigInt */

import Web3 from "web3";
import { observable, decorate , when } from "mobx";
import { toJS  } from "mobx";
import PunchlineAbi from "../abis/DogeGame.json";
import config from '../config'
import personsOverride from '../personsOverride'
import WalletConnectProvider from "@walletconnect/web3-provider";

const provider = new WalletConnectProvider({
  rpc: config.rpc,
  chainId: config.networkId
})

class Web3Store {

  // web3 connections
  web3WS
  web3Action

  web3NetworkId
  web3User

  punchlineWSInstance
  punchlineActionInstance

  // account page data
  web3Balance = '0'
  allowance = '0'
  prizePool = '0'

  // round data
  endsOn

  score = '0'
  scoreNow = 0
  leaderboard = []
  leaderboardNow = []
  lastWinners = []

  persons
  price
  owner
  paused

  punchlineAddress

  constructor() {
    this.PunchlineAddress = require( "../abis/DogeGame." + config.networkId + ".json")
    this.setWeb3WS()
    this.setPunchlineWSInstance()
    this.setEndsOn()
    this.setPersons() // async
    this.setPrizePool() // async
    this.setOwner() // async
    this.setPrice() // async
    this.setPaused()
    if(!config.isDev) this.handleEvents({connection: 'ws'})
    when(() => this.punchlineActionInstance, () => {
      if(config.isDev) this.handleEvents({connection: 'rpc'})
    })
    when(() => this.web3User, () => {
      this.setScore() // async
    })
    when(() => this.web3User && this.persons && this.owner, () => {
      setInterval(this.scoresInterval, 1500)
    })
  }

  testWalletConnection = async () => {
    try {
      console.log('test wallet connection')

      await this.web3Action.eth.sign(
        "You're connected to 0xPunchline",
        this.web3User
      )

      alert('OK - signed')
    } catch (err) {
      console.error(err)
      alert('BAD - not signed')
    }
  }

  scoresInterval = () => {
    const now = Math.floor(Date.now() / 1000)
    let scoreNow = 0
    let leaderboard = []

    // add current person owners to leaderboard if they are not there
    this.persons.map(person => {
      const found =  this.leaderboard.find(player => {
        return person.owner === player.player
      })

      if(!found && person.owner !== this.owner) {
        this.leaderboard.push({
          score: 0,
          player: person.owner
        })
      }

      return true
    })

    this.leaderboard.map(playerEl => {
      let { score, player } = playerEl
      score = +score
      this.persons.map(person => {
        if(person.owner === player) {
          score += now - person.timestamp
        }
        return true
      })

      return leaderboard.push({
        player, score
      })
    })

    leaderboard.sort((a,b) => b.score - a.score)

    this.leaderboardNow = leaderboard

    // update live score on person + user score
    this.persons.map(person => {
      if(person.owner === this.owner) {
        return true
      }

      person.score = now - person.timestamp

      if(person.owner === this.web3User) {
        scoreNow += person.score
      }

      return true
    })

    this.scoreNow = scoreNow
  }

  handleEvents = async ({ connection }) => {
    try {
      const punchlineInstance = connection === 'rpc' ? this.punchlineActionInstance : this.punchlineWSInstance

      punchlineInstance.events.Purchase({}, (error, event) => {
        if (error) {
          throw error
        }

        console.log(`${connection} event - Purchase`)
        this.handlePurchase(error, event)
      })

      punchlineInstance.events.Paused({}, (error, event) => {
        if (error) {
          throw error
        }
        this.paused = true
      })

      punchlineInstance.events.Unpaused({}, (error, event) => {
        if (error) {
          throw error
        }
        this.paused = false
        return this.handlePurchase(error, event)
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  handlePurchase = async (error, event) => {
    try {
      await this.setPersons()
      // @todo: could be refactored to Score event
      await this.setScore()
      // @todo: could be refactored to Purchase event, but also new round event
      await this.setPrizePool()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  convertArrayToObject = personArr => {
    const person = {}
    Object.keys(personArr).map(key => person[key] = personArr[key])
    return person
  }

  setWeb3WS = () => {
    var provider = new Web3.providers.WebsocketProvider(config.wsProvider, config.web3WSOptions)
    this.web3WS = new Web3(provider)

    provider.on("connect", ()=>{
      // console.log(`ws connected at ${new Date().toLocaleTimeString()}`)
    })

    provider.on("data", (event)=>{
      // console.log({event})
    })

    provider.on("changed", (event)=>{
      // console.log({event})
    })

    provider.on("end", ()=>{
      console.log("ws end")
    })

    provider.on("error", ()=>{
      console.log("ws error")
    })

    this.web3NetworkId = config.networkId
  }

  setPunchlineWSInstance = () => {
    this.punchlineWSInstance = new this.web3WS.eth.Contract(
      PunchlineAbi.abi,
      this.PunchlineAddress
    )
  }

  setPersons = async () => {
    try {
      let persons = (await this.punchlineWSInstance.methods.getPersons().call())
        .filter(p => p.active)
        .map(personArr => this.convertArrayToObject(personArr))
        .map(person => ({
          ...person,
          ...personsOverride[person.image]
        }))

      persons.sort((a, b) => +a.timestamp - +b.timestamp)

      // merge the data
      this.persons = persons

    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setPrice = async () => {
    try {
      // @todo: consider optimizing
      this.price = await this.punchlineWSInstance.methods.price().call()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setPrizePool = async () => {
    try {
      this.prizePool = await this.punchlineWSInstance.methods.prizePool().call()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setPaused = async () => {
    try {
      this.paused = await this.punchlineWSInstance.methods.paused().call()

      if(this.paused) {
        setTimeout(this.setPaused, 10000)
      }

    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setLeaderboard = async () => {
    try {
      const leaderboard = (await this.punchlineWSInstance.methods.getLeaderboard().call())

      this.leaderboard = leaderboard
        .map(
          personArr => this.convertArrayToObject(personArr)
        )
        .slice(0, config.leaderboardSize + 3)

      this.leaderboardNow = observable(this.leaderboard)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setLastWinners = async () => {
    try {
      this.lastWinners = (await this.punchlineWSInstance.methods.getLastWinners().call())
        .map(
          personArr => this.convertArrayToObject(personArr)
        )
console.log(toJS(this.lastWinners))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setOwner = async () => {
    try {
      this.owner = await this.punchlineWSInstance.methods.owner().call()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setWeb3Action = async ({ connector }) => {
    try {
      let accounts
      if(connector === 'walletconnect') {
        await provider.enable();
        this.web3Action = new Web3(provider);
        accounts = await this.web3Action.eth.getAccounts();
      } else if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false
        this.web3Action = new Web3(window.ethereum)
        accounts = window.ethereum.request ?
          await window.ethereum.request({method: 'eth_requestAccounts'}) :
          await window.ethereum.enable()
      }

      if(this.web3NetworkId !== await this.web3Action.eth.net.getId()) {
        alert(`Please switch to blockchain network with id: ${this.web3NetworkId}`)
        this.web3Action = undefined
        return
      }

      this.punchlineActionInstance = new this.web3Action.eth.Contract(
        PunchlineAbi.abi,
        this.PunchlineAddress
      )

      this.web3User = this.web3Action.utils.toChecksumAddress(accounts[0])
    } catch (err) {
      console.error(err)
    }
  }

  disconnectWallet = () => {
    try {
      if(localStorage.getItem('walletconnect')) {
        provider.disconnect()
        localStorage.removeItem('walletconnect')
      }
      this.web3User = null
    } catch (err) {
      console.error(err)
    }
  }

  buy = async({id, punch}) => {
    try {
      punch = punch.substring(0, config.maxPunchlineLength)

      if(!this.web3User) {
        return alert(config.noWalletMessage)
      }

      const value = this.price

      await this.punchlineActionInstance.methods.buy(id, punch).send({
        from: this.web3User,
        value
      })

    } catch (err) {
      console.error(err)
      alert('Take Over canceled')
    }
  }

  updatePersonPunchline = async({id, punch}) => {
    try {
      punch = punch.substring(0, config.maxPunchlineLength)

      await this.punchlineActionInstance.methods.updatePersonPunchline(id, punch).send({
        from: this.web3User
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setAllowance = async() => {
    try {
      this.allowance = (await this.punchlineWSInstance.methods.addressToAllowance(this.web3User).call()).value.toString()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setBalance = async() => {
    try {
      this.web3Balance = await this.web3Action.eth.getBalance(this.web3User)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setScore = async() => {
    try {
      this.score = await this.punchlineWSInstance.methods.scores(this.web3User).call()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  setEndsOn = () => {
    try {
      const day = new Date().getUTCDay()
      const hours = new Date().getUTCHours()
      const hour = ' 12PM UTC'
      const tue = 'Tue' + hour
      const thu = 'Thu' + hour
      const sun = 'Sun' + hour

      if (
        (day === 0 && hours >= 12) || (day === 1) || (day === 2 && hours < 12)
      ) {
        return this.endsOn = tue
      }

      if (
        (day === 2 && hours >= 12) || (day === 3) || (day === 4 && hours < 12)
      ) {
        return this.endsOn = thu
      }

      if (
        (day === 4 && hours >= 12) || (day === 5) || (day === 6) || (day === 0 && hours < 12)
      ) {
        return this.endsOn = sun
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  withdraw = async() => {
    if(this.paused) return

    try {
      await this.punchlineActionInstance.methods.withdraw().send({
        from: this.web3User
      })
      // @todo: wait for the event
      await Promise.all([
        this.setAllowance(),
        this.setBalance()
      ])
    } catch(err) {
      console.error(err)
    }
  }
}

export default decorate(Web3Store, {
  persons: observable,
  price: observable,
  prizePool: observable,
  owner: observable,
  web3User: observable,
  punchlineActionInstance: observable,
  web3Balance: observable,
  allowance: observable,
  score: observable,
  scoreNow: observable,
  leaderboardNow: observable,
  lastWinners: observable,
  paused: observable,
  isBanned: observable,
  endsOn: observable
})

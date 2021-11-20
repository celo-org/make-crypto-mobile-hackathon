const AWS = require('aws-sdk')
const config = require('./config')

const sm = new AWS.SecretsManager({
    region: config.region
});

const Web3 = require('web3')
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = class {
  async setUp() {
    const mnemonic = (await sm.getSecretValue({SecretId: config.mnemonic}).promise()).SecretString
    const provider = new HDWalletProvider(mnemonic, config.httpProvider)
    this.web3 = new Web3(provider)
    const accountIndex = 0
    this.web3User = (await this.web3.eth.getAccounts())[accountIndex]
    this.web3NetworkId = await this.web3.eth.net.getId()
  }

  async call({ artifact, method, address, args }) {
    try {
      let instance = new this.web3.eth.Contract(
        artifact.abi,
        address
      )
      return args ?
        await instance.methods[method](args).call() : await instance.methods[method]().call()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async send({ artifact, method, address, args }) {
    try {
      let instance = new this.web3.eth.Contract(
        artifact.abi,
        address
      )
      const sendParams = {
        from: this.web3User
      }
      return args ?
        await instance.methods[method](args).send(sendParams) : await instance.methods[method]().send(sendParams)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

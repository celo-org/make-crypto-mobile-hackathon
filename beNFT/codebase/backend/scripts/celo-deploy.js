const fs = require('fs');
const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')

const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

const marketData = require('../artifacts/contracts/NFTMarket.sol/NFTMarket.json')
const nftData = require('../artifacts/contracts/NFT.sol/NFT.json')

const secret = fs.readFileSync(".secret").toString().trim()

async function BenefiMarketplace() {
    let account = await web3.eth.accounts.privateKeyToAccount(secret)

    console.log('Wallet address: ', account.address)

    kit.connection.addAccount(account.privateKey)

    let marketTransaction = await kit.connection.sendTransaction({
        from: account.address,
        data: marketData.bytecode
    })
    let marketReceipt = await marketTransaction.waitReceipt()
    console.log(marketReceipt)

    let nftTransaction = await kit.connection.sendTransaction({
        from: account.address,
        data: nftData.bytecode
    })
    let nftReceipt = await nftTransaction.waitReceipt()
    console.log(nftReceipt)
}

module.exports = {
    BenefiMarketplace
}

import axios from 'axios'
import {ethers} from 'ethers'

let Web3 = require("web3")
let ContractKit = require("@celo/contractkit")

let marketData = require("../../../backend/artifacts/contracts/NFTMarket.sol/NFTMarket.json")
let nftData = require("../../../backend/artifacts/contracts/NFT.sol/NFT.json")

let kit
let marketContract
let nftContract

import {
    nftaddress, nftmarketaddress
} from '../../../backend/config'


export const connectCeloWallet = async function () {
    if (window.ethereum) {
        try {
            // Enable the extension to access the page if it isn't already enabled
            await window.ethereum.enable()

            // Get the ethereum provider injected by metamask
            const web3 = new Web3(window.ethereum)
            kit = ContractKit.newKitFromWeb3(web3)

            // Get the users accounts
            const accounts = await kit.web3.eth.getAccounts()
            kit.defaultAccount = accounts[0]

            // Init the contracts
            marketContract = new kit.web3.eth.Contract(marketData.abi, nftmarketaddress)

            nftContract = new kit.web3.eth.Contract(nftData.abi, nftaddress)
        } catch (error) {
            console.log(`⚠️ ${error}.`)
        }
    } else {
        alert("⚠️ Please install Metamask.")
    }
}

export const loadNFTs = async function () {
    // Get the ethereum provider injected by metamask
    const web3 = new Web3(window.ethereum)
    kit = ContractKit.newKitFromWeb3(web3)

    // Init the contracts
    marketContract = new kit.web3.eth.Contract(marketData.abi, nftmarketaddress)

    nftContract = new kit.web3.eth.Contract(nftData.abi, nftaddress)

    let networkType = await kit.web3.currentProvider.connection.web3.eth.net.getNetworkType()

    // TODO this is a workaround
    if (networkType.toString() !== 'private')
        return []

    let data = await marketContract.methods.fetchMarketItems().call()
    return NFTMapper(data)
}

export const createSale = async function (url, inputPrice) {
    /* Connect wallet, if needed, and create contracts */
    let _ = await  connectCeloWallet()

    /* next, create the item */

    console.log(nftmarketaddress)
    let nftTx = await nftContract.methods.createToken(url, nftmarketaddress).send({
        from: kit.defaultAccount
    })
    console.log(nftTx)
    let tokenId = nftTx.events.Transfer.returnValues.tokenId

    const price = ethers.utils.parseUnits(inputPrice, 'ether')

    /* then list the item for sale on the marketplace */
    let listingPrice = await marketContract.methods.getListingPrice().call()
    listingPrice = listingPrice.toString()

    let listMktTx = await marketContract.methods.createMarketItem(nftaddress, tokenId, price).send({
        from: kit.defaultAccount,
        value: listingPrice
    })
    console.log(listMktTx)
}

export const buyNFT = async function (nft) {
    console.log(nft);
    /* Connect wallet, if needed, and create contracts */
    let _ = await  connectCeloWallet()

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

    let tx = await marketContract.methods.createMarketSale(nftaddress, nft.itemId).send({
        from: kit.defaultAccount,
        value: price,
        gasLimit: 2000000
    })
    console.log(tx)
}

export const loadMyNFTs = async function () {
    let _ = await connectCeloWallet()

    let networkType = await kit.web3.currentProvider.connection.web3.eth.net.getNetworkType()

    // TODO this is a workaround
    if (networkType.toString() !== 'private')
        return undefined

    let data = await marketContract.methods.fetchMyNFTs().call()
    return NFTMapper(data)
}

export const loadMyCreatedNFTs = async function () {
    let _ = await connectCeloWallet()

    let networkType = await kit.web3.currentProvider.connection.web3.eth.net.getNetworkType()

    // TODO this is a workaround
    if (networkType.toString() !== 'private')
        return undefined

    let data = await marketContract.methods.fetchItemsCreated().call()
    return NFTMapper(data)
}

const NFTMapper = async function(data) {
    return await Promise.all(data.map(async i => {
        const tokenUri = await nftContract.methods.tokenURI(i.tokenId).call()
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        console.log(i)
        let item = {
            price,
            tokenId: i.tokenId,
            itemId: i.itemId,
            sold: i.sold,
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
        }
        return item
    }))
}


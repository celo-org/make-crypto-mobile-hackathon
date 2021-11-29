import { abi } from "./abi"
import { store } from "../store"
import { web3 } from "./web3"
import { api } from "./api"
import Web3 from "web3"

export const creator = {
  getContract(address) {
    if (window.connection) {
      return new window.connection.web3.eth.Contract(abi.creator, address)
    }
    throw new Error("Blockchain connection not established")
  },

  async newCreator(data) {
    const account = await web3.connect(store.state.wallet)
    const naffy = store.state.naffy

    naffy.methods
      .newCreator(process.env.VUE_APP_CUSD_CONTRACT_ADDRESS, process.env.VUE_APP_CEUR_CONTRACT_ADDRESS)
      .send({ from: account })
      .once("confirmation", async () => {
        data.address = await naffy.methods.ownerToCreator(account).call()
        data.owner = account

        await api.newCreator(data)
        window.location.href = "/#/creator/dashboard"
      })
  },

  async getCreatorDetails(address) {
    await web3.connect(store.state.wallet)
    const contract = this.getContract(address)

    return await contract.methods.getDetails().call()
  },

  async supportWithToken(address, token, amount) {
    const account = await web3.connect(store.state.wallet)
    const contract = this.getContract(address)

    if (token === "CELO") {
      await contract.methods.supportWithCelo().send({ from: account, value: Web3.utils.toWei(amount) })
    } else if (token === "cUSD" || token === "cEUR") {
      const erc20Token = web3.getERC20Contract(token === "cUSD" ? process.env.VUE_APP_CUSD_CONTRACT_ADDRESS : process.env.VUE_APP_CEUR_CONTRACT_ADDRESS)
      token = token === "cUSD" ? 1 : 2

      await erc20Token.methods.approve(address, Web3.utils.toWei(amount)).send({ from: account })
      await contract.methods.supportWithToken(Web3.utils.toWei(amount), token).send({ from: account })
    }
  },

  async supportWithNFT(creatorAddress, tokenId, nftAddress) {
    const account = await web3.connect(store.state.wallet)
    const contract = this.getContract(creatorAddress)
    const nft = web3.getNFTContract(nftAddress)

    await nft.methods.approve(creatorAddress, tokenId).send({ from: account })
    await contract.methods.supportWithNFT(tokenId, nftAddress).send({ from: account })
  },

  async getActivities(address) {
    await web3.connect(store.state.wallet)
    const contract = this.getContract(address)

    const lastId = await contract.methods.lastActivityId().call()
    const activities = []

    for (let i = 0; i < lastId; i++) {
      const activity = await contract.methods.activities(i + 1).call()
      activity.id = i + 1

      activities.push(activity)
    }

    return activities
  },

  async getSupporters(address) {
    await web3.connect(store.state.wallet)
    const contract = this.getContract(address)

    const lastId = await contract.methods.lastSupporterId().call()
    const supporters = []

    for (let i = 0; i < lastId; i++) {
      supporters.push(await contract.methods.supporters(i + 1).call())
    }

    return supporters
  },

  async getSupportersCount(address) {
    await web3.connect(store.state.wallet)
    const contract = this.getContract(address)

    return await contract.methods.lastSupporterId().call()
  },

  async getCreatorNFTs(address) {
    await web3.connect(store.state.wallet)
    const contract = this.getContract(address)

    const lastId = await contract.methods.lastNftItemId().call()
    const nfts = []

    for (let i = 0; i < lastId; i++) {
      nfts.push(await contract.methods.nfts(i + 1).call())
    }

    return nfts
  },

  async getNFTItem(address, itemId) {
    await web3.connect(store.state.wallet)
    const contract = this.getContract(address)

    return await contract.methods.nfts(itemId).call()
  },

  async getNftsCount(address) {
    await web3.connect(store.state.wallet)
    const contract = this.getContract(address)

    return await contract.methods.lastNftItemId().call()
  },

  async mintNaffyNFT(creatorAddress, tokenUri) {
    const account = await web3.connect(store.state.wallet)
    const contract = this.getContract(creatorAddress)

    return await contract.methods.mintNFT(process.env.VUE_APP_NAFFY_NFT_CONTRACT_ADDRESS, tokenUri).send({ from: account })
  },

  async getCreatorByCurrentAccount() {
    const account = await web3.connect(store.state.wallet)
    return await this.getCreatorByOwnerAddress(account)
  },

  async getCreatorByOwnerAddress(address) {
    const naffy = store.state.naffy
    return await naffy.methods.ownerToCreator(address).call()
  },

  async getNFTItemId(creatorAddress, tokenId, nftAddress) {
    await web3.connect(store.state.wallet)
    const contract = this.getContract(creatorAddress)

    return await contract.methods.getNFTItemId(tokenId, nftAddress).call()
  },

  async listNFT(creatorAddress, tokenId, nftAddress, price) {
    const account = await web3.connect(store.state.wallet)
    const contract = this.getContract(creatorAddress)

    await contract.methods.listNFT(tokenId, nftAddress, Web3.utils.toWei(price)).send({ from: account })
  },

  async unListNFT(creatorAddress, tokenId, nftAddress) {
    const account = await web3.connect(store.state.wallet)
    const contract = this.getContract(creatorAddress)

    await contract.methods.unListNFT(tokenId, nftAddress).send({ from: account })
  },

  async buyNFT(creatorAddress, tokenId, nftAddress, amount) {
    const account = await web3.connect(store.state.wallet)
    const contract = this.getContract(creatorAddress)

    await contract.methods.buyNFTItem(tokenId, nftAddress).send({ from: account, value: amount })
  },

  async withdrawToken(creatorAddress, amount, token) {
    const account = await web3.connect(store.state.wallet)
    const contract = this.getContract(creatorAddress)
    token = token === "CELO" ? 0 : token === "cUSD" ? 1 : 2

    await contract.methods.withdrawToken(Web3.utils.toWei(amount), token).send({ from: account })
  },

  async transferNFTItem(creatorAddress, tokenId, nftAddress, recipient) {
    const account = await web3.connect(store.state.wallet)
    const contract = this.getContract(creatorAddress)

    await contract.methods.transferNFTItem(tokenId, nftAddress, recipient).send({ from: account })
  },
}

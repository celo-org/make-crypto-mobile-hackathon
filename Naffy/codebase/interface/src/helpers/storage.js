import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"
import { NFTStorage } from "nft.storage"

export const storage = {
  getClient(type = "web3") {
    if (type === "web3") {
      return new Web3Storage({ token: process.env.VUE_APP_WEB3_STORAGE_API_KEY })
    } else if (type === "nft") {
      return new NFTStorage({ token: process.env.VUE_APP_NFT_STORAGE_API_KEY })
    }
  },

  async upload(client, data) {
    if (client instanceof Web3Storage) {
      return await client.put(data)
    } else if (client instanceof NFTStorage) {
      return await client.store(data)
    }
  },
}

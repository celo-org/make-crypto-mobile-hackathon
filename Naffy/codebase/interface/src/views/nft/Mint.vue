<template>
  <section class="container">
    <div class="row">
      <h5 class="fw-bold mb-3">Mint NFT</h5>

      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" v-model="input.name" placeholder="Name of NFT" />
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea class="form-control" v-model="input.description" placeholder="NFT Description"></textarea>
        </div>

        <div class="mb-3">
          <label for="image" class="form-label">NFT File</label>
          <input class="form-control" type="file" id="image" @change="handleFileChange($event)" />
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-info" @click="mintNFT">Mint</button>
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <img :src="fileObjUrl" alt="" :class="fileObjUrl ? 'img-thumbnail d-block' : 'd-none'" style="width: 100%;" />
      </div>
    </div>
  </section>
</template>

<script>
import { web3 } from "@/helpers/web3"
import { creator } from "@/helpers/creator"
import { storage } from "@/helpers/storage"

const nftStorage = storage.getClient("nft")

export default {
  data() {
    return {
      input: {
        name: "",
        description: "",
      },
      address: "",
      file: null,
      fileObjUrl: null,
    }
  },

  methods: {
    async mintNFT() {
      await web3.connect()
      this.address = await creator.getCreatorByCurrentAccount()

      console.log(this.address)
      const metadata = await nftStorage.store({
        name: this.input.name,
        description: this.input.description,
        image: this.file,
      })

      await creator.mintNaffyNFT(this.address, metadata.url)
    },

    handleFileChange(e) {
      this.file = e.target.files[0]
      this.fileObjUrl = URL.createObjectURL(e.target.files[0])
    },
  },
}
</script>

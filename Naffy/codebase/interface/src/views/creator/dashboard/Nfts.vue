<template>
  <section class="container">
    <div class="row">
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">NFT Dashboard</h5>
      </div>

      <div class="">
        <Loader v-if="loading" />
        <div v-else>
          <Empty v-if="nfts.count == 0" msg="No NFTs yet" />

          <div v-for="nft in nfts.data" :key="nft.tokenId" class="col-md-3">
            <div class="card">
              <div class="card-body">
                <img :src="utils.parseNFTURL(nft.metadata.image)" width="100%" :alt="nft.metadata.name" class="img-thumbnail" />
                <div class=" justify-content-between clearfix mt-3">
                  <h5 class="fw-bold d-inline float-start">{{ nft.metadata.name }}</h5>
                  <h5 class="d-inline float-end">
                    <span :class="nft.isForSale ? 'badge bg-success' : 'badge bg-info'">{{ nft.isForSale ? utils.fromWei(nft.price) + " CELO" : "Not for sale" }}</span>
                  </h5>
                </div>
                <a :href="'/#/nft/' + nft.contractAddress + '/' + nft.tokenId + '?c=' + address" class="text-decoration-none color-link">view Item</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/Loader.vue"
import { creator } from "@/helpers/creator"
import { utils } from "@/helpers/utils"
import { common } from "@/config/common"
import { web3 } from "@/helpers/web3"
import axios from "axios"

export default {
  components: {
    Loader,
  },

  data() {
    return {
      utils,
      common,
      explorerUrl: process.env.VUE_APP_EXPLORER_URL,
      loading: false,
      address: "",
      nfts: { data: [] },
    }
  },

  async mounted() {
    this.loading = true

    if (this.$route.params.address) {
      this.address = this.$route.params.address
    } else {
      this.address = await creator.getCreatorByCurrentAccount()
    }

    if (this.address == "0x0000000000000000000000000000000000000000") {
      window.location.href = `/#/creator/new`
    }

    const nfts = await creator.getCreatorNFTs(this.address)

    for (let i = 0; i < nfts.length; i++) {
      const nft = nfts[i]

      const contract = web3.getNFTContract(nft.contractAddress)
      nft.metadata = (await axios.get(this.utils.parseNFTURL(await contract.methods.tokenURI(nft.tokenId).call()))).data
    }

    this.nfts = {
      data: nfts,
      count: nfts.length,
    }

    this.loading = false
  },
}
</script>

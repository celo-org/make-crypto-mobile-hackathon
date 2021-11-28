<template>
  <section>
    <Loader v-if="loading" />
    <section v-else class="row">
      <div class="col-md-4 mb-3">
        <h3 class="fw-bold mb-3">{{ nft.name }}</h3>
        <img :src="utils.parseNFTURL(nft.image)" style="width: 100%;" alt="" class="img-thumbnail" />

        <p class="mt-3">{{ nft.description }}</p>
      </div>
      <div class="col-md-8">
        <div class="mb-3">
          <div class="" v-if="nft.owner == currentCreatorAddress">
            <button v-if="nft.isForSale" @click="unListNFT" class="btn btn-info"><i class="mdi mdi-close"></i> Unlist Item</button>
            <button data-bs-toggle="modal" data-bs-target="#nftListModal" v-else class="btn btn-info"><i class="mdi mdi-sale"></i> List Item</button>
            <button class="btn btn-info ms-3" data-bs-toggle="modal" data-bs-target="#nftTransferModal"><i class="mdi mdi-transfer"></i> Transfer Item</button>
          </div>

          <div class="" v-if="nft.owner != currentCreatorAddress">
            <button v-if="nft.isForSale" @click="buyNFT" class="btn btn-info"><i class="mdi mdi-sale"></i> Buy Item</button>
          </div>
        </div>

        <div class="mb-3">
          <div class="card">
            <div class="card-header">
              <h5 class="fw-bold">Attributes</h5>
            </div>
            <div class="card-body">
              <p class="d-flex justify-content-between border-bottom pb-1 mb-2" v-for="attribute in nft.attributes || []" :key="attribute.value">
                <span>{{ attribute.trait_type }}</span
                ><span>{{ attribute.value }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <div class="card">
            <div class="card-header">
              <h5 class="fw-bold">Other Information</h5>
            </div>
            <div class="card-body">
              <p class="d-flex justify-content-between border-bottom pb-1 mb-2">
                <span>Contract address</span>
                <span>
                  <a :href="explorerUrl + '/address/' + contractAddress" target="_blank" class="text-decoration-none color-link">{{ utils.shortenAddress(contractAddress) }}</a>
                </span>
              </p>
              <p class="d-flex justify-content-between border-bottom pb-1 mb-2">
                <span>Token ID</span><span>{{ this.tokenId }}</span>
              </p>
              <p class="d-flex justify-content-between border-bottom pb-1 mb-2">
                <span>Owner</span>
                <span>
                  <a :href="explorerUrl + '/address/' + nft.owner" target="_blank" class="text-decoration-none color-link">{{ utils.shortenAddress(nft.owner) }}</a>
                </span>
              </p>
              <p class="d-flex justify-content-between border-bottom pb-1 mb-2">
                <span>Price</span><span>{{ utils.fromWei(nft.price || 0) }} CELO</span>
              </p>
              <p v-if="nft.external_url" class="d-flex justify-content-between border-bottom pb-1 mb-2">
                <span>External URL</span>
                <span>
                  <a :href="nft.external_url" class="text-decoration-none color-link">{{ nft.external_url }}</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- List with NFT Modal -->
    <div class="modal fade" id="nftListModal" tabindex="-1" aria-labelledby="nftListModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="nftListModalLabel">List {{ nft.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Price (CELO)</label>
              <input type="number" class="form-control" v-model="input.sell.price" placeholder="Enter price" />
            </div>

            <div class="d-grid">
              <button type="button" :disabled="input.sell.loading" class="btn btn-info" @click="listNFT">List NFT</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transfer NFT Modal -->
    <div class="modal fade" id="nftTransferModal" tabindex="-1" aria-labelledby="nftTransferModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="nftTransferModalLabel">Transfer {{ nft.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Recipient Address</label>
              <input type="text" class="form-control" v-model="input.transfer.to" placeholder="Enter recipient" />
            </div>

            <div class="d-grid">
              <button type="button" :disabled="input.transfer.loading" class="btn btn-info" @click="transferNFTItem">Transfer NFT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/Loader.vue"
import { web3 } from "@/helpers/web3"
import { utils } from "@/helpers/utils"
import axios from "axios"
import { creator } from "@/helpers/creator"
import { common } from "@/config/common"

export default {
  components: {
    Loader,
  },

  data() {
    return {
      utils,
      explorerUrl: process.env.VUE_APP_EXPLORER_URL,
      loading: false,
      nftCreatorAddress: "",
      currentCreatorAddress: "",
      contractAddress: "",
      tokenId: "",
      image: "",
      nft: {},
      input: {
        sell: { price: 0, loading: false },
        transfer: { to: "", loading: false },
      },
    }
  },

  async mounted() {
    this.loading = true
    this.contractAddress = this.$route.params.contractAddress
    this.tokenId = this.$route.params.tokenId
    this.currentCreatorAddress = await creator.getCreatorByCurrentAccount()

    const contract = web3.getNFTContract(this.contractAddress)
    const tokenUri = await contract.methods.tokenURI(this.tokenId).call()
    const tokenOwner = await contract.methods.ownerOf(this.tokenId).call()

    let itemId = {},
      nftItem = {}

    if (this.$route.query.c) {
      this.nftCreatorAddress = this.$route.query.c
      itemId = await creator.getNFTItemId(this.nftCreatorAddress, this.tokenId, this.contractAddress)
      nftItem = await creator.getNFTItem(this.nftCreatorAddress, itemId)
    } else {
      this.nftCreatorAddress = common.zeroAddress
    }

    const metadata = (await axios.get(this.utils.parseNFTURL(tokenUri))).data
    this.nft = { ...this.nft, ...metadata, ...nftItem, owner: tokenOwner, loading: false }

    this.loading = false
  },

  methods: {
    async listNFT() {
      try {
        this.input.sell.loading = true
        await creator.listNFT(this.nftCreatorAddress, this.tokenId, this.contractAddress, this.input.sell.price)
        this.input.sell.loading = false
        window.location.reload()
      } catch (err) {
        this.input.sell.loading = false
        this.$toastr.e(err.message)
      }
    },

    async unListNFT() {
      try {
        await creator.unListNFT(this.nftCreatorAddress, this.tokenId, this.contractAddress)
        window.location.reload()
      } catch (err) {
        this.$toastr.e(err.message)
      }
    },

    async buyNFT() {
      try {
        await creator.buyNFT(this.nftCreatorAddress, this.tokenId, this.contractAddress, this.nft.price)
        window.location.reload()
      } catch (err) {
        this.$toastr.e(err.message)
      }
    },

    async transferNFTItem() {
      try {
        this.input.transfer.loading = true
        await creator.transferNFTItem(this.nftCreatorAddress, this.tokenId, this.contractAddress, this.input.transfer.to)
        this.input.transfer.loading = false

        window.location.reload()
      } catch (err) {
        this.input.transfer.loading = false
        this.$toastr.e(err.message)
      }
    },
  },
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgba(167, 164, 164, 0.5) !important;
}
</style>

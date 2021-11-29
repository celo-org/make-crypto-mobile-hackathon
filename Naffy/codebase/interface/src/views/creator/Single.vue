<template>
  <section>
    <div class="row">
      <Loader v-if="creator.profile.loading" />
      <div v-else class="col-md-4 mb-3">
        <img :src="'https://ipfs.infura.io/ipfs/' + creator.profile.image" :alt="creator.profile.name" class="img-thumbnail img-profile" />
        <div class="d-flex justify-content-start mt-3">
          <h5 class="fs-5 me-3">{{ creator.profile.name }}</h5>
          <button v-clipboard:copy="creatorLink" v-clipboard:success="onCopy" v-clipboard:error="onError" class="btn">
            <span class=" text-light mdi mdi-content-copy"></span>
          </button>
        </div>
        <div class="mb-3">{{ creator.profile.description }}</div>
        <div class="d-flex justify-content-start">
          <button data-bs-toggle="modal" data-bs-target="#tokenSupportModal" class="btn btn-sm btn-info me-3"><i class="mdi mdi-cash"></i> Token support</button>
          <button data-bs-toggle="modal" data-bs-target="#nftSupportModal" class="btn btn-sm btn-info"><i class="mdi mdi-file"></i> NFT support</button>
        </div>
      </div>

      <div class="col-md-8">
        <!-- Balances -->
        <h5 class="fw-bold">Balances</h5>
        <div class="row">
          <div v-for="token in common.supportTokens" :key="token" class="col-md-4 mb-0">
            <div class="card mb-3">
              <div class="card-body">
                <Loader v-if="creator.balances.loading" />
                <div v-else class="">
                  <h5 class="fw-light">{{ token }}</h5>

                  <div class="d-flex justify-content-between" style="height: 50px;">
                    <h3 class="fw-bold fs-1">{{ creator.balances[token] }}</h3>
                    <img :src="'/assets/images/' + token.toLowerCase() + '-token.svg'" :alt="token" class="rounded" width="50px" height="50px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activities -->
        <div class="card" style="height: 350px; width: 100%;">
          <div class="card-header d-flex justify-content-between">
            <h5 class="fw-bold">Activities</h5>
            <a :href="'/#/creator/' + address + '/activities'" class="color-link text-decoration-none">View all</a>
          </div>
          <div class="card-body">
            <Loader v-if="creator.activities.loading" />
            <div v-else>
              <Empty v-if="creator.activities.data.length < 1" msg="No activities yet" />
              <table v-else class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Actor</th>
                    <th scope="col">Action</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="activity in creator.activities.data" :key="activity.id">
                    <td>
                      <a :href="explorerUrl + '/address/' + activity.actor" target="_blank" class="color-link text-decoration-none">{{ utils.shortenAddress(activity.actor) }}</a>
                    </td>
                    <td>{{ common.activities[activity.action] }}</td>
                    <td>{{ utils.fromWei(activity.value) }}</td>
                    <td>{{ common.allTokens[activity.token] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="row my-3">
          <div class="d-flex justify-content-between mb-3">
            <span class="fw-bold fs-5">NFTs</span>
            <a :href="'/#/creator/' + address + '/nfts'" class="text-decoration-none color-link"><i class="mdi mdi-all"></i> see all</a>
          </div>

          <Loader v-if="creator.nfts.loading" />
          <div v-else>
            <Empty v-if="creator.nfts.count == 0" msg="No NFTs yet" />
            <div v-else v-for="nft in creator.nfts.data" :key="nft.tokenId" class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <img :src="nft.metadata.image" width="100%" :alt="nft.metadata.name" class="img-thumbnail" />
                  <div class=" justify-content-between clearfix mt-3">
                    <h5 class="fw-bold d-inline float-start">{{ nft.metadata.name }}</h5>
                    <h5 class="d-inline float-end">
                      <span :class="nft.isForSale ? 'badge bg-success' : 'badge bg-info'">{{ nft.isForSale ? "For sale" : "Not for sale" }}</span>
                    </h5>
                  </div>
                  <a :href="'/#/nft/' + nft.contractAddress + '/' + nft.tokenId + '?c=' + address" class="text-decoration-none color-link">view Item</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Support with Token Modal -->
    <div class="modal fade" id="tokenSupportModal" tabindex="-1" aria-labelledby="tokenSupportModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tokenSupportModalLabel">{{ creator.profile.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <p class="form-label">Select Token</p>
              <label v-for="token in common.supportTokens" :key="token">
                <h5 class="fw-bold">{{ token }}</h5>
                <input type="radio" name="test" :value="token" v-model="input.token.token" />
                <img :src="'/assets/images/' + token.toLowerCase() + '-token-square.svg'" />
                &nbsp; &nbsp;
              </label>
            </div>

            <div class="mb-3">
              <label class="form-label">Amount</label>
              <input type="number" class="form-control" v-model="input.token.amount" placeholder="Amount to support..." id="" />
            </div>

            <div class="d-grid">
              <button type="submit" :disabled="input.token.loading" class="btn btn-info" @click="supportWithToken">Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Support with NFT Modal -->
    <div class="modal fade" id="nftSupportModal" tabindex="-1" aria-labelledby="nftSupportModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="nftSupportModalLabel">{{ creator.profile.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">NFT contract address</label>
              <input type="text" class="form-control" v-model="input.nft.address" placeholder="NFT contract address" />
            </div>

            <div class="mb-3">
              <label class="form-label">Token ID</label>
              <input type="number" class="form-control" v-model="input.nft.tokenId" placeholder="Token ID" />
            </div>

            <div class="d-grid">
              <button type="submit" :disabled="input.nft.loading" class="btn btn-info" @click="supportWithNFT">Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/Loader.vue"
import Empty from "@/components/Empty.vue"
import { api } from "@/helpers/api"
import { creator } from "@/helpers/creator"
import { utils } from "@/helpers/utils"
import { common } from "@/config/common"
import { web3 } from "@/helpers/web3"
import axios from "axios"

export default {
  components: {
    Loader,
    Empty,
  },

  data() {
    return {
      utils,
      common,
      explorerUrl: process.env.VUE_APP_EXPLORER_URL,
      loading: false,
      address: this.$route.params.address,
      creatorLink: "",
      input: {
        token: {
          token: "",
          amount: 0,
          loading: false,
        },
        nft: {
          address: "",
          tokenId: 0,
          loading: false,
        },
      },
      creator: {
        profile: {
          loading: false,
        },
        balances: {
          loading: false,
        },
        activities: {
          loading: false,
          data: [],
        },
        nfts: {
          loading: false,
          data: [],
        },
      },
    }
  },

  async mounted() {
    this.loading = true
    this.creator.profile.loading = true
    this.creator.balances.loading = true
    this.creator.activities.loading = true

    this.creatorLink = `${process.env.VUE_APP_CLIENT_URL}/#/creator/${this.address}`

    const apiData = await api.getCreator({ address: this.address })
    this.creator.profile = { ...apiData.data, loading: false }

    const contractData = await creator.getCreatorDetails(this.address)
    this.creator.balances = {
      CELO: utils.fromWei(contractData[2]),
      cUSD: utils.fromWei(contractData[3]),
      cEUR: utils.fromWei(contractData[4]),
      loading: false,
    }

    const activities = await creator.getActivities(this.address)
    this.creator.activities = {
      data: activities.reverse().slice(0, 5),
      loading: false,
    }

    const nfts = await creator.getCreatorNFTs(this.address)

    for (let i = 0; i < nfts.length; i++) {
      const nft = nfts[i]

      const contract = web3.getNFTContract(nft.contractAddress)
      nft.metadata = (await axios.get(await contract.methods.tokenURI(nft.tokenId).call())).data
    }

    this.creator.nfts = {
      data: nfts,
      count: nfts.length,
      laoding: false,
    }

    this.loading = false
  },

  methods: {
    async supportWithToken() {
      try {
        this.input.token.loading = true
        const token = this.input.token.token
        const amount = this.input.token.amount

        if (token === "CELO" || token === "cUSD" || token === "cEUR") {
          await creator.supportWithToken(this.address, token, amount)
          this.input.token.loading = false
          window.location.reload()
        } else {
          this.$toastr.e("Please select a token")
          this.input.token.loading = false
        }
      } catch (err) {
        this.input.token.loading = false
        this.$toastr.e(err.message)
      }
    },

    async supportWithNFT() {
      try {
        this.input.nft.loading = true

        const tokenId = this.input.nft.tokenId
        const nftAddress = this.input.nft.address

        await creator.supportWithNFT(this.address, tokenId, nftAddress)
        this.input.nft.loading = false
        window.location.reload()
      } catch (err) {
        this.input.nft.loading = false
        this.$toastr.e(err.message)
      }
    },

    onCopy() {
      this.$toastr.s("Creator's link has been copied")
    },

    onError() {
      this.$toastr.e("Failed to copy creator's link")
    },
  },
}
</script>

<style scoped>
.img-profile {
  width: 150px;
  height: 150px;
}

[type="radio"] {
  display: none;
}

[type="radio"] + img {
  cursor: pointer;
  width: 80px;
  height: 80px;
}

[type="radio"]:checked + img {
  outline: 3px solid rgb(13, 202, 240);
}
</style>

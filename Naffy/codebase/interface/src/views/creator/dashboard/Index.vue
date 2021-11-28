<template>
  <section class="container">
    <div class="d-flex justify-content-between mb-3">
      <span class="fw-bold fs-5">Dashboard</span>
      <a href="/#/creator/profile" class="text-decoration-none text-light fs-4"><i class="mdi mdi-account-edit"></i></a>
    </div>

    <div class="row mb-3">
      <div v-for="token in common.supportTokens" :key="token" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="text-uppercase mb-3">{{ token }} Balance</h5>
              <a style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#tokenWithdrawModal" class="color-link text-decoration-none">Withdraw</a>
            </div>
            <div class="d-flex justify-content-between" style="height: 50px;">
              <h3 class="fw-bold fs-1">{{ balances[token] }}</h3>
              <img :src="'/assets/images/' + token.toLowerCase() + '-token.svg'" :alt="token" class="rounded" width="50px" height="50px" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="text-uppercase">Total Activities</h5>
              <a href="/#/creator/dashboard/activities" class="color-link text-decoration-none">Details</a>
            </div>
            <h3 class="display-5 fw-bold">{{ activities.count }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="text-uppercase">Total Supporters</h5>
              <a href="/#/creator/dashboard/supporters" class="color-link text-decoration-none">Details</a>
            </div>
            <h3 class="display-5 fw-bold">{{ supporters.count }}</h3>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="text-uppercase">Total NFTs</h5>
              <a href="/#/creator/dashboard/nfts" class="color-link text-decoration-none">Details</a>
            </div>
            <h3 class="display-5 fw-bold">{{ nfts.count }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-8 mb-3">
        <div class="card" style="height: 350px;">
          <div class="card-header d-flex justify-content-between">
            <h5 class="fw-bold">Activities</h5>
            <a href="/#/creator/dashboard/activities" class="color-link text-decoration-none">View all</a>
          </div>
          <div class="card-body">
            <Loader v-if="activities.loading" />
            <div v-else>
              <Empty v-if="activities.count == 0" msg="No activities yet" />
              <table v-else class="table table-dark table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Actor</th>
                    <th scope="col">Action</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="activity in activities.data" :key="activity.id">
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
      </div>

      <div class="col-md-4">
        <div class="card" style="height: 350px; width: 100%;">
          <div class="card-header d-flex justify-content-between">
            <h5 class="fw-bold">Supporters</h5>
            <a href="/#/creator/dashboard/supporters" class="color-link text-decoration-none">View all</a>
          </div>
          <div class="card-body">
            <Loader v-if="supporters.loading" />
            <div v-else>
              <Empty v-if="supporters.count == 0" msg="No supporters yet" />
              <p v-else v-for="supporter in supporters.data" :key="supporter" class="border-bottom pb-1 mb-2">
                <a href="/#/" class="text-decoration-none color-link">{{ supporter }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-3">
      <div class="d-flex justify-content-between mb-3">
        <span class="fw-bold fs-5">NFTs</span>
        <a href="/#/creator/dashboard/nfts" class="text-decoration-none color-link"><i class="mdi mdi-all"></i> see all</a>
      </div>
      <div class="col-12">
        <Loader v-if="nfts.loading" />
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

    <!-- Withdraw with NFT Modal -->
    <div class="modal fade" id="tokenWithdrawModal" tabindex="-1" aria-labelledby="tokenWithdrawModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tokenWithdrawModalLabel">Withdraw Token</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <p class="form-label">Select Token</p>
              <label v-for="token in common.supportTokens" :key="token">
                <h5 class="fw-bold">{{ token }}</h5>
                <input type="radio" :value="token" v-model="input.withdraw.token" />
                <img :src="'/assets/images/' + token.toLowerCase() + '-token-square.svg'" />
                &nbsp; &nbsp;
              </label>
            </div>

            <div class="mb-3">
              <label class="form-label">Amount</label>
              <input type="number" class="form-control" v-model="input.withdraw.amount" placeholder="Enter amount..." />
            </div>

            <div class="d-grid">
              <button type="submit" :disabled="input.withdraw.loading" class="btn btn-info" @click="withdrawToken">Support</button>
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
import { web3 } from "@/helpers/web3"
import { api } from "@/helpers/api"
import { creator } from "@/helpers/creator"
import { utils } from "@/helpers/utils"
import { common } from "@/config/common"
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
      address: "",
      balances: {
        loading: false,
      },
      profile: {
        loading: false,
      },
      activities: {
        loading: false,
        count: 0,
        data: [],
      },
      supporters: {
        loading: false,
        count: 0,
        data: [],
      },
      nfts: {
        loading: false,
        count: 0,
        data: [],
      },
      input: {
        withdraw: {
          amount: 0,
          token: "",
          loading: false,
        },
      },
    }
  },

  async mounted() {
    this.loading = true
    this.balances.loading = true
    this.activities.loading = true
    this.profile.loading = true
    this.supporters.loading = true
    this.nfts.loading = true

    const existingCreatorAddress = await creator.getCreatorByCurrentAccount()
    if (existingCreatorAddress == "0x0000000000000000000000000000000000000000") {
      return (window.location.href = `/#/creator/new`)
    }

    const account = await web3.connect()
    this.address = await creator.getCreatorByCurrentAccount()

    const apiData = await api.getCreator({ owner: account })
    this.profile = { ...apiData.data, loading: false }

    const contractData = await creator.getCreatorDetails(this.address)
    this.balances = {
      CELO: utils.fromWei(contractData[2]),
      cUSD: utils.fromWei(contractData[3]),
      cEUR: utils.fromWei(contractData[4]),
      loading: false,
    }

    const activities = await creator.getActivities(this.address)
    this.activities = {
      data: activities.reverse().slice(0, 5),
      count: activities.length,
      loading: false,
    }

    const supporters = await creator.getSupporters(this.address)
    this.supporters = {
      data: supporters,
      count: supporters.length,
      loading: false,
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
      laoding: false,
    }

    this.loading = false
  },

  methods: {
    async withdrawToken() {
      try {
        this.input.withdraw.loading = true

        const token = this.input.withdraw.token
        const amount = this.input.withdraw.amount

        await creator.withdrawToken(this.address, amount, token)
      } catch (err) {
        this.$toastr.e(err.message)
      }
    },
  },
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgba(145, 145, 148, 0.2) !important;
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

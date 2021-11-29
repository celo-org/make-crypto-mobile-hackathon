<template>
  <div>
    <nav class="navbar navbar-expand-lg shadow-sm mb-3">
      <div class="container">
        <a class="navbar-brand text-uppercase display-2 fw-bold" href="#/">{{ name }}</a>
        <a class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#topbar" aria-controls="topbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="mdi mdi-menu"></span>
        </a>
        <div class="collapse navbar-collapse" id="topbar">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#/creator/dashboard">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/explore">Explore</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-for="category in categories" :key="category.slug">
                  <a class="dropdown-item cursor-pointer" @click="goExplore(category.slug)">{{ category.title }}</a>
                </li>
              </ul>
            </li>
            <li v-if="!wallet" class="nav-item">
              <a class="nav-link btn bg-main btn-sm" data-bs-toggle="modal" data-bs-target="#connectModal" href="#/about">Connect wallet</a>
            </li>
            <li v-else class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ address }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/#/creator/profile">Profile</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Modal -->
    <div class="modal fade" id="connectModal" tabindex="-1" aria-labelledby="connectModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="connectModalLabel">Connect wallet</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <div class="row">
              <div v-for="connect in connects" :key="connect.name" class="col-6 cursor-pointer" @click="connectWallet(connect.name)">
                <img :src="connect.image" :alt="connect.name" class="d-block mx-auto" />
                <p class="mt-3 fw-bold">{{ connect.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-toggler {
  font-size: 25px;
  cursor: pointer;
}

img {
  height: 70px;
  width: 70px;
}
</style>

<script>
import { utils } from "@/helpers/utils"
import { web3 } from "@/helpers/web3"
import { common } from "@/config/common"

export default {
  props: {
    name: String,
  },

  data() {
    return {
      wallet: this.$store.state.wallet && this.$store.state.wallet !== "null",
      account: this.$store.state.account,
      connects: common.walletConnectable,
      categories: common.creatorCategories,
    }
  },

  computed: {
    address() {
      return utils.shortenAddress(this.account)
    },
  },

  methods: {
    async connectWallet(wallet) {
      const account = await web3.connect(wallet)
      if (account) {
        return window.location.reload()
      }
    },

    goExplore(category) {
      if (new URL(window.location.href).hash.startsWith("#/explore")) {
        this.$router.push({ path: "/explore", query: { category } })
        window.location.reload()
      } else {
        this.$router.push({ path: "/explore", query: { category } })
      }
    },
  },
}
</script>

<style scoped>
.nav-link {
  /* font-weight: bold !important; */
  color: #e5ecf3 !important;
}
</style>

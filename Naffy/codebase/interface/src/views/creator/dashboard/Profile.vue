<template>
  <section class="container">
    <Loader v-if="loading" />
    <div v-else class="row">
      <div class="col-md-6 mx-auto">
        <h4 class="fw-bold text-center">{{ profile.data.name }}</h4>

        <div class="mb-3">
          <label for="name" class="form-label">Creator name</label>
          <input type="text" class="form-control" v-model="profile.data.name" id="name" />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" v-model="profile.data.description" id="description"></textarea>
        </div>

        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select class="form-select" v-model="profile.data.category" id="category">
            <option selected>Select a category</option>
            <option v-for="category in common.creatorCategories" :key="category.slug" :value="category.slug">{{ category.title }}</option>
          </select>
        </div>

        <!-- <div v-for="social in common.s
          <label for="name" class="form-label">{{ social }} account handle or link</label>
          <input type="text" class="form-control" v-model="profile.data[social.toLowerCase()]" id="name" required />
        </div> -->

        <div class="mb-3">
          <label for="image" class="form-label">Profile image</label>
          <input class="form-control" type="file" id="image" @change="handleFileChange($event)" required />
        </div>

        <div class="d-grid">
          <button type="button" :disabled="profile.loading" class="btn btn-info mt-3" @click="updateProfile">Submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/Loader.vue"
import { web3 } from "@/helpers/web3"
import { api } from "@/helpers/api"
import { creator } from "@/helpers/creator"
import { utils } from "@/helpers/utils"
import { storage } from "@/helpers/storage"
import { common } from "@/config/common"

const web3Storage = storage.getClient("web3")

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
      profile: {
        data: {},
        loading: false,
      },
      file: {},
    }
  },

  async mounted() {
    this.loading = true

    const existingCreatorAddress = await creator.getCreatorByCurrentAccount()
    if (existingCreatorAddress == "0x0000000000000000000000000000000000000000") {
      return (window.location.href = `/#/creator/new`)
    }

    const account = await web3.connect()
    this.address = await creator.getCreatorByCurrentAccount()

    const apiData = await api.getCreator({ owner: account })
    this.profile = { data: apiData.data }

    this.loading = false
  },

  methods: {
    async handleFileChange(e) {
      this.file = e.target.files[0]
    },

    async updateProfile() {
      try {
        this.profile.loading = true

        if (this.file.name) {
          const fileName = this.file.name
          const cid = await storage.upload(web3Storage, [this.file])
          this.profile.data.image = `${cid}/${fileName}`
        }

        await api.updateCreatorProfile(this.profile.data._id, this.profile.data)

        this.profile.loading = false
        window.location.reload()
      } catch (err) {
        this.profile.loading = false
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

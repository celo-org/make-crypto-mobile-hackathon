<template>
  <section>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <h4 class="fw-bold text-center">New Creator Account</h4>

        <div class="mb-3">
          <label for="name" class="form-label">Creator name</label>
          <input type="text" class="form-control" v-model="input.name" id="name" required />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea type="te" class="form-control" v-model="input.description" id="description" required></textarea>
        </div>

        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select class="form-select" v-model="input.category" id="category" required>
            <option selected>Select a category</option>
            <option v-for="category in categories" :key="category.slug" :value="category.slug">{{ category.title }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="image" class="form-label">Profile image</label>
          <input class="form-control" type="file" id="image" @change="handleFileChange($event)" required />
        </div>

        <div class="d-grid">
          <button type="submit" :disabled="loading" class="btn btn-info mt-3" @click="newCreator">Submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { creator } from "@/helpers/creator"
import { storage } from "@/helpers/storage"
import { common } from "@/config/common"

const web3Storage = storage.getClient("web3")

export default {
  data() {
    return {
      input: {
        name: "",
        description: "",
        category: "",
        image: "",
      },
      loading: false,
      file: {},
      categories: common.creatorCategories,
    }
  },

  async mounted() {
    const existingCreatorAddress = await creator.getCreatorByCurrentAccount()
    if (existingCreatorAddress !== "0x0000000000000000000000000000000000000000") {
      window.location.href = `/#/creator/dashboard`
    }
  },

  methods: {
    async newCreator() {
      try {
        this.loading = true

        const fileName = this.file.name
        const cid = await storage.upload(web3Storage, [this.file])
        this.input.image = `${cid}/${fileName}`

        await creator.newCreator(this.input)

        this.loading = false
      } catch (err) {
        this.loading = false
        this.$toastr.e(err.message)
      }
    },

    handleFileChange(e) {
      this.file = e.target.files[0]
    },
  },
}
</script>

<style scoped></style>

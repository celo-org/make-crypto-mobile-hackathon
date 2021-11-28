<template>
  <section>
    <div class="d-flex flex-column flex-md-row justify-content-between mb-3">
      <h5 class="fw-bold mb-3">Explore Creators</h5>
    </div>

    <Loader v-if="loading" />
    <div v-else>
      <div class="row">
        <Empty msg="No creators were found in this category" v-if="creators.length < 1" />
        <div v-else v-for="creator in creators" :key="creator.address" class="col-md-4 col-lg-3">
          <div class="card mb-3">
            <img :src="'https://ipfs.infura.io/ipfs/' + creator.image" class="card-img-top" :alt="creator.name" style="height: 250px" />
            <div class="card-body">
              <h5 class="card-title mb-3">{{ creator.name }}</h5>
              <a :href="'/#/creator/' + creator.address" class="text-decoration-none color-link small">view creator <i class="mdi mdi-arrow-right"></i> </a>
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

export default {
  components: {
    Loader,
    Empty,
  },
  data() {
    return {
      loading: false,
      input: {
        filter: "",
      },
      creators: [],
    }
  },

  async mounted() {
    this.loading = true
    let creators

    if (this.$route.query.category) {
      creators = await api.getCreators({ category: this.$route.query.category })
    } else {
      creators = await api.getCreators()
    }
    this.creators = creators.data

    this.loading = false
  },
}
</script>

<style scoped>
.cta {
  color: rgb(118, 149, 221) !important;
}

.small {
  font-size: 12px;
}
</style>

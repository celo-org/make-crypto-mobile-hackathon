<template>
  <section>
    <div class="row">
      <div class="col-md-8 mx-auto">
        <h4 class="fw-bold">{{ $route.params.pathMatch.substr(0, 1).toUpperCase() + $route.params.pathMatch.substr(1) }}</h4>
        <div class="card">
          <div class="card-body">
            <div v-if="$route.params.pathMatch == 'activities'" class="">
              <Loader v-if="activities.loading" />
              <div v-else>
                <Empty v-if="activities.count == 0" msg="No activities yet" />
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
                    <tr v-for="activity in activities.data" :key="activity">
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

            <div v-else-if="$route.params.pathMatch == 'supporters'" class="">
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
    </div>
  </section>
</template>

<script>
import Loader from "@/components/Loader.vue"
import Empty from "@/components/Empty.vue"
import { creator } from "@/helpers/creator"
import { utils } from "@/helpers/utils"
import { common } from "@/config/common"

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
      activities: {
        data: [],
        count: 0,
        loading: false,
      },
      supporters: {
        data: [],
        count: 0,
        loading: false,
      },
    }
  },

  async mounted() {
    const path = this.$route.params.pathMatch

    if (this.$route.params.address) {
      this.address = this.$route.params.address
    } else {
      this.address = await creator.getCreatorByCurrentAccount()
    }
    if (this.address == "0x0000000000000000000000000000000000000000") {
      window.location.href = `/#/creator/new`
    }

    if (path === "activities") {
      this.activities.loading = true
      const activities = await creator.getActivities(this.address)
      this.activities = {
        data: activities,
        count: activities.length,
        loading: false,
      }
    } else if (path === "supporters") {
      const supporters = await creator.getSupporters(this.address)
      this.supporters = {
        data: supporters,
        count: supporters.length,
        loading: false,
      }
    }
  },
}
</script>

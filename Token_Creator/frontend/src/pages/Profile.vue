<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Your profile</h1>
    </div>

    <div class="row">
      <div class="col-md-5 text-center">
        <div class="card">
          <div class="card-body">
            <Gravatar
              v-if="getActiveAccount"
              class="img-fluid"
              :email="getActiveAccount"
              default-img="robohash"
              :size="200"
            />

            <p>{{ getActiveAccount }}</p>
            <p>
              <strong>Your ETH balance:</strong>
              {{ Number(getActiveBalanceEth).toFixed(4) }} ETH
            </p>
            <p>You are currently on network: {{ getNetwork }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Gravatar from "vue-gravatar";

export default {
  name: "Profile",
  components: {
    Gravatar,
  },
  computed: {
    ...mapGetters("accounts", [
      "getActiveAccount",
      "getActiveBalanceEth",
      "getNetwork",
    ]),
  },
};
</script>

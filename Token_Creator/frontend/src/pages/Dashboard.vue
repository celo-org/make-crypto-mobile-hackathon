<template>
  <div>
    <h1>
      Your Tokens
      <v-btn icon class="" to="/create-token">
        <v-icon>mdi-plus-circle-multiple</v-icon></v-btn
      >
    </h1>

    <v-divider class="py-4" />
    <v-container>
      <v-row>
        <v-col
          v-for="token in getTokens"
          :key="token.address"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <v-card hover>
            <v-card-title>
              <Gravatar
                v-if="getActiveAccount"
                class="img-fluid rounded-circle mr-2"
                :email="token.address"
                default-img="identicon"
                :size="24"
              />
              {{ token.symbol }}</v-card-title
            >
            <v-card-text>
              <p>
                {{ token.name }}
              </p>
              <p>
                <a
                  target="blank"
                  :href="
                    'https://alfajores-blockscout.celo-testnet.org/address/' +
                    token.address
                  "
                  >View Contract</a
                >
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-alert v-if="getError" color="red" type="error"
      >Please connect your wallet and choose Alfajores Testnet.</v-alert
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Gravatar from "vue-gravatar";

export default {
  name: "Main",
  components: { Gravatar },
  computed: {
    ...mapGetters("accounts", ["getActiveAccount", "getProviderEthers"]),
    ...mapGetters("tokenCreator", [
      "getTokens",
      "getError",
      "getTokenCreatorAbi",
      "getTokenCreatorAddress",
    ]),
  },
  data() {
    return {
      tokenCreator: null,
    };
  },
};
</script>

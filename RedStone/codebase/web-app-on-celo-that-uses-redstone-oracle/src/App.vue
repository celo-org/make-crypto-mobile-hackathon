<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
      flat
    >
      <a class="logo-link d-flex align-center" href="/#/">
        <v-img
          alt="Komodo Logo"
          class="shrink mr-2"
          contain
          src="komodo-icon.png"
          transition="scale-transition"
          width="40"
        />
        <h2>Komodo</h2>
      </a>

      <v-spacer></v-spacer>

      <div class="base-token-selector-container">
        <v-select
          label="Collateral token"
          class="base-token-selector"
          :items="baseTokens"
          v-model="baseToken"
          outlined
        >
        </v-select>
      </div>

      <a class="nav-link" href="/#/commodities">
        <span>
          All commodities
        </span>
        <v-icon
            right
            dark
          >
            mdi-finance
          </v-icon>
      </a>
    </v-app-bar>

    <v-main>
      <router-view :key="baseToken"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
import blockchain from '@/helpers/blockchain';

const checkEthereumNetwork = async () => {
  if (!window.web3 || !window.ethereum) {
    alert(
      "Please use web3-enabled browser. "
      + "If you use Google Chrome you can install Metamask extension.");
  }

  const requiredName = blockchain.getRequiredBlockchainNetworkName();
  const name = await blockchain.getNetworkName();
  if (name !== requiredName) {
    alert(`Please switch to ${requiredName} network`);
  }
};

export default Vue.extend({
  name: 'App',

  data: () => ({
    baseTokens: [
      'CELO',
      'cUSD',
    ],
  }),

  async mounted() {
    await checkEthereumNetwork();
    blockchain.onNetworkChange(() => {
      checkEthereumNetwork();
    });
  },

  computed: {
    baseToken: {
      get() {
        return this.$store.state.baseCurrency;
      },
      set(value) {
        this.$store.dispatch('setBaseCurrency', value);
      },
    }
  }

});
</script>

<style lang="scss">

* {
  font-family: "Poppins", "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.logo-link {
  text-decoration: none;
  h2 {
    color: white;
  }
}

.base-token-selector-container {
  width: 140px;
  .base-token-selector {
    transform: scale(0.65);
    // width: 10px;
    position: relative;
    top: 10px;
  }
}

a.nav-link {
  text-decoration: none;

  span {
    color: white;
  }

  &:hover {
    span {
      text-decoration: underline;
    }
  }
}

</style>

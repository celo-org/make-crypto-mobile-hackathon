<template>
  <div>
    <v-btn
      block
      class="nav-link"
      href="#"
      v-if="!isUserConnected"
      @click="connectWeb3Modal"
      >Connect your wallet</v-btn
    >
    <v-btn
      block
      class="nav-link"
      href="#"
      v-if="isUserConnected"
      @click="disconnectWeb3Modal"
      >Disconnect {{ getActiveAccount.substring(0, 7) }}...</v-btn
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "WalletButton",
  computed: {
    ...mapGetters("accounts", [
      "getActiveAccount",
      "isUserConnected",
      "getWeb3Modal",
    ]),
  },
  methods: {
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
  },
};
</script>

<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>TokenCreator</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      app
      :permanent="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
      v-model="drawer"
    >
      <template v-slot:prepend>
        <div class="pa-5">
          <wallet-button />
        </div>
      </template>
      <v-list nav>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item to="/create-token">
          <v-list-item-icon>
            <v-icon>mdi-plus-circle-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Create Token</v-list-item-title>
        </v-list-item>
        <v-list-item to="/profile">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-5">
          <v-tooltip v-if="!$vuetify.theme.dark" bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="info" small fab @click="toggleDarkMode">
                <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
              </v-btn>
            </template>
            <span>Dark Mode</span>
          </v-tooltip>

          <v-tooltip v-else bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="info" small fab @click="toggleDarkMode">
                <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
              </v-btn>
            </template>
            <span>Light Mode</span>
          </v-tooltip>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import WalletButton from "./components/WalletButton.vue";
export default {
  name: "App",

  components: { WalletButton },
  data: () => ({
    drawer: false,
    darkMode: true,
  }),
  methods: {
    toggleDarkMode: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.darkMode = !this.darkMode;
    },
  },
  /**
   * Initializes the store to connect with Wallets and fetch data.
   */
  created() {
    this.$store.dispatch("accounts/initWeb3Modal");
    this.$store.dispatch("accounts/initListener");
  },
};
</script>

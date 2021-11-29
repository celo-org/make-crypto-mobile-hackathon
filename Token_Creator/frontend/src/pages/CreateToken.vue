<template>
  <div>
    <h1>Create Token</h1>

    <v-card>
      <v-card-title>Token Data</v-card-title>
      <v-card-subtitle class="pb-0">Can not be changed later.</v-card-subtitle>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="name"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="symbol"
                  label="Symbol"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="initialSupply"
                  label="Initial Supply"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn @click="createToken">Create Token</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CreateToken",

  data() {
    return {
      name: "",
      symbol: "",
      initialSupply: 1000000000,
    };
  },
  methods: {
    async createToken() {
      this.$store.dispatch("tokenCreator/createSimpleToken", {
        name: this.name,
        symbol: this.symbol,
        initialSupply: this.initialSupply,
      });
    },
  },
};
</script>

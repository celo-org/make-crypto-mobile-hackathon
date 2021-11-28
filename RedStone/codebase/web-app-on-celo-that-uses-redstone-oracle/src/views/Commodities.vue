<template>
  <div class="commodities">
    <h1 class="text-center">Synthetic commodities</h1>
    <p class="text-center description">
      Komodo offers access to derivative tokens providing exposure to the huge market of commodities.
    </p>

    <div class="tabs-container">
      <v-tabs v-model="tabIndex" centered>
        <v-tab v-for="category in categories" :key="category">
          {{ category }}
        </v-tab>
      </v-tabs>
    </div>

    <CommoditiesCards :commodities="commodities" />
  </div>
</template>

<script>
// @ is an alias to /src
import redstone from "redstone-api";
import CommoditiesCards from "@/components/CommoditiesCards.vue";
import commoditiesData from "@/assets/data/commodities.json";
import blockchain from "@/helpers/blockchain";

export default {
  name: 'commodities',

  data() {
    return {
      tabIndex: 0,
    };
  },

  async created() {
    // Loading prices from redstone
    if (Object.keys(this.prices).length === 0) {
      const prices = await redstone.getAllPrices({
        provider: "redstone-stocks",
      });
      this.$store.dispatch('updatePrices', prices);
    }

    // Loading liquidity from blockchain
    if (!this.$store.state.liquidityLoadingCompleted) {
      for (const commodity of this.commodities) {
        const { symbol } = commodity;
        const liquidity = await blockchain.getLiquidityForToken(symbol);
        const liquidityUSD = this.$store.state.prices[symbol].value * liquidity;
        this.$store.dispatch('setLiquidityForToken', {
          symbol,
          liquidity: liquidityUSD,
        });
      }
      this.$store.dispatch('completeLiquidityLoading');
    }
  },

  computed: {
    commodities() {
      const tokens = [];
      for (const symbol in commoditiesData) {
        const commodity = commoditiesData[symbol];
        if (["all", commodity.tags[0]].includes(this.selecteddTab)) {
          tokens.push({
            ...commodity,
            symbol,
            price: this.prices[symbol],
          });
        }
      }
      return tokens;
    },

    categories() {
      const categories = ["all"];
      for (const commodity of Object.values(commoditiesData)) {
        const category = commodity.tags[0];
        if (!categories.includes(category)) {
          categories.push(category);
        }
      }
      return categories;
    },

    selecteddTab() {
      return this.categories[this.tabIndex];
    },

    prices() {
      return this.$store.state.prices;
    },
  },

  components: {
    CommoditiesCards,
  }
}
</script>

<style lang="scss" scoped>
h1 {
  // font-size: 20px;
  font-weight: 700;
  font-size: 30px;
  margin-top: 14px;
  color: #333;
}

.description {
  max-width: 300px;
  margin: auto;
  color: #777;
  font-size: 12px;
  margin-bottom: 10px;
}

</style>

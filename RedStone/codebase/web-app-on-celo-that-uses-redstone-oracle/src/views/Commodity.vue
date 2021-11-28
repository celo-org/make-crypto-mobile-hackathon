<template>
  <div class="commodity">
    <div class="back-link-container">
      <!-- <i class="material-icons">arrow_back</i>
      All commodities -->
      <!-- <a href="/#/commodities">
        <v-icon aria-hidden="false">
          mdi-arrow-left
        </v-icon>
        All commodities
      </a> -->
    </div>

    <h1 class="text-center">
      {{ tokenDetails.name }}:
      
      <span class="price-value">{{ priceValue | price }}</span>
    </h1>
    <div class="text-center subtitle">
      {{ symbol }}
    </div>

    <TokenPriceChartContainer :symbol="symbol" provider="redstone-stocks" />
  </div>
</template>

<script>
import redstone from "redstone-api";
import TokenPriceChartContainer from "@/components/TokenPriceChartContainer";
import commoditiesData from "@/assets/data/commodities.json"

export default {
  name: 'Commodity',

  data() {
    return {
      currentPrice: null,
    };
  },

  async created() {
    this.currentPrice = await redstone.getPrice(this.symbol, {
      provider: "redstone-stocks",
    });
  },

  computed: {
    symbol() {
      return this.$route.params.symbol;
    },

    tokenDetails() {
      const details = commoditiesData[this.symbol];
      return {
        ...details,
        symbol: this.symbol,
      };
    },

    priceValue() {
      if (this.currentPrice) {
        return this.currentPrice.value;
      } else {
        return 0;
      }
    },
  },

  components: {
    TokenPriceChartContainer,
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

.subtitle {
  color: #777;
}

.price-value {
  color: #0F9D58;
}

.back-link-container {
  position: absolute;
  left: 20px;
  top: 20px;
}

</style>

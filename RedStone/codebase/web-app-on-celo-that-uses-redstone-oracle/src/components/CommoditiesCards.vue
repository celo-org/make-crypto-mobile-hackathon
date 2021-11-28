<template>
  <div class="cards-container">
    <v-container>
      <v-row>
        <v-col v-for="commodity in commodities" :key="commodity.symbol" md="4">
          <v-card
            :href="'/#/commodity/' + commodity.symbol"
            class="pa-2 increase-on-hover"
            outlined
          >
            <v-chip small outlined class="tag" :text-color="getTagColor(commodity)">
              {{ commodity.tags[0] }}
            </v-chip>

            <v-card-title>
              <v-avatar class="commodity-avatar" size="52">
                <img alt="commodity-logo" class="pa-3" :src="commodity.logoURI" />
              </v-avatar>
              <p class="ml-6 pt-4 commodity-title">
                <span>
                  {{ commodity.name }}
                </span>
                <br />
                <span class="commodity-subtitle">
                  Symbol: {{ commodity.symbol }}
                </span>
              </p>
            </v-card-title>

            <v-card-text>
              <div class="metrics">
                <div class="usd-price metric">
                  <div class="value">
                    {{ getPrice(commodity) | price }}
                  </div>
                  <div class="label">
                    USD Price
                  </div>
                </div>

                <div class="liquidity metric">
                  <div class="value">
                    {{ getLiquidity(commodity) | price }}
                  </div>
                  <div class="label">
                    Liquidity
                  </div>
                </div>

                <!-- <div class="liquidity metric">
                  <div class="value">
                    Redstone
                  </div>
                  <div class="label">
                    Oracle
                  </div>
                </div> -->
              </div>
            </v-card-text>
            
            <!-- <v-img :src=""></v-img> -->

            
            <!-- {{ commodity }} -->
          </v-card>
          <div class="card" >
            
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'CommoditiesCards',
  props: {
    commodities: Array,
  },

  methods: {
    getTagColor(commodity) {
      const tag = commodity.tags[0];
      // grains, energies, metals, livestocks, softs
      switch (tag) {
        case "grains":
          return "orange";
        case "energies":
          return "green";
        case "metals":
          return "blue";
        case "livestocks":
          return "brown";
        case "softs":
          return "pink";
        default:
          return "black";
      }
    },

    getPrice(commodity) {
      if (commodity.price) {
        return commodity.price.value;
      } else {
        return '...';
      }
    },

    getLiquidity(commodity) {
      const { symbol } = commodity;
      if (this.liquidity[symbol] !== undefined) {
        return this.liquidity[symbol];
      } else {
        return '...';
      }
    }
  },

  computed: {
    liquidity() {
      return this.$store.state.liquidity;
    },
  },

}
</script>

<style scoped lang="scss">

.tag {
  position: absolute;
  right: 15px;
  top: 15px;
}

.commodity-avatar {
  border: 3px solid #2196F3;
}

.commodity-title {
  font-size: 16px;
}

.commodity-subtitle {
  font-size: 10px;
  color: #555;
}

.increase-on-hover {
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
}

.metrics {
    display: flex;
    // justify-content: stretch;
    justify-content: center;
  }

.metric {
  margin-right: 20px;
  width: 100px;
  // border: 1px solid black;
  text-align: center;

  .value {
    color: #111;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid #eee;
  }

  .label {
    font-size: 10px;
    color: #777;
    font-weight: 400;
  }
}

</style>

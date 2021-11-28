<template>
  <div class="main-container">
    <div class="stats-container">
      <!-- <StatElem
        v-for="(value, title) in stats"
        :key="title"
        :value="value"
        :title="title"
      /> -->
    </div>

    <hr />

    <div class="bar-below-chart">
      <div class="time-range-links">
        <a
          v-for="(range, index) in timeRanges"
          :key="index"
          :class="{ 'selected': index === selectedTimeRangeIndex }"
          @click="selectTimeRange(index)"
        >{{ range.title }}</a>
      </div>

      <div class="action-buttons">
        <v-btn :href="'/#/token-sponsor/' + symbol" color="green" outlined small class="ml-2">
          Token sponsor view
          <v-icon
            right
            dark
          >
            mdi-finance
          </v-icon>
        </v-btn>
        <v-btn
          :href="getUniswapTradeUrl(symbol)"
          target="_blank"
          color="#6b6296"
          outlined
          small
          class="ml-2"
        >
          Trade on ubeswap
          <img
            class="ubeswap-logo"
            src="https://app.ubeswap.org/static/media/icon-ube.73779bdc.svg"
          />
        </v-btn>
      </div>

      <!-- <div class="last-updated-note">
        Last updated
        <strong>
          {{ lastUpdatedTime }}
        </strong>
      </div> -->
    </div>

    <hr />

    <!-- <b-row>
      <b-col xs="12" lg="9"> -->
        <div class="price-chart-container">
          <div class="loading-icon-container" v-show="loading">
            <vue-loaders-ball-beat color="#2196F3" scale="1"></vue-loaders-ball-beat>
          </div>
          <TokenPriceChart v-show="!loading" :data="chartData" />
        </div>
      <!-- </b-col> -->
      <!-- <b-col xs="12" lg="3"> -->
        <!-- <h3 style="margin-bottom: 20px;">Data sources</h3>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="checkbox-group-2"
            v-model="selectedSources"
            :aria-describedby="ariaDescribedby"
            name="flavour-2"
          >
            <b-form-checkbox
              class="source-checkbox"
              v-for="source in sources" :key="source"
              :value="source"
            >
              <div class="source-label" :style="{ color: sourceColors[source] }">
                <div class="source-name">
                  {{ source }}
                </div>
                <div class="source-value">
                  {{ getCurrentPriceForSource(source) | price }}
                </div>
              </div>
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group> -->
      <!-- </b-col> -->
    <!-- </b-row> -->
  </div>
</template>

<script>
import redstone from 'redstone-api';
import TokenPriceChart from './TokenPriceChart';
import blockchain from "@/helpers/blockchain";
// import StatElem from './StatElem';
import _ from 'lodash';

function formatPrice(value) {
  return (value || 0).toFixed(2);
}

// const palette = distinctColors({ count: 40 }).map(c => c.hex());
const palette = getRedstoneColorPaletteForChart();

export default {
  name: "TokenPriceChartContainer",
  props: {
    symbol: String,
    provider: String,
    currentPrice: Object,
  },

  timers: {
    updateLastUpdatedTime: { autostart: true, time: 1000, repeat: true },
  },

  data() {
    return {
      prices: [],
      loading: false,
      selectedSources: ['aggregated'],

      lastUpdatedTime: 'recently',

      selectedTimeRangeIndex: 0,
      timeRanges: [
        {
          title: 'Last hour',
          hours: 1,
          days: 0,
        },
        {
          title: '1 day',
          days: 1,
        },
        {
          title: '3 days',
          days: 3,
        },
        {
          title: '7 days',
          days: 7,
        },
      ]
    };
  },

  created() {
    this.loadPrices();
  },

  methods: {
    getUniswapTradeUrl(symbol) {
      return blockchain.getAddressForSymbol(symbol, "ubeswapTradeUrl");
    },

    async loadPrices() {
      try {
        this.loading = true;
        let query = redstone.query().symbol(this.symbol);
        // TODO: fix redstone-api fluent interface for hours and refactor this place
        if (this.selectedTimeRange.days === 0) {
          this.prices = await redstone.getHistoricalPrice(this.symbol, {
            startDate: Date.now() - 3600 * 1000 * this.selectedTimeRange.hours,
            endDate: Date.now(),
            interval: 1,
            provider: this.provider,
          });
        } else {
          query = query.forLastDays(this.selectedTimeRange.days);
          this.prices = await query.exec({ provider: this.provider });
        }
      } finally {
        this.loading = false;
      }
    },

    selectTimeRange(index) {
      if (this.selectedTimeRangeIndex !== index) {
        this.selectedTimeRangeIndex = index;
        this.loadPrices();
      }
    },

    getCurrentPriceForSource(source) {
      if (source === 'aggregated') {
        return this.currentPrice.value;
      } else {
        return this.currentPrice.source[source];
      }
    },

    updateLastUpdatedTime() {
      const secondsAfterLastUpdate = Math.round(
        (Date.now() - this.currentPrice.timestamp) / 1000);

      if (secondsAfterLastUpdate < 60) {
        this.lastUpdatedTime = secondsAfterLastUpdate + ' seconds ago';
      } else {
        const minutesAfterLastUpdate = Math.round(secondsAfterLastUpdate / 60);
        if (minutesAfterLastUpdate > 1) {
          this.lastUpdatedTime = minutesAfterLastUpdate + ' minutes ago';  
        } else {
          this.lastUpdatedTime = minutesAfterLastUpdate + ' minute ago';
        }
      }
    },
  },

  watch: {
    symbol() {
      this.loadPrices();
    },

    currentPrice(newVal) {
      // If 1 hour chart selected
      if (this.selectedTimeRange.days === 0 && this.prices && this.prices.length > 0) {
        if (_.last(this.prices).id !== newVal.id) {
          this.prices.push(newVal);
        }
      }
    },
  },

  computed: {
    selectedTimeRange() {
      return this.timeRanges[this.selectedTimeRangeIndex];
    },

    priceValues() {
      return this.prices.map(p => p.value);
    },

    stats() {
      return {
        Minimum: formatPrice(_.min(this.priceValues)),
        Maximum: formatPrice(_.max(this.priceValues)),
        Average: formatPrice(_.mean(this.priceValues)),
      };
    },

    sources() {
      let sources = ['aggregated'];
      if (this.prices[0] && this.prices[0].source) {
        const sortedSources = Object.keys(this.prices[0].source);
        sortedSources.sort();
        sources = sources.concat(sortedSources);
      }
      return sources;
    },

    sourceColors() {
      const result = {};
      let counter = 0;
      for (const source of this.sources) {
        result[source] = palette[counter];
        counter++;
      }
      return result;
    },
    
    pointRadius() {
      if (this.selectedTimeRange.days === 0) {
        return 2;
      } else {
        return 3;
      }
    },

    chartData() {
      const labels = [];
      const datasets = {};

      for (const source of this.selectedSources) {
        if (!datasets[source]) {
          datasets[source] = {
            data: [],
            backgroundColor: 'transparent',
            pointHoverRadius: 5,
            pointRadius: this.pointRadius,
            borderColor: this.sourceColors[source],
            pointBackgroundColor: '#fff',
          };
        }
      }

      for (const price of this.prices) {
        labels.push(price.timestamp);

        for (const source of this.selectedSources) {
          const value = price.source[source] || price.value;
          datasets[source].data.push(value);
        }
      }

      let timeUnit = 'day';
      if (this.selectedTimeRange.days === 1) {
        timeUnit = 'hour';
      }
      if (this.selectedTimeRange.days === 0) {
        timeUnit = 'minute';
      }

      return {
        labels,
        datasets: Object.values(datasets),
        timeUnit,
      };
    },
  },

  components: {
    TokenPriceChart,
    // BCard,
    // BFormInput,
    // BForm,
    // StatElem,
  },
}

function getRedstoneColorPaletteForChart() {
  return [
    '#2196F3', // blue
    '#F55767',
    '#3cb44b',
    '#4363d8',
    '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#008080',
    '#808080',
    '#9a6324',
    '#800000',
    '#808000',
    '#000075',
  ];
}

</script>

<style scoped lang="scss">

.main-container {
  max-width: 2000px;
  padding: 40px;
  margin: auto;
}

.loading-icon-container {
  display: flex;
  justify-content: center;
}

hr {
  border: none;
  border-bottom: 1px solid #ddd;
  margin: 5px;
}

.source-checkbox {
  display: block;
  margin-bottom: 5px;

  .source-label {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    width: 100%;
    color: #777;
    justify-content: space-between;
    
    .source-name {
      font-weight: 300;
      font-size: 16px;
      text-transform: capitalize;
    }

    .source-value {
      color: #777;
      font-weight: 500;
    }
  }


}

.price-chart-container {
  min-height: 400px;
  padding: 20px;
}

.bar-below-chart {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;

  .last-updated-note {
    color: #adb5bd;
  }
}

.stats-container {
  display: flex;
}

.time-range-links {
  a {
    margin-right: 10px;
    // color: var(--redstone-red-color);

    &.selected {
      text-decoration: underline;
    }
  }
}

.ubeswap-logo {
  width: 16px;
  position: relative;
  bottom: 2px;
}

</style>

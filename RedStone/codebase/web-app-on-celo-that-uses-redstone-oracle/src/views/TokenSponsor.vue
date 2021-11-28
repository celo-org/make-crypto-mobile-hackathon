<template>
  <div class="token-sponsor">

    <TokenSponsorActionDialog
      :currentPrice="currentPrice"
      :ethPrice="celoPrice"
      :balance="balance"
      :collateral="collateral"
      :ethBalance="ethBalance"
      :cusdBalance="cusdBalance"
      :symbol="symbol"
      :cusdApproveWaiting="cusdApproveWaiting"
      :cusdApproveWaitingForTxMining="cusdApproveWaitingForTxMining"
      :txWaitingForConfirmation="txWaitingForConfirmation"
      :txWaitingForMining="txWaitingForMining"
      ref="dialog" />

    <div class="main-card">
      <div class="top-section">
        <div class="token-details">
          <h1>
            {{ tokenDetails.name }}:
            <span class="price-value">
              {{ priceValue | price }}
            </span>
          </h1>
          <div class="subtitle mt-1">
            <strong>
              {{ symbol }}
            </strong>
            <a v-if="etherscanTokenUrl" target="_blank" :href="etherscanTokenUrl">
              Token on blockscout
              <v-icon style="margin-bottom: 1px;" color="#1976d2" x-small>mdi-open-in-new</v-icon>
            </a>
          </div>

          <div class="small-subtitle mt-2">
            <v-icon class="info-icon" small color="blue">mdi-currency-usd</v-icon>
            You have
            <span class="value">
              {{ baseTokenBalance | price-bn }} {{ baseCurrency }}
            </span>
          </div>

          <div class="small-subtitle mt-2">
            <v-icon class="info-icon" small color="blue">mdi-information-outline</v-icon>
            You should maintain at least 120% solvency, otherwise your tokens may be liquidated
          </div>
        </div>

        <div class="solvency-container">
          <div class="gauge-container">
            <VueGauge
              refid="gauge"
              :key="gaugeOptions.needleValue" 
              :options="gaugeOptions"
            />
          </div>
          <div class="text-center mb-6">
            <span class="subtitle">
              Solvency:
            </span>
            <span class="value">
              {{ solvency >= 100000 ? 'N/A' : solvency + '%' }}
            </span>
          </div>
        </div>
      </div>

      <hr />

      <v-tabs class="mb-4" fixed-tabs centered v-model="tab">
        <v-tab>
          Balance
          <v-icon right>
            mdi-wallet
          </v-icon>
        </v-tab>
        <v-tab>
          Collateral
          <v-icon right>
            mdi-cash-lock
          </v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Balance -->
        <v-tab-item>
          <div class="balance-title">
            <div>
              Your balance:
            </div>
            <div class="value">
              <div class="main-currency-value">
                {{ balance | price-bn }} {{ symbol }}
              </div>
              <hr />
              <div class="usd-value">
                {{ balanceValueUSD | price }}
              </div>
            </div>
          </div>

          <div v-if="balanceValueUSD > 0" class="main-text text-center">
            <a class="text-center" target="_blank" :href="ubeswapPoolUrl">
              Add liquidity on ubeswap
              <img
                class="ubeswap-logo"
                src="https://app.ubeswap.org/static/media/icon-ube.73779bdc.svg"
              />
            </a>
          </div>

          <div class="buttons">
            <div class="button-container">
              <v-btn color="#0F9D58" @click="mintButtonClicked()" rounded outlined large>
                Mint tokens
                <v-icon right>
                  mdi-wallet-plus
                </v-icon>
              </v-btn>
            </div>

            <div class="button-container">
              <v-btn color="#DB4437" @click="burnButtonClicked()" rounded outlined large>
                Burn tokens
                <v-icon right>
                  mdi-fire
                </v-icon>
              </v-btn>
            </div>
          </div>

        </v-tab-item>

        <!-- Collateral -->
        <v-tab-item>
          <div class="balance-title">
            <div>
              Your collateral:
            </div>
            <div class="value">
              <div class="main-currency-value">
                {{ collateral | format-collateral }} {{ baseCurrency }}
              </div>
              <hr />
              <div class="usd-value">
                {{ collateralValueUSD | price }}
              </div>
            </div>
          </div>

          <!-- <div class="main-text">
            <h4 class="text-center mb-1">Your collateral makes additional money for you</h4>
            <p>
              Your collateral is being automatically staked on
              <a
                href="https://app.aave.com/borrow/cUSD-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480xb53c1a33016b2dc2ff3653530bff1848a515c8c5"
                target="_blank"
              >
                Aave protocol
              </a>.
              So while you are depositting your collateral for {{ symbol }} tokens you also make money.
              For each depositted
              <strong>
                {{ depositExampleAmount }} {{ baseCurrency }}
              </strong>
              you will make
              <strong>
                {{ (aaveApy / 100) * depositExampleAmount | price-bn }} {{ baseCurrency }}
              </strong>
              annually at current rates.
            </p>
          </div> -->

          <div class="buttons">
            <div class="button-container">
              <v-btn color="#1976d2" @click="addCollateralButtonClicked()" rounded outlined large>
                Add collateral
                <v-icon right>
                  mdi-lock-plus
                </v-icon>
              </v-btn>
            </div>

            <div class="button-container">
              <v-btn color="orange" @click="removeCollateralButtonClicked()" rounded outlined large>
                Remove collateral
                <v-icon right>
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import redstone from "redstone-api";
import VueGauge from 'vue-gauge';
import { mapState } from 'vuex';
import blockchain from "@/helpers/blockchain";
import commoditiesData from "@/assets/data/commodities.json";
import TokenSponsorActionDialog from "@/components/TokenSponsorActionDialog";

export default {
  name: 'TokenSponsor',

  data() {
    return {
      currentPrice: null,
      celoPrice: null,
      cusdPrice: null,
      balance: null,
      tab: 0,
      solvency: 0,
      collateral: 0,
      ethBalance: 0,
      cusdBalance: 0,

      cusdApproveWaiting: false,
      cusdApproveWaitingForTxMining: false,
      txWaitingForMining: false,
      txWaitingForConfirmation: false,

      depositExampleAmount: 1000,
    };
  },

  created() {
    this.loadEverything();
  },

  timers: {
    loadCurrentPrice: {
      time: 2000,
      autostart: true,
      repeat: true,
    },
    loadCeloPrice: {
      time: 2000,
      autostart: true,
      repeat: true,
    },
    loadCusdPrice: {
      time: 2000,
      autostart: true,
      repeat: true,
    },
    loadCollateral: {
      time: 1000,
      autostart: true,
      repeat: true,
    }
  },

  methods: {
    loadEverything() {
      this.loadCurrentPrice();
      this.loadSolvency();
      this.loadCollateral();
      this.loadBalance();
      this.loadCeloPrice();
      this.loadCeloBalance();
      this.loadUsdcBalance();
    },

    async loadCurrentPrice() {
      const price = await redstone.getPrice(this.symbol, {
        provider: "redstone-stocks",
      });

      // Simulating frequent updates
      this.currentPrice = {
        ...price,
        value: price.value + (Math.random() / 10),
      };
    },

    async loadCusdPrice() {
      this.cusdPrice = {
        value: 1 + (Math.random() / 1000),
      };
    },

    async loadCeloBalance() {
      this.ethBalance = await blockchain.getCeloBalance();
    },

    async loadUsdcBalance() {
      this.cusdBalance = await blockchain.getCusdBalance();
    },

    async loadBalance() {
      this.balance = await blockchain.getBalance(this.symbol);
    },

    async loadCeloPrice() {
      const price = await redstone.getPrice("CELO");

      // Simulating frequent updates
      this.celoPrice = {
        ...price,
        value: price.value + (Math.random() / 10),
      };
    },

    async loadSolvency() {
      this.solvency = await blockchain.getSolvency(this.symbol);
    },

    async loadCollateral() {
      const newCollateralValue = await blockchain.getCollateralAmount(this.symbol);
      if (newCollateralValue > this.collateral) {
        this.collateral = newCollateralValue;
      } else {
        if (this.baseCurrency === "ETH") {
          this.collateral += 0.000000001; // To demonstrate that it is increasing in real-time
        }
      }
    },

    mintButtonClicked() {
      this.opendDialog({
        title: `Mint ${this.symbol} tokens`,
        inputLabel: `Amount in ${this.symbol}`,
        initialValue: 0.1,
        additionalNoteType: 'mint',
        onConfirmButtonClick: (value) => this.mint(value),
      });
    },

    burnButtonClicked() {
      this.opendDialog({
        title: `Burn ${this.symbol} tokens`,
        inputLabel: `Amount in ${this.symbol}`,
        additionalNoteType: 'burn',
        onConfirmButtonClick: (value) => this.burn(value),
      });
    },

    addCollateralButtonClicked() {
      const baseSymbol = this.baseCurrency;
      this.opendDialog({
        title: `Add ${baseSymbol} tokens to your collateral`,
        inputLabel: `Amount in ${baseSymbol}`,
        additionalNoteType: 'add-collateral',
        onConfirmButtonClick: (value) => this.addCollateral(value),
      });
    },

    removeCollateralButtonClicked() {
      const baseSymbol = this.baseCurrency;
      this.opendDialog({
        title: `Remove ${baseSymbol} tokens from your collateral`,
        inputLabel: `Amount in ${baseSymbol}`,
        additionalNoteType: 'remove-collateral',
        onConfirmButtonClick: (value) => this.removeCollateral(value),
      });
    },

    async mint(value) {
      const stake = blockchain.calculateStakeAmount({
        tokenAmount: value,
        tokenPrice: this.currentPrice.value,
        ethPrice: this.celoPrice.value,
        solvency: blockchain.DEFAULT_SOLVENCY,
      });
      if (this.baseCurrency === "cUSD") {
        await this.approveCusdSpending(stake);
      }
      await this.sendBlockchainTransaction(
        async () => await blockchain.mint(this.symbol, value, stake));
    },

    async burn(value) {
      await this.sendBlockchainTransaction(
        async () => await blockchain.burn(this.symbol, value));
    },

    async addCollateral(value) {
      if (this.baseCurrency === "cUSD") {
        await this.approveCusdSpending(value);
      }
      await this.sendBlockchainTransaction(
        async () => await blockchain.addCollateral(this.symbol, value));
    },

    async removeCollateral(value) {
      await this.sendBlockchainTransaction(
        async () => await blockchain.removeCollateral(this.symbol, value));
    },

    async approveCusdSpending(value) {
      try {
        this.cusdApproveWaiting = true;
        this.$toast.info("Please approve cUSD spending");
        const tx = await blockchain.approveCusdSpending(value, this.symbol);
        this.cusdApproveWaiting = false;
        this.cusdApproveWaitingForTxMining = true;
        await tx.wait();
        this.$toast.success("cUSD spending approved");
      } catch (e) {
        this.$toast.error("cUSD spending approve failed");
        console.error(e);
      } finally {
        this.cusdApproveWaiting = false;
        this.cusdApproveWaitingForTxMining = false;
      }
      
    },

    async sendBlockchainTransaction(txSendFunction, successMsg, errorMsg) {
      try {
        this.txWaitingForConfirmation = true;
        this.$toast.info("Please confirm transaction");
        const tx = await txSendFunction();
        this.txWaitingForConfirmation = false;
        this.txWaitingForMining = true;
        this.$toast.info(successMsg || "Transaction is pending. Please wait...");
        await tx.wait();
        this.$toast.success("Transaction has been confirmed");
        // To refresh data in the current view
        this.loadEverything();
      } catch (e) {
        this.$toast.error(errorMsg || "Transaction failed");
        console.error(e);
      } finally {
        this.txWaitingForMining = false;
        this.txWaitingForConfirmation = false;
        this.closeDialog();
      }
    },

    opendDialog(opts) {
      this.$refs.dialog.openDialog(opts);
    },

    closeDialog() {
      this.$refs.dialog.close();
    },
  },

  computed: {
    ...mapState(['baseCurrency']),

    symbol() {
      return this.$route.params.symbol;
    },

    baseTokenBalance() {
      if (this.baseCurrency === "cUSD") {
        return this.cusdBalance;
      } else {
        return this.ethBalance;
      }
    },

    aaveApy() {
      if (this.baseCurrency === "ETH") {
        return 80; // Aave return rate for ETH token on kovan is 80%
      } else {
        return 1.6;
      }
    },

    ubeswapPoolUrl() {
      if (this.symbol) {
        return blockchain.getAddressForSymbol(this.symbol, "ubeswapPoolUrl");
      } else {
        return "";
      }
    },

    etherscanTokenUrl() {
      if (this.symbol) {
        return blockchain.getEtherscanUrlForToken(this.symbol);  
      } else {
        return "";
      }
    },

    collateralValueUSD() {
      if (this.baseCurrency === "cUSD" && this.cusdPrice) {
        return this.cusdPrice.value * this.collateral;
      } else if (this.celoPrice) {
        return this.celoPrice.value * this.collateral;
      } else {
        return '...';
      }
    },

    balanceValueUSD() {
      if (this.currentPrice) {
        return this.currentPrice.value * this.balance;
      } else {
        return '...';
      }
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

    // 0 needleValue means 120% solvency, 100 needleValue means 150% and more
    needleValue() {
      const minSolvency = 120;
      const maxSolvency = 150;
      return (this.solvency - minSolvency) * (100 / (maxSolvency - minSolvency));
    },

    gaugeOptions() {
      return {
        // arcLabels: ['Low', 'Neutral', 'High'],
        arcDelimiters: [25, 50, 75],
        needleValue: this.needleValue,
        needleColor: '#999',
        // centralLabel: "Solvency",
        chartWidth: 180,
        arcColors: ['#DB4437', '#F4B400', '#4285F4', '#0F9D58'],
        rangeLabel: ['Low', 'High']
      };
    },
  },

  components: {
    TokenSponsorActionDialog,
    VueGauge,
  },
}
</script>

<style scoped lang="scss">

h1 {
  // font-size: 20px;
  font-weight: 700;
  font-size: 30px;
  margin-top: 14px;
  color: #555;
}

.price-value {
  color: #0F9D58;
}

.subtitle {
  font-size: 16px;
  color: #555;

  a {
    margin-left: 5px;
    font-size: 12px;
    text-decoration: none;
    // color: #333;
    &:hover {
      text-decoration: underline;
    }
  }
}

.main-text {
  padding-left: 60px;
  padding-right: 60px;
  color: #555;

  a {
    font-size: 12px;
    text-decoration: none;
    color: #6b6296;

    &:hover {
      text-decoration: underline;
    } 
  }

  .ubeswap-logo {
    height: 18px;
    position: relative;
    top: 2px;
  }

  p {
    font-size: 12px;

    strong {
      font-weight: 600;
    }
  }
}

.small-subtitle {
  color: #777;
  font-size: 14px;
  max-width: 300px;

  .value {
    font-weight: bold;
    color: #555;
  }

  .info-icon {
    position: relative;
    bottom: 0.5px;
  }
}

.main-card {
  margin: auto;
  margin-top: 20px;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 0 1px gray;
  width: 600px;
  // height: 500px;

  .top-section {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }

  hr {
    border: none;
    border-bottom: 1px solid #eee;
    
  }

  .solvency-container {
    .subtitle {
      color: #777;
    }
    .value {
      font-weight: bold;
      color: #555;
    }

    .gauge-container {
      // border: 1px solid black;
      margin-top: 15px;
      display: flex;
      justify-content: center;
    }
  }

  .balance-title {
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
    color: #777;
    // border: 1px solid black;

    div {
      margin-left: 10px;
      margin-right: 10px;
    }

    .value {
      // border: 1px solid red;
      text-align: center;

      .main-currency-value {
        font-size: 24px;
        font-weight: bold;
        color: #1976d2;
      }

      .usd-value {
        font-size: 14px;
        color: gray;
      }
    }
  }

  .buttons {
    margin-top: 40px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;

    .button-container {
      // border: 1px solid red;
      margin-right: 5px;
      margin-left: 5px;
    }
  }
}

</style>

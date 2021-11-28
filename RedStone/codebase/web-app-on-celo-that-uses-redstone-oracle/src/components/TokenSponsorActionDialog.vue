<template>
  <v-dialog
    transition="dialog-top-transition"
    v-model="isVisible"
    max-width="400"
    scrolllable
    hide-overlay
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
          color="#1976d2"
          dark
          flat
        >
          {{ title }}
        </v-toolbar>

        <div v-if="loading" class="loading-komodo-container">
          <template v-if="usdcApproveWaiting">
            <div class="waiting-label">
              Please approve USDC spending!
            </div>
            <img src="https://media.giphy.com/media/SVzzgZxzjHGla/giphy.gif"/>
          </template>
          <template v-if="usdcApproveWaitingForTxMining">
            <div class="waiting-label">
              Waiting for USDC spending approval...
            </div>
            <img src="https://media.giphy.com/media/9MtixQSzE7HJ6/giphy.gif"/>
          </template>
          <template v-if="txWaitingForConfirmation">
            <div class="waiting-label">
              Please confirm transaction!
            </div>
            <!-- <img src="https://media.giphy.com/media/KZeDdQ4auOZEajNALF/giphy.gif"/> -->
          </template>
          <template v-if="txWaitingForMining">
            <div class="waiting-label">
              Waiting for tx mining...
            </div>
            <img src="https://media.giphy.com/media/gZK7u9Ia4KuuQ/giphy.gif"/>
          </template>
        </div>

        <div v-if="additionalNote && !loading" class="additional-note-container">
          <v-icon class="info-icon" small color="blue">mdi-information-outline</v-icon>
          <div v-html="additionalNote" class="text">
          </div>
        </div>

        <div class="input-container">
          <v-text-field
            :label="inputLabel"
            :disabled="loading"
            required
            v-model="value"
          ></v-text-field>
        </div>

        <v-card-actions v-if="!loading" class="justify-end">
          <v-btn
            text
            color="#1976d2"
            @click="isVisible = false"
          >
            Close
          </v-btn>

          <v-btn
            outlined
            :loading="loading"
            color="#1976d2"
            @click="onConfirmButtonClick(Number(value))"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import blockchain from "@/helpers/blockchain";
import formatter from "@/helpers/formatter";

const { DEFAULT_SOLVENCY, MIN_SOLVENCY } = blockchain;

export default {
  name: 'TokenSponsorActionDialog',

  props: {
    currentPrice: Object,
    ethPrice: Object,
    balance: Number,
    symbol: String,
    ethBalance: Number,
    usdcBalance: Number,
    collateral: Number,
    usdcApproveWaiting: Boolean,
    usdcApproveWaitingForTxMining: Boolean,
    txWaitingForMining: Boolean,
    txWaitingForConfirmation: Boolean,
  },

  data() {
    return {
      isVisible: false,
      title: '',
      inputLabel: '',
      additionalNoteType: '',
      value: 0.1,
      onConfirmButtonClick: null,
    };
  },

  methods: {
    openDialog(opts) {
      this.title = opts.title;
      this.inputLabel = opts.inputLabel;
      this.isVisible = true;
      this.onConfirmButtonClick = opts.onConfirmButtonClick;
      this.additionalNoteType = opts.additionalNoteType;

      if (opts.initialValue) {
        this.value = opts.initialValue;
      }
    },

    close() {
      this.isVisible = false;
    },
  },

  computed: {
    ...mapState(['baseCurrency']),

    additionalNote() {
      switch (this.additionalNoteType) {
        case 'mint':
          return this.additionalNoteForMint;
        case 'burn':
          return this.additionalNoteForBurn;
        case 'add-collateral':
          return this.additionalNoteForAddCollateral;
        case 'remove-collateral':
          return this.additionalNoteForRemoveCollateral;
        default:
          return '';
      }
    },

    loading() {
      return this.usdcApproveWaiting
        || this.usdcApproveWaitingForTxMining
        || this.txWaitingForConfirmation
        || this.txWaitingForMining;
    },

    baseBalance() {
      if (this.baseCurrency === "USDC") {
        return this.usdcBalance;
      } else {
        return this.ethBalance;
      }
    },

    additionalNoteForMint() {
      const stake = blockchain.calculateStakeAmount({
        tokenAmount: this.value,
        ethPrice: this.ethPrice.value,
        tokenPrice: this.currentPrice.value,
        solvency: DEFAULT_SOLVENCY,
      });
      const stakeFormatted = formatter.formatPriceBN(stake);
      const baseSymbol = this.baseCurrency;
      const balanceFormatted = formatter.formatPriceBN(this.baseBalance);
      return `To maintain ${DEFAULT_SOLVENCY}% solvency, `
        + `<strong>you should stake ${stakeFormatted} ${baseSymbol}</strong> `
        + ` to mint ${this.value} ${this.symbol}. `
        + `You have: ${balanceFormatted} ${baseSymbol}`;
    },

    additionalNoteForBurn() {
      return `Max: ${this.balance} ${this.symbol}`;
    },

    additionalNoteForAddCollateral() {
      const baseBalanceFormatted = formatter.formatPriceBN(this.baseBalance);
      return `Max: ${baseBalanceFormatted} ${this.baseCurrency}`;
    },

    additionalNoteForRemoveCollateral() {
      let maxToRemoveFormatted = 0;

      if (this.baseCurrency === "USDC") {
        const minCollateral = (MIN_SOLVENCY / 100) * this.balance * this.currentPrice.value;
        const maxAmountToRemove = Math.max(this.collateral - minCollateral, 0);
        maxToRemoveFormatted = formatter.formatPriceBN(maxAmountToRemove);
      } else if (this.baseCurrency === "ETH") {
        const currentTokenEthPrice = this.currentPrice.value / this.ethPrice.value;
        const minCollateral = (MIN_SOLVENCY / 100) * this.balance * currentTokenEthPrice;
        const maxAmountToRemove = Math.max(this.collateral - minCollateral, 0);
        maxToRemoveFormatted = formatter.formatPriceBN(maxAmountToRemove);
      }

      return `<strong>You can remove MAX: ${maxToRemoveFormatted} `
        + `${this.baseCurrency}</strong> to remain solvent with `
        + `${MIN_SOLVENCY}% solvency`;
    },
  },
}
</script>

<style lang="scss" scoped>

.input-container {
  padding: 16px;
}

.loading-komodo-container {
  .waiting-label {
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    margin-bottom: 16px;
  }

  padding: 16px;
  padding-bottom: 0px;

  img {
    width: 100%;
    border-radius: 10px;
  }
}

.additional-note-container {
  font-size: 14px;
  color: #333;
  padding: 4px 16px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 24px auto;

  .info-icon {
    display: block;
    position: relative;
    top: 2px;
  }
}

</style>

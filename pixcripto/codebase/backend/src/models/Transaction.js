const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    moeda: {
        type: String,
        required: true
    },
    amount: {
      type: Number,
      required: true,
    },
    base: {
        type: Number,
        required: true
    },
    cpf: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;

const mongoose = require("mongoose");

const SaldoSchema = mongoose.Schema(
  {
    cpf: {
      type: String,
      required: true,
    },
    BRL: {
      type: Number,
      required: true,
    },
    CUSD: {
      type: Number,
      required: true,
    },
    MCO2: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Saldo = mongoose.model('Saldo', SaldoSchema)

module.exports = Saldo;

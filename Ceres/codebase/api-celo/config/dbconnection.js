var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);

var walletSchema = new mongoose.Schema({
    publicKey: String,
    privateKey: String,
    words: String,
    observed: { type: Boolean, default: true} ,
    created: { type: Date, default: Date.now },
  });

var Wallet = mongoose.model("wallet", walletSchema);

var transactionSchema = new mongoose.Schema({
    from: String,
    to: String,
    value: Number,
    transactionDate : Date,
    gas : Number,
    transactionId: String,
    status: String,
    successSent: Boolean
  });

var Transaction = mongoose.model("transaction", transactionSchema);

module.exports = { Wallet, Transaction };


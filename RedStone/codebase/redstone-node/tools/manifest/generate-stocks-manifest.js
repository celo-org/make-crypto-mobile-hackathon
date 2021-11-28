const generateSubManifest = require("./generate-submanifest-from-main");

const OUTPUT_FILE_PATH = "./manifests/stocks.json";
const SYMBOLS = [
  // Crypto
  "BTC",
  "ETH",
  "CELO",

  // Stocks
  "TSLA",
  "AAPL",
  "IBM",
  "AMZN",
  "GOOG",
  "COST",
  "DIS",
  "FB",
  "MA",
  "MSFT",
  "NFLX",
  "NKE",
  "PINS",
  "SHOP",
  "SPOT",
  "TDOC",

  // ETFs
  "SPY",
  "QQQ",
  "ONEQ",
  "IWM",
  "EFA",
  "VGK",
  "INDA",
  "RSX",

  // Grains
  "ZC=F",
  "ZS=F",
  "ZM=F",
  "ZW=F",
  "KE=F",
  "ZO=F",
  "ZR=F",

  // Energies
  "CL=F",
  "RB=F",
  "NG=F",
  "QA=F",
  "EH=F",

  // Metals
  "GC=F",
  "SI=F",
  "HG=F",
  "PL=F",
  "PA=F",

  // Livestocks
  "LE=F",
  "GF=F",
  "HE=F",
  "PRK=F",
  "DC=F",
  "GNF=F",
  "CB=F",
  "CSC=F",

  // Popular currencies
  "GBP",
  "AUD",
  "CHF",
  "EUR",
  "JPY",

  // Latin american currencies
  "MXNUSD=X",
  "BRLUSD=X",
  "COPUSD=X",
  "ARSUSD=X",
  "PENUSD=X"
];

generateSubManifest(SYMBOLS, OUTPUT_FILE_PATH, {
  "interval": 60000,
  "sourceTimeout": 30000,
});

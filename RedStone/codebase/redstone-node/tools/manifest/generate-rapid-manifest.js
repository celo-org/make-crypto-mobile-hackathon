const generateSubManifest = require("./generate-submanifest-from-main");

const OUTPUT_FILE_PATH = "./manifests/rapid.json";
const SYMBOLS = [
  "BTC",
  "ETH",
  "USDT",
  "BNB",
  "DOGE",
  "XRP",
  "ADA",
  "DOT",
  "XLM",
  "AR",
];

generateSubManifest(SYMBOLS, OUTPUT_FILE_PATH);

const symbolToYfSymbol = require("./symbol-to-yf-symbol.json");

exports.getTokenList = () => Object.keys(symbolToYfSymbol);

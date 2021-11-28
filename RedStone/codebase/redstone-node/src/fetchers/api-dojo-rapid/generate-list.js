const symbolToApiDojoSymbol = require("./symbol-to-api-dojo-symbol.json");

exports.getTokenList = () => Object.keys(symbolToApiDojoSymbol);

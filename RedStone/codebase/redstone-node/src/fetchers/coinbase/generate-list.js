const axios = require("axios");

async function getTokenList() {
    let URL = "https://api.coinbase.com/v2/exchange-rates";

    let response = await axios.get(URL);

    let tokens = Object.keys(response.data.data.rates);

    return tokens;
}

exports.getTokenList = getTokenList;

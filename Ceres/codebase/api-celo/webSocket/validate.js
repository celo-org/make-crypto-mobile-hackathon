var Schema = require("../config/dbconnection");

const mapWallets = new Map();

async function  fillMapWallets () {
    let cursor = await Schema.Wallet.find();
    cursor.forEach(element =>{
        mapWallets.set(element.publicKey.toLowerCase(), element.observed);
    });
}

function validateTransaction(walletFrom, walletTo) {
    return mapWallets.get(walletFrom.toLowerCase()) || mapWallets.get(walletTo.toLowerCase());
}

module.exports = { validateTransaction, fillMapWallets }
import { CoinFullInfo, CoinGeckoClient } from "coingecko-api-v3";
import fs from 'fs'
import path from "path";

export function currencySaver() {
    setInterval(function () {
        let currency = [];
        Promise.all(
            [
                getCurrency("celo"),
                getCurrency("celo-dollar"),
                getCurrency("celo-euro"),
                getCurrency("ubeswap"),
                getCurrency("moola-market"),
                getCurrency("mobius"),
                getCurrency("poofcash"),
            ]).then(w => {
                w.map(d => {
                    let data = {
                        name: d.name,
                        price: d.market_data.current_price!['usd'],
                        percent_24: d.market_data.price_change_percentage_24h_in_currency!['usd']
                    }
                    currency.push(data)
                })
                fs.writeFileSync(path.join(__dirname, "..", "..", "currency.txt"), JSON.stringify(currency))

            }).catch(e => console.error(e))
    }, 600000)
    const getCurrency = (id: string): Promise<CoinFullInfo> => {
        const CoinGecko = new CoinGeckoClient();

        return new Promise(async (resolve, reject) => {
            CoinGecko.coinId({ id: id }).then(w => resolve(w)).catch(e => reject(e))
        })
    }
}

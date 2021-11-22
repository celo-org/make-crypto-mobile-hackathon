import Saldo from "../models/Saldo";
import axios from "axios";

import { getToken } from "./authChecker";

export const getSaldo = async (req, res) => {

    const user = getToken(req)

    const { CUSD, MCO2 } = await Saldo.findOne({ cpf: user.cpf })

    let usdtPrice;
    let mco2Price;
    await axios.get(`https://api.coinsamba.com/v0/index?base=USDT&quote=BRL`)
        .then((axiosResponse) => {
            usdtPrice = axiosResponse.data.close
        });

    await axios.get(`https://www.mercadobitcoin.net/api/MCO2/ticker`)
        .then((axiosResponse) => {
            mco2Price = axiosResponse.data.ticker.last
        });

    console.log(CUSD, MCO2, usdtPrice, mco2Price)


    const body = {
        CUSD,
        MCO2,
        totalinbrl: (CUSD * usdtPrice) + (MCO2 * mco2Price),
    }
    return res.status(200).json(body)
}

export const updateSaldo = async (currency, value, cpf) => {
    if (currency != 'CUSD' && currency != 'MCO2') throw new Error('Moeda inválida')

    const saldoAnterior = await Saldo.findOne({ cpf }); // objeto contendo cpf, brl, cusd, mco2
    let novoSaldo = saldoAnterior[currency] + Number(value)
    novoSaldo = parseFloat(novoSaldo.toFixed(8)) // Deve ter 8 casas decimais
    await Saldo.updateOne({ cpf }, { $set: { [currency]: novoSaldo } })

    return novoSaldo
}

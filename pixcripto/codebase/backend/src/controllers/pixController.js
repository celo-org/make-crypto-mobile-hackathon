import { PixSchema } from "../schemas/pixSchema";
import User from "../models/User";
import Saldo from "../models/Saldo";
import Transaction from "../models/Transaction";
import axios from "axios";
import { updateSaldo } from "./saldoController";

export const pix = async (req, res) => {
    // Deve receber amount e cpf
    try {
        await PixSchema.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    // Deve verificar a moeda de compra automática
    const { moeda } = await User.findOne({ cpf: req.body.cpf })
    if (moeda == 'CUSD' || moeda == undefined) {
        // Consome API
        axios.get(`https://api.coinsamba.com/v0/bestPrice?refference=quote&side=buy&amount=${req.body.amount}&base=USDT&quote=BRL`)
            .then(async (axiosResponse) => {
                const base = axiosResponse.data[0].totalBase.toFixed(2)
                // Amount é a quantidade comprada em BRL
                // Base é a quantidade comprada na moeda
                await Transaction.create({
                    moeda: 'CUSD',
                    amount: req.body.amount,
                    base: base,
                    cpf: req.body.cpf,
                    date: Date.now()
                });

                const novoSaldo = await updateSaldo('CUSD', base, req.body.cpf)

                const body = {
                    message: 'Moedas CUSD compradas com sucesso',
                    buy: req.body.amount,
                    quantity: base,
                    balance: novoSaldo
                }

                return res.status(200).json(body)
            })
            .catch((err) => res.status(500).json({ message: err.message }))
    }
    if (moeda == 'MCO2') {
        // Consome API
        axios.get(`https://www.mercadobitcoin.net/api/MCO2/ticker`)
            .then(async (axiosResponse) => {
                const price = axiosResponse.data.ticker.last
                const base = req.body.amount / price
                await Transaction.create({
                    moeda: 'MCO2',
                    amount: req.body.amount,
                    base: base,
                    cpf: req.body.cpf,
                    date: Date.now()
                });

                const novoSaldo = await updateSaldo('MCO2', base, req.body.cpf)

                const body = {
                    message: 'Moedas MCO2 compradas com sucesso',
                    buy: req.body.amount,
                    quantity: base,
                    balance: novoSaldo
                }

                return res.status(200).json(body)
            })
            .catch((err) => res.status(500).json({ message: err.message }))
    }
}
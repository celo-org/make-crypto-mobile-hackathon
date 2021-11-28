import { config } from 'dotenv'
config()
import { EthersProvider } from "../../celo/EthersProvider"
import { NativeTokens } from "../../celo/SignTransaction"
import { MoolaClient } from "."

describe("Moola", () => {
    test('Process balances', async () => {
        const ethersProvider = new EthersProvider('https://alfajores-forno.celo-testnet.org')
        const moola = new MoolaClient({
            addressProvider:    
            //'0x6EAE47ccEFF3c3Ac94971704ccd25C7820121483' // V1
            '0xb3072f5F0d5e8B9036aEC29F37baB70E86EA0018' // V2
        }, ethersProvider)
        
        const wallet = await ethersProvider.walletFromPrivateKey(process.env.PRIVATE_KEY)
        const first = await moola.processBalances(0.99, wallet, NativeTokens.cEUR)
        const second = await moola.processBalances(0.5, wallet, NativeTokens.cEUR)
        const third = await moola.processBalances(0.01, wallet, NativeTokens.cEUR)
    })
})


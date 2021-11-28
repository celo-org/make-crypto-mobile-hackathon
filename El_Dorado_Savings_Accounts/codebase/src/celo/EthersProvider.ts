import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { IChainProvider } from '../IChainProvider';
import { NativeTokenId, } from './SignTransaction';
import { CeloContract } from './CeloContracts'
import { AddressRegistry } from './Registry'


export class EthersProvider implements IChainProvider {
    constructor(
        private readonly CELO_NODE_URL: string,
    ) {
        if (!CELO_NODE_URL) throw new Error('CELO_NODE_URL is mandatory')
    }


    public getProvider() {
        return new CeloProvider(this.CELO_NODE_URL)
    }

    public getTokenContractAddress(token: NativeTokenId, wallet: CeloWallet): Promise<string> {
        const registry = new AddressRegistry(wallet)
        if (token == 'cGLD') return registry.addressFor(CeloContract.GoldToken)
        else if (token == 'cUSD') return registry.addressFor(CeloContract.StableToken)
        else if (token == 'cEUR') return registry.addressFor(CeloContract.StableTokenEUR)
        else throw new Error(`Invalid Token ${token}`)
    }

    public walletFromPrivateKey(privateKey: string): CeloWallet {
        const provider = this.getProvider()
        return new CeloWallet(privateKey, provider)
    }
}

type Address = {
    chainId: number,
    chainName: string
    address: string
}
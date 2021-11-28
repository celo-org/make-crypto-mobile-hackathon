import { CeloProvider, CeloWallet } from "@celo-tools/celo-ethers-wrapper";
import { NativeTokenId } from "./celo/SignTransaction";

export interface IChainProvider {
    getTokenContractAddress(token: NativeTokenId, wallet: CeloWallet): Promise<string>
    getProvider(): CeloProvider
    walletFromPrivateKey(privateKey: string): CeloWallet 
}
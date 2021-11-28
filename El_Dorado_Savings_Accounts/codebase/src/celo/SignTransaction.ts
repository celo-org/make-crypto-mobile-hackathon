import { CeloProvider, CeloTransactionRequest, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { BigNumber } from 'ethers'

export async function sendTransaction(provider: CeloProvider, signer: CeloWallet, tx: CeloTransactionRequest, feeEstimate?: FeeEstimate, wait?: boolean) {
    const signedTx = await signTransaction(signer, tx, feeEstimate)
    return sendSignedTransaction(provider, signedTx, wait)
}

export async function signTransaction(signer: CeloWallet, tx: CeloTransactionRequest, feeEstimate?: FeeEstimate) {

    if (!feeEstimate) {

        throw new Error('Fee estimate required to send tx')
    }

    const { gasPrice, gasLimit, feeTokenAddress } = feeEstimate

    const signedTx = await signer.signTransaction({
        ...tx,
        gasPrice: BigNumber.from(gasPrice),
        gasLimit: BigNumber.from(gasLimit),
        feeCurrency: feeTokenAddress,
    })
    
    return signedTx
}

export async function sendSignedTransaction(provider: CeloProvider, signedTx: string, wait?: boolean) {
    const txResponse = await provider.sendTransaction(signedTx)
    const txReceipt = wait ? await txResponse.wait() : undefined
    return { txResponse, txReceipt }
}

export async function getCurrentNonce(signer: CeloWallet) {
    const nonce = await signer.getTransactionCount('pending')
    return BigNumber.from(nonce).toNumber()
}

export interface GasPrice {
    value: string
    lastUpdated: number
}

export interface FeeEstimate {
    gasPrice: string
    gasLimit: string
    fee?: string // in wei
    feeTokenAddress?: string
}

export type NativeTokenId = "cGLD" | "cUSD" | "cEUR"

export enum NativeTokens {
    CELO = 'cGLD',
    cUSD = 'cUSD',
    cEUR = 'cEUR',
}
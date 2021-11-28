export interface SendMultipleTransaction {
    multipleAddresses: Array<MultipleTransactionData>
    phrase: string
}

export interface MultipleTransactionData {
    toAddress: string,
    amount: string,
    tokenType: string
}
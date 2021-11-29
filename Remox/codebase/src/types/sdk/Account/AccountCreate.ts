export interface AccountCreate {
    userName: string;
    surname: string;
    companyName: string;
    password: string;
}

export interface AccountCreateResponse {
    accountAddress: string;
    encryptedPhrase: string;
    token: string;
    mnemonic: string;
}


export interface CreatePassword{
    phrase: string,
    password: string
}

export interface CreatePasswordResponse{
    accountAddress: string;
    encryptedPhrase: string;
    token: string;
}
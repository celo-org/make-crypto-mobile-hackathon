export interface Signin{
    phrase: string,
    password: string
}

export interface SigninResponse{
    accountAddress: string;
    encryptedPhrase: string;
    token: string;
}
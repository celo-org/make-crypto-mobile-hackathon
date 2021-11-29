import { StableTokens } from "../../coins";

export interface SendStableToken {
    toAddress: string,
    amount: string,
    phrase: string,
    stableTokenType: StableTokens
}

export interface SendStableTokenResponse {

}
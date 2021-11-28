import { CoinsName } from "../../coins";

export interface UpdateMember {
    id: string,
    name: string,
    address: string,
    currency: CoinsName,
    amount: string,
    teamId: string
}

export interface UpdateMemberResponse {
    id: string,
    name: string,
    address: string,
    currency: CoinsName,
    amount: string,
    teamId: string
}
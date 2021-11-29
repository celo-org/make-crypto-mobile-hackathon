import { CoinsName } from '../../coins'

export interface AddMember {
    name: string,
    address: string,
    currency: CoinsName,
    amount: string,
    teamId: string
}

export interface AddMemberResponse {
    id: string,
    name: string,
    address: string,
    amount: string,
    currency: CoinsName,
}
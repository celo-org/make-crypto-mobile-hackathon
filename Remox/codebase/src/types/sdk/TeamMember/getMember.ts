import { CoinsName } from "../../coins";

export interface GetMember{
    take?: number;
    skip?: number;
    sortBy?: string;
}

export interface Member {
    id: string,
    name: string,
    address: string,
    amount: string,
    currency: CoinsName,
    teamId: string,
}

export interface GetMemberResponse{
    members: Member[],
    total: number,
}
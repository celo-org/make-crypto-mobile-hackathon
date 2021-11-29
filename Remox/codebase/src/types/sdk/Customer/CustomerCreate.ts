export interface CustomerCreate{
    name: string;
    address: string;
}

export interface CustomerCreateResponse{
    name: string,
    address: string,
    accountId: string;
}
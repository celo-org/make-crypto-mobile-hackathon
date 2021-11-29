
export interface GetCurrencies{
    data: ICurrencyInternal[]
}

export interface ICurrencyInternal{
    name: string,
    price: number,
    percent_24: number,
}
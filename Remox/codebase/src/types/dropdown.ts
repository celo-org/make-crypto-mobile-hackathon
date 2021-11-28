import { CoinsName, CoinsURL } from "./coins";

export type DropDownItem = DropDownPriceItem | DropDownAddressItem | DropDownOnlyCoin;


interface BaseDropDown {
    name: string,
    className?: string, 
    id?: string,
    value?: CoinsName,
}

interface DropDownPriceItem extends BaseDropDown {
    type: string,
    amount: string,
    address?: string,
    coinUrl?: CoinsURL
}

interface DropDownAddressItem extends BaseDropDown {
    address: string,
    type?: string,
    amount?: string,
    coinUrl?: CoinsURL
}

interface DropDownOnlyCoin extends BaseDropDown {
    address?: string,
    type?: string,
    amount?: string,
    coinUrl: CoinsURL
}


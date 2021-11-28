import LockedCGLD from '../utils/abis/LockedCGLD.json';
import LockedCUSD from '../utils/abis/LockedCUSD.json';
import LockedCEUR from '../utils/abis/LockedCEUR.json';

export enum TokenTicker {
  CELO = 'CELO',
  cUSD = 'cUSD',
  cEUR = 'cEUR',
}

export interface LockedToken {
  contract: any;
  address: string;
}

export const locked_tokens = {
  [TokenTicker.CELO]: {
    contract: LockedCGLD,
    address: LockedCGLD.networks["44787"].address
  },
  [TokenTicker.cUSD]: {
    contract: LockedCUSD,
    address: LockedCUSD.networks["44787"].address
  },
  [TokenTicker.cEUR]: {
    contract: LockedCEUR,
    address: LockedCEUR.networks["44787"].address
  },
};

export interface Token {
  ticker: TokenTicker;
  name: string;
  address: string;
}

export const Celo: Token = {
  ticker: TokenTicker.CELO,
  name: 'Celo',
  address: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
};
export const cUSD: Token = {
  ticker: TokenTicker.cUSD,
  name: 'Celo Dollar',
  address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
};
export const cEUR: Token = {
  ticker: TokenTicker.cEUR,
  name: 'Celo Euro',
  address: '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f',
};

export const tokens: Token[] = [
  Celo,
  cUSD,
  cEUR
];

export enum FiatCurrency {
  USD = 'USD',
  EUR = 'EUR',
}

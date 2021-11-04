export type TokenInfo = {
    address: string;
    name: string;
    symbol: string;
    chainId: number;
    decimals: number;
    logoURI: string;
}

export type PoolInfo = {
  index: number
  stakingToken: string
  poolAddress: string
  weight: number
  nextPeriod: number
}

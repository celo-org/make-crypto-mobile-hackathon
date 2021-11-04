# ubelib

Sort-of-library for aggregating on-chain data from Ubeswap and providing (hopefully useful)
interfaces for interacting with different types of contracts. Note that this is all incredibly sloppy,
apologies in advance!!

## Installing

```
yarn
```

## Building

```
yarn build
```

## Running

```
yarn start
```

This library includes an `index.ts` file that currently includes a small script that runs through some
actions on Ubeswap.

First, fill in your Alfajores address and private key near the top of the `index.ts` file.

You should have a small amount of CELO (at least .1 + gas) in the provided Alfajores address. The script will
basically perform the following:

* Collect all the on-chain data that exists about tokens, pairs, and pools/farms in Alfajores Ubeswap
* Get the `mcUSD-CELO` pool
* Swap .1 `CELO` for `mcUSD` using the liquidity pool
* Calucalute the maximum amount of liquidity possible to provide given our current balance of
  `CELO`/`mcUSD`
* Deposit liquidity into the `mCUSD-CELO` pool and receive corresponding `UBE LP` tokens
* Stake all available `UBE LP` tokens into the associated farm
* Claim available rewards from the farm

If you browse to https://alfajores-blockscout.celo-testnet.org/address/{YOUR_ALFAJORES_ADDRESS}, you can
see the actual transactions taking place on your account on Alfajores.

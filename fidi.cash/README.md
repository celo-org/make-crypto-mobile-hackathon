# FIDI.CASH

FIDI.CASH aims to simplify cashing out crypto for fiat money (and potentially vice versa). Trustful behavior of market participants (bona fide) is incentivized by overcollateralized deals protocol.

Deployed on Celo Alfajores Test Network.

## Make Crypto Mobile Hackathon

Track: **Cash In Cash Out Track**

Team: FIDI.CASH

Region: Russia

Teammate: Alex Bakoushin

## Video

Click to play:

[<img src="https://img.youtube.com/vi/RDNR6UcWYxw/maxresdefault.jpg" width="50%">](https://youtu.be/RDNR6UcWYxw)

## Live Demo (Alfajores)

https://alpha-1.fidi.cash

Core contract: [0x222011f0E952F8b415Be4F1ccd74ABdaaD25e942](https://alfajores-blockscout.celo-testnet.org/address/0x222011f0E952F8b415Be4F1ccd74ABdaaD25e942)

## Motivation

While getting paid in crypto is great, there is still a big share of goods and services which have to be paid in cash. We have to have a ramp between the crypto and traditional fiat world. FIDI.CASH aims to solve that very problem by creating a simple, but robust protocol for exchanging off-chain goods, fiat money included.

### What it does

In the first iteration created during this hackathon FIDI.CASH aims to simplify cashing out crypto for fiat money (and potentially vice versa). Trustful behavior of market participants (bona fide) is incentivized by overcollateralized deals protocol.

### How it works

Here is how it works: any party must provide collateral x2 more than the amount of deal in progress. Thus both parties have some extent to trust in the good (bona fide) behavior of each other.

The rest is just P2P exchange in its core.

### Real-world scenario

Imagine a person who gets paid in Celo Dollar for their microwork. Despite the payments in crypto on the Celo Blockchain being fast and accessible, there are still many cases when people must pay with fiat money.

This person could use FIDI.CASH to exchange their Celo Dollars for fiat money – by finding compelling offers of the people willing to exchange their fiat for Celo Dollars and making deal with them. All that in a fully decentralized way with no central authority to lay on while making the exchange.

While executing a deal, our person must provide collateral 2 times more than a deal as proof that they are committed to executing the deal. This is quite unusual but we believe it would make sense for periodical cash-outs (and cash-ins as well) since after the deal is closed the collateral is returned back immediately in full.

## Project structure

```
./contracts  Core smart contracts
./frontend   React frontend
./server     Backend server
```

## Future Plans

- [ ] Extensively test protocol and UI
- [ ] Add more stablecoins (not only on Celo)

## Author

Alex Bakoushin

## License

MIT

# CELO Make Crypto Mobile Hackathon 2021

## Crypto Recycling Machine Overview
Crypto Recycling Machine is a project developed for Celo Make Crypto Mobile Hackathon. It gives an opportunity to recycle different kinds of bottles and get paid in crypto currency.

The project consists of 2 units:
* ### Recycling Machine Emulator

A service running on Raspberry Pi which uses a breadboard, some LEDs and buttons to simulate inserting the bottle into the recycling machine. Each button on the breadboard represents an inserting different kind of bottle: Aluminium cans, glass bottles, tetra pak, or PET.

* ### Recycling Machine server and client.

Used for user interaction with the machine and interaction between the recycling machine and smart contracts on Celo network. The Recycling Machine supports payments on Celo Alfajores network in CELO tokens or in cUSD tokens. There is also an option to donate the money.


## Technologies
* React
* Node.js
* Solidity
* Docker

## Project developed with
* [Celo](https://docs.celo.org/developer-guide/overview)
* [Remix IDE](https://remix.ethereum.org/)


## Quick start

## Prerequisites
* [Node 12+](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/)
* [Metamask wallet](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) - wallet should have [Celo Alfajores Testnet](https://docs.celo.org/developer-resources/testnet-wallet) network configured
* Raspberry Pi, a breadboard, LEDs, buttons (if not available, the HTTP request can be sent directly to the backend service, e.g. with Postman)


## Initial Setup

- Copy the source of /make-crypto-mobile-hackathon/recycling_machine/contracts/RecyclingMachine.sol into Remix IDE
- Using Remix IDE, compile and deploy RecyclingMachineFactory and PackagePrices contracts
- Usine Remix IDE, create a new RecyclingMachine contract from the RecyclingMachineFactory instance (call CreateRecyclingMachine() function)
- Rename /make-crypto-mobile-hackathon/recycling_machine/server/.env.example to .env and provide your wallet PRIVATE_KEY, contracts' addresses and other required fields
- run
```bash
docker-compose build

```
- Go back to root project folder and run
```bash
docker-compose build
```

## How to run
```bash
docker-compose up
```

## Demo
https://www.youtube.com/watch?v=OSghLNtftY0

# Token Creator

## Description

The TokenCreater provides a frontend to seamlessly issue and manage tokens. 
By this it enables **everyone**, indepent of technical skills, to create, mint,
manage, monitor and destroy tokens. It abtracts the technical details away
and offers a simple dashboard with easy to use forms.

TokenCreator solidity functionalities to create new smart contracts with another
smart contracts. Every user **owns** the smart contract of every token created by 
her. TokenCreator offers one type of token right now, the *SimpleToken*. The 
roadmap includes adding more tokens and finally allow users to experiment with
different attributes and parametes. The ultimate goal is to foster financial
inclusion by supporting community and complementary currencies.

TokenCreater is still in the MVP-phase, tokens can be issued on different 
testnets. TokenCreator is heavily inspired by [Celo's Make Crypto Mobile 
Hackathon](https://mobiledefi.devpost.com/) and aims to be a recognized 
submission and optimally gain funding for a short runway of a few weeks to test 
the market hypothesis (i.e. test is demand for token creators is high enough
for a business case).

## Team members
Valentin Seehausen, fullstack developer

## Hackathon track
Infrastructure (or DeFi)

## Starter Kit

Based on [Hardhat Vue.js Starter Template](https://github.com/remote-gildor/hardhat-web3-vue-starter).
A starter template for Ethereum dApps that uses the following tools:
## install

Run installations in both root and in the frontend folder:

```bash
yarn
cd frontend && yarn
```

## Run Vue app

```bash
cd frontend && yarn serve
```

## Tests

### Solidity/Hardhat

```bash
npx hardhat test
```

## Deployment to Celo alfajores testnet

```bash
npx hardhat run scripts/deploy.js --network alfajores
```

## Deployment to local hardhat network

```bash
npx run node
# open a new terminal and run:
npx hardhat run scripts/deploy.js --network localhost
```

## Verify on Etherscan

```bash
npx hardhat --network mainnet etherscan-verify --api-key <apikey>
```

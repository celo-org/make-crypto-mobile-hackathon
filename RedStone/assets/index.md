![RedStone logo](https://redstone.finance/assets/img/redstone-logo-full.svg)

# RedStone - customizable oracle on Celo

## Inspiration

The origins of the idea come straight from developers' need - we took part in various blockchain hackathons, where we saw many interesting ideas being killed early stage, due to a lack of available specific type of data on chain. That's what made us start working on RedStone!

## What it does

RedStone delivers customisable data feeds by using on-demand data providing model and on-chain signature verification. We support long-tail tokens, real world data, soon NFT related information and we're here to serve diverse needs in regards to Oracles datafeeds. You need data about Interest rates, indexes or stocks? With our scalable infrastructure we're able to bring it on chain.

## How we built it

We source data feeds from our providers and then store it cost-efficiently on Arweave blockchain (Arweave blockchain has been designed to store large sets of data). When a user in a Celo dApp wants to use our data, it is automatically fetched from the arweave cache and appended to the transaction data. Then our smart contract verifies if the data signature is valid and created by trusted data provider.

This approach is much more scalable and cost-efficient than the current oracles' approach of recurring data pushing to blockchains.

This cost-efficient approach allows us to bring different kinds of data to Celo, to enable new ideas targeted for undeserved markets, e.g. using real world data about crops that is relevant for developing markets.

## Challenges we ran into

- Fetching data from different API with different interfaces. Luckily we've found ccxt library, which unifies interface for more than 100 of the most popular cryptocurrency exchange APIs
- Fetching data from DEXes. We've integrated with theGraph to obtain the data from DEXes, such as Uniswap and Sushiswap
- Integration with Celo. We've already had an oracle tool for ethers.js library. But the ethers.js was not supported on Celo right away. We've managed to connect it using `@celo-tools/celo-ethers-wrapper`. More info [here](https://github.com/redstone-finance/komodo-celo)

## Accomplishments that we're proud of

- We've managed to connect more than 50 data sources. [Link to all sources](https://app.redstone.finance/#/app/sources)
- We managed to get pre-seed round in April 2021, now we're closing the Seed round
- We managed to integrate price feeds for over 1000 asset from crypto and real world, divided into 10 categories. [Link to all price feeds](https://app.redstone.finance/#/app/tokens)
- To show possibilities of RedStone Oracles, we built the first implementation working on Celo - Synthetic commodities platform. Users can use CELO and cUSD as collateral to min synthetic Corn / Wheat / commodities tokens. [Link to the app](https://alfajores-komodo.redstone.finance/#/commodities), [link to the github repo](https://github.com/redstone-finance/komodo-celo)

## What we learned
### Collaboration with other projects
Our approach from the very beginning was deliver what users would use and benefit from. At the hackathon we learned to talk to other projects, frequently update with them on progress and if any new requirements from community side raised.

### New technical knowledge
We've learnt how to integrate with Celo blockchain, how to connect `ethers.js` library and we've also learn the basic security considerations regarding providing entropy data on-chain. We will probably integrate with https://twitter.com/cybertime_eth (NFT marketplace on Celo) and help them to improve pseudo-random generation in smart contracts.

## What's next for RedStone Oracle on Celo

Our goal is to become the first choice Oracle for all projects based on Celo. To achieve that we'll keep adding new data types that builders will request. At the same time, we want to increase exposure and presence on Celo market significantly.

# Your Recommedation (Celo)

Help end all disagreements with a simple click of a button!

## Why?
### *Other than Blockchain is awesome???*
Do you get on Reddit and Quora and all you see is fan wars... right 😅, I mean, If you are so passionate about something, you might as well make money from it... **😋**

# What It Does???
`Your Recommendation` gives you a chance to seek out recommendations on your picks from the celo community. Your picks are displayed for voting and best option wins the vote.

The best part is, one lucky winner from the voters keeps the entire bag 💰 when the vote limit has been reached.

# How Do You Get on Board???
Simply by joining the celo community. Your passport to vote is simply switching to the [celo network](https://medium.com/defi-for-the-people/how-to-set-up-metamask-with-celo-912d698fcafe)  (*Testnet at the time of this wrting*) or download the Celo-wallet extension on chrome. 

# How we built it???
The app was built with the help of the `React` Library and the [ContractKit SDK](https://docs.celo.org/developer-guide/contractkit). It's currently on the [Alfajores Testnet](https://docs.celo.org/getting-started/alfajores-testnet)

The application is accessible to users with both Celo-wallet extension and on Metamask using the celo Alfajores Network making it **accessible even on mobile phones**

**DO NOT USE THIS APP ON YOUR MAINNET**


### Usage
- Install the CeloExtensionWallet from the google chrome store.
  - Or, connect to the celo network on Metamask, Yes it is metamask accessible. For more info: [Metamask on Celo Network](https://medium.com/defi-for-the-people/how-to-set-up-metamask-with-celo-912d698fcafe)
- For new users, reate a wallet 
- Go to https://celo.org/developers/faucet and get tokens for the alfajores testnet.
- Switch to the alfajores testnet in the CeloExtensionWallet.

---

## Developer tools and useful resources

This section contains information about some of the key tools and resources that will help developers start building applications on Celo.

For a comprehensive list of resources and information, review [Celo Docs.](https://docs.celo.org/)

### QUICK START GUIDES

View the [Developer Code Examples page](https://docs.celo.org/developer-guide/start) to get started using the Celo SDKs with guided coding exercises.

### TOOLS

#### SDKs

-   [ContractKit](https://docs.celo.org/developer-guide/contractkit)
-   Javascript package of Celo blockchain utilities
-   Manage connections to the Celo blockchain, accounts, send transactions, interact with smart contracts, etc.
-   A set of wrappers around the core protocol smart contracts to easily connect with contracts related to governance, validators, on-chain exchange, etc.
-   Includes [web3.js](https://web3js.readthedocs.io/en/v1.2.4/)
-   [Celo Ethers.js Wrapper](https://github.com/celo-tools/celo-ethers-wrapper) (experimental)
-   A minimal wrapper to make [ethers.js](https://docs.ethers.io/v5/) compatible with the Celo network
-   [use-contractkit](https://github.com/celo-tools/use-contractkit)
-   A [Web3Modal](https://web3modal.com/)-like experience that injects ContractKit into your web-based application. Supports a variety of different wallets, including but not limited to Valora, Ledger, Metamask (Celo compatible fork) and any WalletConnect compatible wallets
-   [DappKit](https://docs.celo.org/developer-guide/dappkit)
-   Easily connect to the [Valora](http://valoraapp.com/) wallet with your React Native mobile application
-   Valora manages user account, private keys and transaction signing, so you can focus on building your dapp
-   Learn more and see the code with the [Dappkit truffle box](https://github.com/critesjosh/celo-dappkit)
-   [Python SDK](https://github.com/blaize-tech/celo-sdk-py)
-   [Java SDK](https://github.com/blaize-tech/celo-sdk-java)


#### Infrastructure

-   [Valora](https://valoraapp.com/) provides a clean, intuitive UI where users can send transactions and interact with smart contracts
-   [Forno](https://stackedit.io/developer-guide/forno)
-   Node access service so you can connect your dapp to the Celo blockchain without having to run node infrastructure
-   [ODIS](https://stackedit.io/developer-resources/contractkit/odis.md)
-   Oblivious decentralized identity service
-   Lightweight identity layer that makes it easy to send cryptocurrency to a phone number
-   Blockscout block explorers
-   [Alfajores testnet](http://alfajores-blockscout.celo-testnet.org/) & [mainnet](http://explorer.celo.org/)
-   [Stats.celo.org](http://stats.celo.org/) to check network activity and health


#### Networks

-   [Alfajores Testnet](https://docs.celo.org/getting-started/alfajores-testnet)
-   [Faucet](https://celo.org/developers/faucet) for free testnet CELO and cUSD
-   [Forno](https://docs.celo.org/developer-guide/forno) supports connections to alfajores
-   Requires Alfajores Celo wallet for mobile device testing (please request, support@clabs.co)
-   [Baklava testnet](https://docs.celo.org/getting-started/baklava-testnet) for validators and testing protocol changes


#### Ethereum Tools

-   Similarities between Celo and Ethereum means you can use many of the most popular Ethereum developer tools.
-   Celo supports the EVM, so tools for writing smart contracts in Solidity (or any language that compiles to EVM bytecode) are compatible with Celo
-   ERC20, NFT (ERC721) and other smart contract interface standards are supported, see [Celo for Ethereum Developers](https://docs.celo.org/developer-guide/celo-for-eth-devs)
- [Truffle](https://www.trufflesuite.com/)
- [OpenZeppelin](https://openzeppelin.com/)
- [Remix](https://remix.ethereum.org/)

#### Ongoing projects

-   [Community projects](https://docs.celo.org/developer-guide/celo-dapp-gallery)
-   [Grant recipients](https://celo.org/experience/grants/directory)

#### Web wallets
  -  [celowallet.app](https://celowallet.app/)
  -  [Celo Terminal](https://github.com/zviadm/celoterminal/)


#### Community

-   Join our [Discord](https://chat.celo.org/)
-   [Discourse Forum](https://forum.celo.org/)

Youtube: https://youtu.be/B9Cf504ehgE

Transcript

With the power of blockchain, we have developed an application that has the potential to end all disagreements. Ha ha Okay... may be just some of them.

So..., It's Fry-yay...! and you wanna let loose...! so you decide to net flix and chill, but your friends just can't seem to agree on what to watch and now you are stuck with some dudes arguing over who's the strongest anime character... arrghhh!

Your recommendation was designed to be a platform that allows users from around the world to give their recommedations as a vote on anything with a click of a button. 

Your recommendation aims at settling at least 50 percent of all fan war on Quo ra, Tick Tock and twit tar and other micro blogging sites by the end of 2022! `funny phrase` I mean..., If you are gonna be passionate about something, you might as well make money from it...

The frontend was designed, with the React Library, for efficient rendering of components, with data from the blockchain, making it dynamic and responsive to user input from the web or mobile.

Thanks to the CELLO Network, gas cost, relatively, is cheap and transaction occur quickly. It is accessible, with either a metamask or the celo wallet extension from chrome.

It is a single page website, which provides a straightforward approach, to captivate users attention, with it's colorful interface, well animated loading periods, and a graceful error handling user interface. 

Here is the flow of data, and what the setup looks like. A person who I term as the creator adds a list of picks whom anyone in the celo community (... well except the creator) can vote on. 

The groups voted are sorted on a, first come, first serve basis. That is, when a voting period has ended, the winning voter and picks are displayed here, while the next on the list is highlighted!


And, the best part is, someone gets to keep the bag. A winner is randomly selected, when the votes reach a certain threshold. Only the creator, or a designated watcher, can activate the payout.

Vote authenticity, is guaranteed, since your passport is your celoo wallet, your vote count increases, your winning chance.(it's limited though). it pays, to put one's money where one's mouth is...

Thank you for checking out the project, I'm extremely excited to see, how it is implemented, It was so much fun building this app and learning about the Celo community.
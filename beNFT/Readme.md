# beNFT

This is the repository for beNFT, a solution developed by team 21 at the [Hackathon Defi para o Brasil](https://defiparaobrasil.com.br), which challenged us to think of solutions within the blockchain universe.

beNFT offers a dApp that connects NGOs and philanthropic organizations with people around the world who want to contribute. In beNFT, organizations can sell collections of NFTs to interested contributors as a means of fundraising.

For organizations, we offer an NFT production service, in the case of lack of time and resources to allocate towards this. They can also consult a dedicated dashboard to keep up with their campaigns and funds raised.

beNFT is built entirely on the Celo blockchain, allowing for fast transactions directly from your phone. Contributors that buy the NFTs will be helping a good cause AND getting an investment souvenir that can be used to spread awareness for the cause and influence more people to contribute. Furthermore, every time the NFT is resold, the organization gets a percentage over the resale price.

beNFT, marketing NFTs for good causes!

[![thumb](https://user-images.githubusercontent.com/40076894/142791772-a02345f1-9967-434c-93d4-edc6f3204dd8.png)](https://www.youtube.com/watch?v=X1cENvRWW-0)

# Technologies used in coding

- [Celo platform](https://celo.org)
- Multiple blockchain related tools, such as [Hardhat](https://hardhat.org) and [](http://hardhat.org)[OpenZeppelin](https://openzeppelin.com)
- [MetaMask](http://metamask.io) wallet
- Front-end frameworks such as [React](https://reactjs.org), and [Next.js](https://nextjs.org)
- [Node.js](http://nodejs.org) stack using [Yarn](https://yarnpkg.com) for dependencies management

# Celo integration

We developed two smart-contracts using the [Solidity](https://docs.soliditylang.org/en/v0.8.10/) language which were deployed to the [Celo Alfajores testnet](https://alfajores-blockscout.celo-testnet.org/):

- NFT minter contract: [0x140D73fBFbCcA8dfb841c6fA844f72Abb6845D3b](https://alfajores-blockscout.celo-testnet.org/address/0x140D73fBFbCcA8dfb841c6fA844f72Abb6845D3b/transactions)
- NFT marketplace contract: [0xFD96345185bd7cA6c66066050A5e444D56E844B9](https://alfajores-blockscout.celo-testnet.org/address/0xFD96345185bd7cA6c66066050A5e444D56E844B9/transactions)

Our front-end is able to interact with our custom contracts using [ContractKit](https://docs.celo.org/developer-guide/contractkit) and [use-contractkit](https://github.com/celo-org/use-contractkit)

Integration tests were performed using accounts on MetaMask with test funds available from [Celo Faucet](https://celo.org/developers/faucet)

# Design tools

- [Figma](https://www.figma.com) - Prototyping
- [VideoScribe](https://www.videoscribe.co/en) - Video editor
- [Notion](https://www.notion.so) - Project documentation and management of activities
- [Keynote](https://www.apple.com/keynote/) - Slide creation

# Links with prototypes

- App prototype - [Figma](https://www.figma.com/proto/7D72t5LCZH8Ma0o6bVGkbx/beNFT?page-id=0%3A1&node-id=105%3A2907&viewport=241%2C48%2C0.08&scaling=scale-down&starting-point-node-id=105%3A2907&show-proto-sidebar=1)
- Video demo - [Youtube](https://www.youtube.com/watch?v=X1cENvRWW-0)

# App demo

An early beta version of beNFT is available for tests on [https://tiny-snail-2.loca.lt](https://tiny-snail-2.loca.lt/). For best experience, you should:

- Use [Google Chrome](https://www.google.com/chrome/)
- Have an account on [MetaMask](http://metamask.io)
- Set up the Celo Alfajores Network on MetaMask (check needed info in this [tutorial](https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup))
- Connect the dApp to your Wallet
- Buy some NFTs!

# About the team

**Andressa Valengo | Technology [(LinkedIn)](https://www.linkedin.com/in/valengo/) [(GitHub)](https://github.com/valengo)**

Bioinformatician and app developer, @valengo loves to develop solutions for real problems and games. Besides her love for coding and genomics, she loves to draw and work as a designer too. As of this hackathon, she is also a decentralized developer!

**Eduarda Linhares Mello | Business [(LinkedIn)](https://www.linkedin.com/in/dudamello/) [(GitHub)](https://github.com/dudamello)**

Involved in the technology world, she always seeks to contribute to projects that have a positive impact on society. With a range of knowledge in the areas of programming, design and business, she helps to align users needs with clever solutions.

**Isabela Castro | Design [(LinkedIn)](https://www.linkedin.com/in/isa-castro/) [(Website)](https://isacastro.me)**

Isa is a designer and 2D artist who has been working with digital games for about 7 years. She likes to use creativity to make visual solutions and intuitive designs.

**Kevin Katzer | Technology [(LinkedIn)](https://www.linkedin.com/in/kevin-katzer/) [(GitHub)](https://github.com/kkatzer)**

iOS Developer by heart, loves to sing and aims to continuously grow as a programmer and as a person through code and music.

**Vinícius Binder | Business [(LinkedIn)](https://www.linkedin.com/in/viniciusbinder/) [(GitHub)](https://github.com/viniciusbinder)**

Soon to be grad Software Engineer who loves to design and code impactful and reliable experiences.

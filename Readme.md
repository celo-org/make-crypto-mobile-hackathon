
<p align="left">
<a href="https://docs.celo.org/" target="_blank">
<img src="https://i.imgur.com/NLrP79B.png" width="50" alt="Celo Logo">
</a>
</p>
)


# Celo AI (Artificial Intelligence) Discord Bot
![](https://i.imgur.com/vQrAXOC.png)






# Use Cases 
##### UC1
> As a **user** I want to **use Discord** in my **mobile phone** so that I can **create my first Web3 account** and get  Celo Tokens.

##### UC2
> As a **user** I want to **use Discord** in my **mobile phone** so I can check my balance, query the Celo price and send/receive tokens. 
 
 ##### UC3
> As a **user** I want to **use Discord** in my **mobile phone** with **no ! commands or specific commands** so I can check my balance, query the CeloPrice and sendTokens.
> 
## Inspiration

>Today one of the main communication channels in the crypto ecosystem is Discord. AI can easy onboard users to Celo Blockchain Ecosystem in this context.


## What it does

>Today one of the main communication channels in the crypto ecosystem is Discord. The use of this bot would allow users to easily obtain CELO tokens as well as create their wallet or use an existing one. This bot uses AI, Discord.js and Web3 libraries.

## How we built it

>This bot uses AI, Discord.js and Web3 libraries.

## Challenges we ran into

>Integration this libraries, best Ux and GUI guidelines for mobile interaction.
## Accomplishments that we're proud of

>Integrate different tecnologies and  approach Ux.

## What we learned

>A movile first approach using Discord with Celo APIs. 

# SnapShots



| Command    | Bot Response 
| -------- | -------- | 
| *please check my balance*     | ![](https://i.imgur.com/JBdzD8X.png)| 
| *!price*     | ![](https://i.imgur.com/HP7GqJL.png)| 
| *create account*     | ![](https://i.imgur.com/aarUD9E.png)| 
| *send tokens*     | ![](https://i.imgur.com/FSToWTL.png)| 
| *help*     | ![](https://i.imgur.com/aKCFIjp.png))| 


# Dependencies


```json=
   "dependencies": {
    "@celo/contractkit": "^1.3.3",
    "bip39": "^3.0.4",
    "discord.js": "^12.5.1",
    "dotenv": "^8.2.0",
    "ethers": "^5.5.1",
    "intelligo": "^1.3.0",
    "qrcode": "^1.4.4",
    "typescript": "^4.1.3",
    "web3": "^1.3.0"
  },
  "devDependencies": {
    "@types/node": "^14.14.22"
  }

```

## What's next for Celo AI DiscordBot

>Building, building, sharing and teaching.



# Video 


# AI Training 

```javascript=
`const Bot = require("intelligo");


```
```tiddlywiki=
  { input: "account balance", output: "balance" },
  { input: "my balance", output: "balance" },
  { input: "please create my balance", output: "balance" },
  { input: "create account", output: "create" },
  { input: "create mnemonic", output: "create" },
  { input: "price celo", output: "price" },
  { input: "celo USD", output: "price" },
  { input: "send tokens", output: "qr" },
  { input: "send me some tokens", output: "qr" },
  { input: "get my tokens", output: "qr" },
  { input: "get tokens", output: "qr" },
  { input: "social", output: "help" },
  { input: "social media", output: "help" },
  { input: "celo", output: "help" },
  { input: "help", output: "help" },
```










# Build & Run ![](https://i.imgur.com/rgIBNX3.png)

```
npm install
npm run compile
npm run start
```

# BOT @ Discord
 ![](https://i.imgur.com/zv6Yxrt.png)



![](https://i.imgur.com/vQrAXOC.png)



# Repo

>https://github.com/aadorian/make-crypto-mobile-hackathon.git

## Contact

Discord @aleadorjan


>

## References

https://celo.org/developers
https://valoraapp.com
https://github.com/celo-org/make-crypto-mobile-hackathon


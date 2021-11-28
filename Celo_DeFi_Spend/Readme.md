# ⚡ Celo DeFi Spend ☔ ⚡

Unleash utility for CELO in wallets that people already use & love by enabling them to instantly spend CELO with mobile on local products/services like Mobile Money, Airtime, Gift Cards & Bills

## Celo DeFi Spend

### Team Chimoney ☔

#### Hackathon Track

- Cash In Cash Out Track
- DeFi Track
- Infrastructure and Web3 Track
- Interoperability Track

##### Global + Africa

##### Team Members

- Uchi Uchibeke, Strategy and Engineering

## Project Description

Celo DeFi Spend enables direct and instant spending of cUSD on local products and services in the wallets that users already use and love. People are able to spend on Airtime in 13 countries, Mobile Money in 5 countries, 300+ Gift cards and counting!

### Inspiration

On Celo, people can _Earn_, and _Send_ CELO and other ecosystem tokens. However, there is an opportunity to make it easier to spend Celo, cUSD, and cEUR on products and services regardless of the country you are from and directly on CELO wallets like Valora app without cashing out to the bank.

This is why we built Celo Defi Spend.

The Earn program on Valora app helps increase adoption and also engagement for Celo and the ecosystem. And the existing integration for spending on Valora and other apps is a great start for enabling utility.

However, more than just enabling utility for Celo, the Defi Spend unleashes utility. Read on to see how!

### Summary

This project will unleash a new utility for Celo, cUSD, and cEUR on the Celo Wallet app and provides an easy way and for wallets like Valora to offer CELO to 300+ Gift Cards, Mobile Money in 13 countries, Airtime in 15 countries, and many upcoming products and services that is sure to delight users, keep them engaged in the app and unlock utility even in mobile offline contexts.

A user on the app will browse a list of products and services and buy it for themselves or send it to one or a thousand users with the click of a button right without leaving the Celo Wallet app.

For individuals looking to access Gift cards and other local assets like mobile money, they can directly access it in Celo Wallet app without paying bank fees or going to a bank account.
![Spend Celo](https://res.cloudinary.com/africahacks/image/upload/v1638102700/chimoney/celo2_tojw9l.png)

Futures

- As a wallet user, I can buy and send Mobile money, Airtime, 300+ Gift cards and more from my Celo app or wallet
- As a Wallet developer, I can enable users of my app to Spend their wallet balance on supported products and services like Mobile money, Airtime, 300+ Gift cards with a simple embed or API integration
- As a DeFi platform on Celo, I can close the loop for my users and community be enabling folks to spend their earnings right inside my DeFi platform thus dirving my engagement and utility

### How it works

#### Supported products and services

- **Gift Cards:** Global
- **Airtime:** Cameroon, Côte d’Ivoire, Ethiopia, Ghana, Kenya, Malawi, Nigeria, Rwanda, Senegal, South Africa, Tanzania, Uganda, and Zambia
- **Mobile Money:** Kenya, Ghana and Uganda

#### Public example integrations and URLs

**Celo Web Wallet**

- Open Celo Web Wallet at https://celo-defi.chimoney.io
- Click on _More_ and select the _Spend_ option
- An embedded purchase experience is presented to the user in a modal (aligning with the existing Celo Web Wallet design)
- Browse offered products and services
- Select a product/Service
- Enter the amount to spend on the product or service
- Preview and transaction
- Confirm the transaction and sign with Celo Web Wallet
- After payment is confirmed, receive the product instantly to the spending method specified

**Pay with Valora (WIP)**

- On mobile go to http://chispend.com/?cSContext=valora&xAppStyle=light _(will not work on Desktop)_
- Browse offered products and services
- Select a product/Service
- Enter the amount to spend on the product or service
- Preview and transaction
- Click pay and you will be redirected to [Valora](https://valoraapp.com/) via a deeplink
- Confirm payment\* (WIP)
- Deliver product/service\* (WIP)

  _\* to deliver the product and complete purchase, we need to be able to redirect to http://chispend.com//process/celo/confirm?txid=CELO_TRANSACTION_ID from Valora_

<img src="https://raw.githubusercontent.com/Chimoney/make-crypto-mobile-hackathon/master/Celo_DeFi_Spend/assets/Defi%20spend%20mobile/celo1.png" width="30%"></img>
<img src="https://raw.githubusercontent.com/Chimoney/make-crypto-mobile-hackathon/master/Celo_DeFi_Spend/assets/Defi%20spend%20mobile/celo2.png" width="30%"></img>
<img src="https://raw.githubusercontent.com/Chimoney/make-crypto-mobile-hackathon/master/Celo_DeFi_Spend/assets/Defi%20spend%20mobile/celo3.png" width="30%"></img>
<img src="https://raw.githubusercontent.com/Chimoney/make-crypto-mobile-hackathon/master/Celo_DeFi_Spend/assets/Defi%20spend%20mobile/celo4.png" width="30%"></img>
<img src="https://raw.githubusercontent.com/Chimoney/make-crypto-mobile-hackathon/master/Celo_DeFi_Spend/assets/Defi%20spend%20mobile/celo5.png" width="30%"></img>
<img src="https://raw.githubusercontent.com/Chimoney/make-crypto-mobile-hackathon/master/Celo_DeFi_Spend/assets/Defi%20spend%20mobile/celo6.png" width="30%"></img>

### How we built it

For the Hackathon, I [extended the Celo Web Wallet](https://github.com/Chimoney/celo-web-wallet) to include an additional feature in the same place as the other bottoms.

Then, I was able to generate a request to buy a product or service using the [Chimoney](https://chimoney.io/)'s API and have the user pay for the transaction.

The product service is then delivered to the user.

Next, I started working on enabling Valora users to directly spend on products and services as I noticed an opportunity to provide a better exchange rate when paying for African and Asian Airtime and to also support Mobile Money which is huge in Africa and requires to internet to work.

So Imagine:

- Celo to Mobile Money to anyone even without Internet connection in the remotest part of the world
- Celo to Airtime to support community events without having to Cash out to banks

#### SDKs used

- @celo/contractkit
- web3
- crypto
- forno.celo.org/ws
- valoraapp deeplinks

### Integration for your Web3 Celo project

**In-platform Embed**

- Deposit Celo to get access to a cloud of Gift Cards, Mobile Money, Airtime, and more without dealing with all the partners individually
- Use the ChiSpend embed as done in this Hackathon project, https://celo-defi.chimoney.io
- Enable users to pay in your wallet
- Convert payment to user balance you maintain on Chimoney
- Deliver the product/service the user paid for

**API Integration**

- Deposit Celo to get access to a cloud of Gift Cards, Mobile Money, Airtime, and more without dealing with all the partners individually
- Do a full API integration to enable users spend their CELO on your wallet or DApp without leaving the App

#### Presentation

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/R2gOzIvll3o/0.jpg)](https://youtu.be/R2gOzIvll3o)

#### Next Steps

- Work with other wallet providers to integrate via a simple embed or a deeper API integration to enable users to spend CELO on any Celo wallet
- List NFTs and other digital goods and enable people to pay for the NFT directly with their wallet balance
- Support [Deeplinks](https://github.com/valora-inc/wallet/blob/main/packages/mobile/docs/deeplinks.md) so that other wallets like Valora can enable users to buy any supported product and redirect to a confirmation page

#### License

This repository includes an [unlicensed](http://unlicense.org/) statement though you may want to [choose a different license](https://choosealicense.com/).

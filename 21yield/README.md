# 21yield pitch

yEUR is a new interest-bearing (from cash and carry trade) euro stablecoin to fund microcredit on chain through Celo network

# 21yield Infrastructure

- App Flutter fullstack (with AWS AppSync and DynamoDB)
- Django API to set up positions on FTX
- SmartContract to interact with Celo TestNet : ERC20 stablecoin, Oracle to inform contract when payment is due
- Bank API to automatically match Ref Bank SEPA to declare app user data

# Team members & roles

### Camille KREJCI
Graduate from ESSEC, one of the top business schools in Europe, Camille has 10 year experience creating startups, notably 7 year in the Philippines with Philsmile (edtech, fintech) and did consultancy for Asian Development Bank on credit modeling for student loans in the Philippines.

### Mael KREJCI
Mael has extensive engineering background with coding/AI experience (Python/Flutter and now getting into Solidity), together with several operational and managerial experiences (as consultant for large groups and CEO of a startup). After developing trading algorithms on tennis players’ betting back in 2015, he fell into the crypto rabbit hole back in 2016.

### Philip HATHAWAY
Philip is a product designer with over 15 years’ experience in creating digital and physical products. HIs work portfolio spans from physical to digital products, employing product design and UX skills to bring delightful user experiences to life. Being part of the 21yield team, Philip is delighted to be working towards Celo’s and 21yield’s goal to build a financial system that creates the conditions for prosperity—for everyone.


## Inspiration
Meet Monique. She is 87 and sold her house that was too large to maintain at her age and moved to a new apartment that she is renting more centrally located in Paris. 

When the sale was concluded, she obtained a substantial amount of cash. All the investments offered by the bank were at 0,5%-1% per year, unsustainable to compensate for the rent that she is now paying. 

The lack of return offered to millions of Europeans is parking trillions of euros in low yield high-cost account that is preparing a future of slow growth and unsustainable retirement. 

I lived in the Philippines for 7 years and I was used to pay 20-45% p.a. interest on credit. The idea is to bridge that gap thanks to Celo. 

## What it does
21yield is on a mission to change that, building a bonified onramp to Celo network in Europe, creating an interest-bearing euro-based stablecoin yEUR, convertible into cEUR. This cEUR serves to fund #DeFiforthePeople and #microcredit on chain.

## How we built it
Our app is built with Flutter and will be available on Android and iOS, through Android first given iOS validation process. 

Investor wires euros with a SEPA transfer. If you have a bank account in Europe, this means you already successfully passed “Know Your Customer” regulations. Hence there is no need to ask you again for the same information (such as your passport).

The amount invested is then used to buy bitcoin (spot) and short future bitcoin through FTX. Hence at the end of the investment period, 3 scenarios are possible if btc goes up; if btc goes down; if btc remains the same. (More details below)

As you can see, no matter the price of bitcoin tomorrow, the value in euro terms is retained and a premium of 5-10% has been captured. You have created what we call a “Vault”.

Now, you can exchange your yEUR into a cEUR in one of the investment strategies offered in one of our rockets. We will offer Moola Market, Mobius, Ubeswap, Dahlia Finance. Additionally, we aim to create an additional offer for microcredit on chain. With crypto, lending can be de-risked, by having 100%+ collaterals on borrowing. In case of microcredit, borrowers won’t bring all the guarantee, but other players like partner MFI or a credit insurer pool will play that role.

At the end of your investment period, you have captured the rocket yield, the vault yield and can cash out more than  10-15% return per year.

We bring financial inclusion to the unbanked, democratizing credit around the globe, while delivering higher returns to investors at lower risk. Join in delivering #DeFiForThePeople !

## Challenges we ran into
Building the team, the product, understanding in full details how futures, with expiry, markets work and are settled, the potential of Celo and microcredit on chain. 

## Accomplishments that we're proud of
Building a working prototype with mostly a single dev, Mael in a single month

## What we learned
That money is beautiful. 😊

## What's next for 21yield
Raising the funds necessary to seed fund the yEUR/cEUR AMM pool. Launching it live. Connecting lenders in Europe with microcredit borrowers in emerging markets.


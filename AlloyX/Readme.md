# ⚡ Hackathon Project Template ⚡

_This is a sample submission repository.
Please [**fork this repo**](https://help.github.com/articles/fork-a-repo/) and use this as a starting point for your hackathon project._

## Project Name

AlloyX

### Team name

AlloyX

##### Region location

USA

##### Team Members

- Charles Packer, CTO and Co-Founder
- Alexandre Liege, CEO and Co-Founder
- Azer Songnaba, CIO and Co-Founder

## Inspiration

We are inspired by our experience issuing pools on Centrifuge and Goldfinch. Being the first fund to issue pools on both protocols, we are now holders of tokens but if we wanted to exit our position we have no alternatives. Therefore we started asking leadership of the different real world asset protocols for their thoughts and they all encouraged us that creating a secondary market for tokenized bonds is an excellent idea.

## What it does

We store the tokens we receive from the lending protocols in a vault and deploy an ERC20 token representing that vault. These vaults can contain any number of tokens that store an underlying asset value. We then create corresponding ERC20s on Celo and provide a mobile-first investment experience for Celo investors.

## How we built it

We built our vault creation tool using React/ContractKit along with Truffle for contract deployment. Same goes for our investment portal.

## Challenges we ran into

Right now our model is centralized. In that the asset holder is relied upon to process transactions for disbursement. We are also not fully deployed on Celo optics yet but look forward to doing so in the future.

## Accomplishments that we're proud of

We're proud that we have a workaround for Optics until the deployment is more stable. We are also proud that we built a professional user experience for Celo investors.

## What we learned

We learned that we still have a long way to go in terms of building ETF like composability. Also, there is a long way to go in terms of defining our legal construct so there's as little friction as possible.

#### URLs

Deployed on testnets with a frontend on GCP. Still in private beta.

#### Presentation

https://docs.google.com/presentation/d/1oLipyP8hWip7D5KCM6uhs-py0B2Dl_-zy0Dq6sora8Q/edit

#### Next Steps

Next up is to deploy the tokens over Optics bridge and implement our v2 model which allows for Liquidity Providers to assemble their token composition with an array of available assets.

#### Video

https://www.youtube.com/watch?v=cvoBspJJwms

#### License

GNU GPLv3

# Optics Dashboard 📊

Monitor the activity, metrics, and health of Celo's Optics cross-chain bridges in a single dashboard.

### Live Demo: https://optics-dashboard.vercel.app/

This is a submission for Celo's Make Crypto Mobile Hackathon.

Video: https://www.youtube.com/watch?v=srCR1F83uKM

## Contents

- [Intro](#intro)

- [Optics Dashboard](#optics-dashboard) (features and video demos)

- [Technical docs](#technical-documentation)

## Intro
![optics-dashboard-cover](https://user-images.githubusercontent.com/30199031/144307033-60a80b05-3f7e-4f3c-88a8-f8c55b6f7619.png)

### Project details

##### Hackathon Track

Interoperability Track

##### Region location

London, UK

##### Team

Karl Lee, dev


### Problem

'The next frontier in blockchain technology is communication', as stated by the team behind Wormhole bridge.

With DeFi apps, protocols, and financial products appearing in different crypto ecosystems, a major barrier arises.
Capital flows across chains are restricted by limited communications between them.

Without cross-chain communication, **crypto is forced to flow back to centralized exchanges or even to fiat off-ramps** in order to cross different chains.
Decentralized finance cannot be so decentralized after all if we rely on centralized actors for bridging.



### Why Optics? (A protocol designed by Celo)

Bridging assets across chains is often costly due to gas fees.

According to [Celo's documentation](https://docs.celo.org/celo-codebase/protocol/optics), Optics is expected to cut '90% of gas costs' compared to a traditional cross-chain system. This is because Optics is a protocol that facilitates communication without header verification.



### Barriers to adoption and development of Optics

Optics is currently in a beta release phase.

While security is always a key issue for cross-chain bridges, there is also a lack of information on how Optic's bridges are currently being utilized.

For Optics, we are currently lacking:

- Official or community dashboard for monitoring activity on Optics
- Analytics for Optics
- A way for individual users to track their bridging activity

### Motivation behind the project

Insights and analytics into cross-chain bridging seem to be far and few between. How much crypto are users bridging? Which currencies are bridged the most? Who are the most intensive users of bridges?

Could trends in bridging activity indicate new opportunities for traders, devs, and protocols?

This project was an opportunity to draw out and discover insights into Optics usage that were unavailable.

I wanted to combine and apply my previous experience of designing front-ends with crypto-driven data to a more complex, multi-chain application.

Previous projects: 
- LUNAtic score calculator for Terra users: https://github.com/karlxlee/lunatic-score-calculator
- PolyDAO analytics: https://github.com/karlxlee/polydao-analytics
- Previous hackathon wins: https://gitcoin.co/karlxlee


<br>

## Optics Dashboard

Optics Dashboard serves several stakeholders:

- Provides activity and trends for bridge operators and developers

- Provides insights for blockchain teams that are looking to potentially integrate with Optics

- Exposes opportunities for cross-chain apps, protocols, and DAOs, that can integrate Optics to increase liquidity

- Allows bridging users to monitor their transactions in one place

### Features
#### Track key metrics with Overview
From bridge balance to transaction count, see key metrics, visualized.

https://user-images.githubusercontent.com/30199031/143970983-0b942621-6459-4f1b-b062-639edcba09cd.mp4

<br>

#### Explore trends
See the assets that are most popular with Optics users.

https://user-images.githubusercontent.com/30199031/143971464-e60dc68c-8cc4-4cc2-a515-28fb41ffb497.mp4

<br>

#### Check smart contract activity
Bridges can enter failure cases due to unexpected circumstances or errors. One indicator of an error and a disruption in bridge usage would be that bridge smart contracts stop sending regular updates.

The health tab allows operators to monitor the key contracts that power Optics. See smart contract activity over the past 24 hours in one place. N.B. the blockchain data source has a lag period of a few hours currently, but should see better future performance.

https://user-images.githubusercontent.com/30199031/143971971-39288007-be1f-43c5-8ad4-532224c992b0.mp4

<br>

#### Search for bridging activity by address

https://user-images.githubusercontent.com/30199031/143972669-19c0117d-b344-41ca-b388-b08877d626b5.mp4

Want to see Optics activity for a specific address (including your own)? With Optics Dashboard you can see your bridging activity in seconds.

<br>

#### Compare Optics fees with other cross-chain bridges


https://user-images.githubusercontent.com/30199031/144089167-248e3533-feb9-4a43-8b7d-912678ef841e.mp4

<br>

### URLs

Demo: https://optics-dashboard.vercel.app/

Codebase: https://github.com/karlxlee/make-crypto-mobile-hackathon/tree/project/optics_dashboard

<br>

### Next steps

- Integrate bridge activity to and from Celo blockchain
- Finish fee comparison feature
- Explore activity on a specific day
- Explore activity for a specific asset


## Technical documentation

Optics Dashboard needed to fulfil several technical needs:
- Fetch the latest blockchain data
- Visualize many data points in a useful way to stakeholders
- Provide a speedy user interface
- Allows for fast changes and improvements in both the frontend and backend

 
 
For these reasons, the technology chosen for this app was:
- Fast and modular front-end using [Next.js](https://nextjs.org/) and [Chakra UI](https://chakra-ui.com/)
- Effective visualization library using [ApexCharts](https://apexcharts.com/)
- Flexible and easily-editable backend using [Flipside Crypto](https://flipsidecrypto.com/)

![optics-dashboard-architecture](https://user-images.githubusercontent.com/30199031/144093768-5a06a55f-c0dc-4ef3-8fef-d6ab0feb1da4.png)

### SQL data queries
SQL queries expose the key metrics that Optics Dashboard displays.
You can find a list of the SQL queries used below.

| Query name                                                  | Additional parameters | Blockchain | SQL query                                                                            | Exposed API                                                                                    |
|-------------------------------------------------------------|-----------------------|------------|--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| Optics Ethereum daily total balance                         |                       | eth        | https://app.flipsidecrypto.com/velocity/queries/9430ef32-ea4b-4681-9a11-bde367275ac9 | https://api.flipsidecrypto.com/api/v2/queries/9430ef32-ea4b-4681-9a11-bde367275ac9/data/latest |
| Optics volume on Ethereum                                   |                       | eth        | https://app.flipsidecrypto.com/velocity/queries/35ac2a96-4b1f-4d0e-a222-e9a2a2303ce4 | https://api.flipsidecrypto.com/api/v2/queries/35ac2a96-4b1f-4d0e-a222-e9a2a2303ce4/data/latest |
| Optics number of users on Ethereum                          |                       | eth        | https://app.flipsidecrypto.com/velocity/queries/7d29928a-d705-4987-a7d6-9dc6bbc9b1f8 | https://api.flipsidecrypto.com/api/v2/queries/7d29928a-d705-4987-a7d6-9dc6bbc9b1f8/data/latest |
| Optics transaction frequency on Ethereum                    |                       | eth        | https://app.flipsidecrypto.com/velocity/queries/94931e9c-b454-4ffb-bb96-2442b67de868 | https://api.flipsidecrypto.com/api/v2/queries/94931e9c-b454-4ffb-bb96-2442b67de868/data/latest |
| Optics Ethereum top assets received by volume last 24 hours | 24hours               | eth        | https://app.flipsidecrypto.com/velocity/queries/22d63880-0ee4-4b94-b574-b0106cc7e438 | https://api.flipsidecrypto.com/api/v2/queries/22d63880-0ee4-4b94-b574-b0106cc7e438/data/latest |
| Optics Polygon top assets received by volume last 7 days    | 7days                 | eth        | https://app.flipsidecrypto.com/velocity/queries/9a05103f-2ad2-4f98-aa95-690dee529ec7 | https://api.flipsidecrypto.com/api/v2/queries/9a05103f-2ad2-4f98-aa95-690dee529ec7/data/latest |
| Optics Ethereum top assets received by volume last month    | 1month                | eth        | https://app.flipsidecrypto.com/velocity/queries/6d14b23a-64b2-479f-a0db-1d64cc7de8fb | https://api.flipsidecrypto.com/api/v2/queries/6d14b23a-64b2-479f-a0db-1d64cc7de8fb/data/latest |
|                                                             |                       |            |                                                                                      |                                                                                                |

### Local development

- Clone the repo
- Install modules
- Run `yarn dev`
- Open http://localhost:3000/

### Deploy

Deploy in one click using Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkarlxlee%2Fmake-crypto-mobile-hackathon%2Ftree%2Fproject%2Foptics_dashboard%2Fcodebase)

#### License

This repository is available under the MIT license. See the LICENSE file.

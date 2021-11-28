## Roadmap

You can find the estimated plan of Redstone oracle development activities with the corresponding timing in the table below. We don’t include a few things that we do continuously:
- Improving the codebase stability
- Extending monitoring scripts and error reporting
- Stress testing infrastructure with load and PEN tests
- Connecting new sources and data feeds based on the feedback from users and stakeholders (for example NFT pricing, advanced financial data, voting results, climate data, sport…)

| Description | Timing | Notes |
|---|---|---|
| Support for multiple broadcasters | Q4 2021 | The data signed by a provider will be broadcasted to multiple cache layers in order to ensure data accessibility and to keep the whole system more decentralised, stable and resistant to DDOS attacks. |
| Backup nodes | Q4 2021 | To ensure node stability we’ll prepare implementation of backup nodes. A backup node will be running independently from the master node. It will repeatedly check if the main node is working properly and if not - it will switch to the “master” mode and will start to operate as a standard node until the original node comes back. |
| Encrypted content | Q4 2021 | We’ll add the ability to persist encrypted content allowing providers to deliver non-public information.  |
| Auditing redstone-flash-storage | Q4 2021 | We’ll invest significant resources to ensure the security of the redstone-flash-storage module (e.g. ordering independent smart contracts audits) |
| Onboarding at least 5 data providers (node operators) | Q4 2022 | Growth |
| Integrate with at least 5 data consuming protocols to pilot the solution | Q4 2022 | Growth |
| Scaling supported assets to 5K | Q1 2022 | At 08.10.2021 the Redstone oracle supported ~1.1K assets. By enabling support for 5K assets, RedStone will become the confident leader in the oracle space in terms of the data amounts, outrunning the current leader (umbrella network that supports 1200 data pairs) |
| Improving the aggregator mechanism | Q1 2022 | Implementing a weight-median-aggregator (weighted by source trust) |
| UI for no-code node configuration | Q1 2022 | The idea is similar to the Mongo Atlas. We’ll offer some kind of RNAAS (Redstone node as a service). People will be able to run their nodes by configuring it in the browser and paying some required stake. We’ll try to design it in a way where we won’t have access to their private keys. |
| Allowing to provide any kind of data | Q1 2022 | We’ll extend our infrastructure to process complex data structures apart from simple pricing information |
| Allowing to “connect any API to blockchain” | Q1 2022 | We’ll implement a UI for running a simple node based on the provided API url and some transformation. The UI will create under the hood a standalone node with a new fetcher that will fetch data from the provided API URL and transform the data using the provided transformation. |
| Connecting api responses proof mechanism (e.g. using TLS Notary) | Q2 2022 | We’ll research the mechanism of proving the received responses from external APIs using TLS protocol. So that a data provider will be able to prove that he/she has got a given response from a given url at a given timestamp. This proof may help the data provider in disputes later. Of course, it will work only for urls that start from https. |
| Implementing the dispute protocol | Q2 2022 | We’ll implement the SmartWeave contracts and the UI for the dispute resolution protocol. We’ll invest significant resources to ensure the contracts security by ordering independent audits and scrupulous testing. |
| Onboarding at least 10 data providers (node operators) | Q2 2022 | Growth |
| Integrate with at least 10 data consuming protocols to pilot the solution | Q2 2022 | Growth |
| Onboarding at least 10 independent broadcaster operators | Q3 2022 | Decentralisation |
| Making the node running process as easy as possible (Preparing AWS / GCP / Azure / Heroku configuration templates, preparing the first-class documentation, continuous interaction with the community and rewarding the most active community members) | Q4 2022 | Decentralisation |

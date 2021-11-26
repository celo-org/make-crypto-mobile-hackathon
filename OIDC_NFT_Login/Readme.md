
# ⚡ Hackathon Project Template ⚡
_This is a sample submission repository.
Please [__fork this repo__](https://help.github.com/articles/fork-a-repo/) and use this as a starting point for your hackathon project._

## OIDC NFT Login
### NFT Login

##### Frankfurt

##### Team Members
- Adil, Business
- Koraltan, Videograph
- Christian, Developer

#### Project Description
Services on the internet are designed, you need to login with an account connected to your id.
This way it is not designed to allow transfer accounts.
NFTs are a digital way to own access to a service.
This access can also be transfered by changing the ownership of the NFT.
We created a openid connect provider which combines both worlds.

#### Summary
NFT-login is a provider speaking the well known openid connect protocol, which is an open industry standard for authentication.
All Web or Mobile Services speaking openid can be connected to the service and
would allow login users owning a special nft.

There are two things needed to build this provider. The part for the services, which connect to the provider is a server backend speaking the openid connect protocol. The other part is a end user frontend which connects to the blockchains to verify the ownership of the nft.
The openid connect provider is just a part in a complex system.
For the enduser to use it, there must be a marketplace to get a nft.
Also the user should login into a service, so we had to host a service, that 
uses nft-login for authorization. In the end we had to develop next to the nft-login provider a marketplace (we used an existing and customized it) and a service (svelte oidc example, which we also customized).
We are proud that we deployed a erc721 smart contract, hosted a marketplace,
and provide the owners access to a service using the nft-login provider.
We learned to deploy smart contracts, host web3 software on github pages and
how complicated metamask signatures can be.

#### URLs
* https://nft-login.github.io/nft-login-demo/celo/
* https://github.com/nft-login/nft-login
* https://nft-login.net/

#### Presentation

Here is the demo [![Celo submission](https://img.youtube.com/vi/USKg2Ik2zPI/0.jpg)](https://www.youtube.com/watch?v=USKg2Ik2zPI)

#### Next Steps
As of today nft-login just proves a user is the holder of a nft.
We want to develop more customizable nft contracts, so we can add attributes to the nft, so we can provide claims like

* default or premium account
* end date of service

To bring this prototype into a working solution we need to improve the design, find a good provider to host and a nice domain name.

#### License
MIT License

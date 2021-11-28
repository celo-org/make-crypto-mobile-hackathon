
# ⚡ Hackathon Project ⚡

## Certify
### Team : CodeEasy
#### Hackathon Track : Infrastructure and Web3 Track

##### Region location : India

##### Team Members
- Jayesh bhole, Frontend Developer
- Harsh Prakash, Backend Solidity Developer

### Project Description
Create Verify and Manage Digital certificates Celo blockchain.

We propose a system for creating and managing certificates which is decentralized thus giving maximum security. All the data is on public block-chain therefore it can be easily verified by anyone. The stored data would be encrypted too. Our application consists of an User Interface for institutes/Authorities to create and revoke certificates. There is also provision for a central authority which verifies institutes for authenticity. The institutes signs each certificate with there private key which ensures no forgery can
be done, once the certificate is issued.

### Summary
### [Demo](https://youtu.be/0EYBFDaAJYE)
### [Explanation](https://www.youtube.com/embed/Ga0VVGfJe8Y)

## Inspiration

Certificates are very important in our lives. They allow us to prove our identity, our skills and a whole host of other things. But the current centralised systems are bogged down by fake certificates, corruption and difficulty in verifying the certificates. When we are dealing with such private information security and privacy is also a very big concern.

Because they are so valuable, people often lie about their academic qualifications by producing fake certificates. In the United States there are currently 2 million fake degree certificates in circulation and 300 unauthorised universities operating.  A study indicated that the United Sates has the highest number of fake institutions in the world followed by the United Kingdom which has about 270 fake institutes. It was also found that up to 35% of candidates in Australia falsified their academic credentials for the sake of employment. Most candidates lie at least about some part of their educational credentials and experience. Academic certificate fraud costs employers about $600 billion every year.

We propose a system for creating and managing certificates which is decentralised thus giving maximum security. All the data is on public block-chain therefore it can be easily verified by anyone. The stored data would be encrypted too. Our application consists of a User Interface for institutes to create certificates and revoke certificates. There is also provision for a central authority which verifies institutes for authenticity. The institutes signs each certificate with their private key which ensures no forgery can be done, once the certificate is issued.

## What it does

The project needs to store highly confidential data in an easily accessible and verifiable way. Therefore AES(Advanced Encryption Standard) encryption is used to encrypt data before uploading to IPFS(Inter Planetary File System). Then the IPFS hash of the data is stored on blockchain where it cannot be tampered with. Anyone can verify the certificate if they have the IPFS hash and the password used for encryption.

These certificates can also be used for on-chain governance and Decentralised Finance (DeFi) for proving once identity. Governments can also use a similar system to issue driving licences, voter Id card, passport etc. increasing the security of our nation as these documents cannot be forged. In these kinds of system the identity of the individual is only visible to authorities and people who has access to encryption keys, Thus this system tends to be very secure and resistant to hacking.

The proposed project provides features like privacy because of AES encryption, Fast online verification by scanning QR code, ability to revoke certificate by institute at a later date. 



### URLs
<!-- List any URLs relevant to demonstrating your prototype -->
Demo : [Demo Link](https://certify-v1.celo.org/)

Frontend : [Frontend Repo](https://github.com/jayeshbhole/certify-interface8)

Backend : [Backend Repo](https://github.com/harsh132/certify-contract)

Contract : [0x2D031B84bd6cF242619Bd52542dDbCcb8556b90e](https://alfajores-blockscout.celo-testnet.org/address/0x2D031B84bd6cF242619Bd52542dDbCcb8556b90e/transactions)



### Presentation
<!-- List any links to your presentation or any related visuals you want to share. -->
Project Presentation Video : [Presentation / working](https://youtu.be/Ga0VVGfJe8Y)

Live Demo : [Desktop + Mobile Demo](https://youtu.be/0EYBFDaAJYE)

Project Presentation : [PPT Presentation](https://www.canva.com/design/DAEqMRatclg/mg0ZO_Ilku8Xq6NfOF52vg/view?utm_content=DAEqMRatclg&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton)



#### Next Steps
Various customisations will be added for user convenience in the future, using which issuers will be able to add certificates in batches. Protocols like Superfluid can be used to create certificates that allow streaming of tokens to create a wages system.


#### License
This repository includes an [unlicensed](http://unlicense.org/) statement though you may want to [choose a different license](https://choosealicense.com/).

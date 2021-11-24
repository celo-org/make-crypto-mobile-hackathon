// Initialize an instance of ContractKit connected to the Alfajores testnet (read-only)

import Web3 from 'web3'
import { newKitFromWeb3 } from "@celo/contractkit";

export const provider = "https://alfajores-forno.celo-testnet.org"
// export const provider = 'https://forno.celo.org' // or 'wss://forno.celo.org/ws' (for websocket support)

export const web3 = new Web3(provider);
export const kit = newKitFromWeb3(web3)

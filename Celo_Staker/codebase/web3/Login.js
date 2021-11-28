// 1. Import web3 and contractkit 
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
// 2. Init a new kit, connected to the alfajores testnet
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

import { requestAccountAddress, waitForAccountAuth } from "@celo/dappkit";
import { Linking } from "expo";

login = async () => {
  const requestId = "login";
  const dappName = "My DappName";
  const callback = Linking.makeUrl("/my/path");

  requestAccountAddress({
    requestId,
    dappName,
    callback,
  });

  const dappkitResponse = await waitForAccountAuth(requestId);

// The pepper is not available in all Valora versions
  this.setState({ 
    address: dappkitResponse.address, 
    phoneNumber: dappkitResponse.phoneNumber, 
    pepper: dappkitResponse.pepper 
  });
};
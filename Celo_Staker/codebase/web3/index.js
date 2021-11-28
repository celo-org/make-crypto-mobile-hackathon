import { requestAccountAddress, waitForAccountAuth } from "@celo/dappkit";
import * as Linking from 'expo-linking'

export const login = async () => {
  const requestId = "login";
  const dappName = "My DappName";
  const callback = Linking.makeUrl("/my/path");

  requestAccountAddress({
    requestId,
    dappName,
    callback,
  });
  console.log("successiful1")
  const dappkitResponse = await waitForAccountAuth(requestId);

// The pepper is not available in all Valora versions
  console.log("successiful")
  console.log(dappkitResponse.phoneNumber)
  console.log(dappkitResponse.address)
  console.log(dappkitResponse.pepper )
};


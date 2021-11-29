import * as Linking from "expo-linking";
import {AppToken} from "./RentLendTokensView";

export const dappName = "Nftzi";
export const loginRequestId = "loginRequestId"
export const mintRequestId = "mintRequestId"
export const approveRequestId = "approveRequestId"
export const redeemRequestId = "redeemRequestId"
export const callback = Linking.createURL("/valora");

export const getCurrecyContract = async (currency, kit) => {
  switch (currency.toUpperCase()) {
    case 'CELO':
      return kit.contracts.getGoldToken();
    case 'CUSD':
      return kit.contracts.getStableToken();
    default:
      throw new Error('Currency must be specified');
  }
};

export const isOwner = (token: AppToken, address:string): boolean => {
  return token.creator.toLowerCase() === address.toLowerCase()
}

export const showRentedDetails = (token: AppToken, address:string): boolean => {
  return !isOwner(token, address) && parseInt(token.rentedAt, 10) > 0
}

export const showWithdrawDetails = (token: AppToken, address:string): boolean => {
  return isOwner(token, address) && parseInt(token.rentedAt, 10) > 0
}

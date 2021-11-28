import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { toTxResult } from "@celo/connect";
import {   
    waitForSignedTxs,
    requestTxSig,
    requestAccountAddress,
    waitForAccountAuth,
    FeeCurrency
  } from '@celo/dappkit'
import { BigNumber } from "bignumber.js";
import * as Linking from 'expo-linking'

import { PhoneNumberUtils } from '@celo/utils'

import Firebase from '../config/firebase';
import 'firebase/firestore';
const db = Firebase.firestore();
const auth = Firebase.auth();


const web3 = new Web3("https://alfajores-forno.celo-testnet.org")
const kit = newKitFromWeb3(web3);

export async function getData(address) {

    kit.defaultAccount = address;
    // Get the StableToken contract
    const stableToken = await kit.contracts.getStableToken();
    // Get the user account balance (cUSD)
    const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount);
    const lockedCelo = await kit.contracts.getLockedGold()
    const lockedBalanceBig = await lockedCelo.getTotalLockedGold()
    // Convert from a big number to a string

    //this.setState({ cUSDBalance, isLoadingBalance: false });

    const celoCoins = await kit.contracts.getGoldToken()
    const celoBalanceBig = await celoCoins.balanceOf(kit.defaultAccount)


    // Convert from a big number to a string by rounding it to the appropriate number of decimal places
    const ERC20_DECIMALS = 18
    let cUSDBalanceDec = cUSDBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
    let cUSDBalance = cUSDBalanceDec.toString()

    let celoBalanceDec = celoBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
    let celoBalance = celoBalanceDec.toString()

    let lockedBalanceDec = lockedBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
    let lockedBalance = lockedBalanceDec.toString()

    return { "cUSD": cUSDBalance, "locked": lockedBalance, "Celo": celoBalance }

}

export async function send(address) {
    // Create the transaction object
    const stableToken = await kit.contracts.getStableToken();
    // This can be a specific account address, a contract address, etc.
    const transferTo = address;
    const transferValue = new BigNumber("10e18");
    const txObject = stableToken.transfer(transferTo, transferValue.toString()).txo;

    const requestId = "transfer";
    const dappName = "Celo Dapp";
    const callback = Linking.makeUrl("/my/path");

    // Request the TX signature from DAppKit
    requestTxSig(
        kit,
        [
            {
                tx: txObject,
                from: address,
                to: stableToken.contract.options.address,
                feeCurrency: FeeCurrency.cUSD,
            },
        ],
        { requestId, dappName, callback }
    );

    const dappkitResponse = await waitForSignedTxs(requestId);
    const rawTx = dappkitResponse.rawTxs[0];

    // Send the signed transaction via the kit
    const tx = await kit.connection.sendSignedTransaction(rawTx);
    const receipt = await tx.waitReceipt();

    console.log(receipt)
}

export async function exchangeCelo(receiverAddress,  stakeValue, amount, address){

const dappName = "Celo Dapp";
const callback = Linking.makeUrl("/my/path");
    
// Let's assume that the address has funds enough in cUSD to pay the
// transaction fees of all the transactions and enough to buy 1 CELO
// In this example, we also assume that we have already requested
// the user's account address, and it is stored in `this.state.address`.

// We will be using the following contracts:
const stableToken = await kit.contracts.getStableToken();
const exchange = await kit.contracts.getExchange();
const lockedGold = await kit.contracts.getLockedGold();
const election = await kit.contracts.getElection();

const accounts = await kit.contracts.getAccounts();



// Let's ensure that the account is registered. If not, we need to call
// the `createAccount` method from the Accounts contract)

const txIsAccount = await accounts.isAccount(address);
const txRegisterAccountObj = accounts.createAccount().txo;

if (!txIsAccount) {
  requestTxSig(
    // @ts-ignore
    kit,
    [
      {
        tx: txRegisterAccountObj,
        from: address,
        to: accounts.address,
        feeCurrency: FeeCurrency.cUSD,
      }
    ],
    { requestId, dappName, callback }
  );

//Catching errors
//position 1
try {
  const respRegisterAccount = await waitForSignedTxs(requestId);
  // Handle successful login
} catch (error) {
  console.log("erro happened at 1", error)
  // Catch and handle possible timeout errors
}



//Catching errors 
//position 2
try {
  const txRegisterAccount = await kit.connection.sendSignedTransaction(
    respRegisterAccount.rawTxs[0]
  );
  // Handle successful login
} catch (error) {
  console.log("erro happened at 2", error)
  // Catch and handle possible timeout errors
}

  const receiptRegisterAccount = await txRegisterAccount.waitReceipt();
  console.log(`Tx hash: ${receiptRegisterAccount.transactionHash}`);
  // Handle account registration
}

//Getting gas fees
const gas = await kit.contracts.getGasPriceMinimum()
const celoGas = await gas.gasPriceMinimum()/10**9
const myexchange= await exchange.getStableExchangeRate("1e18")
const celoGas_cUSDGas = celoGas * myexchange

//Converting cUSD to Celo
//const exchange = await kit.contracts.getExchange();
//const str_text= value.toString()
//const concat_string=str_text.concat("","e18")
//currently we need 5.25cUSD to get 1 Celo
//const myexchange= await exchange.getStableExchangeRate(concat_string)
//Exhanging cUSD
//you will get

//Converting Stake value (cUSD) to Celo
const stake = parseFloat(stakeValue/myexchange)

//Getting Total
const gasFees = parseFloat(celoGas_cUSDGas)
const total = stake + gasFees + amount 

// 1e18 = 1 Celo
const oneCelo = new BigNumber(stake*10**18);
const tenCUSD = new BigNumber(total*10**18);

// Now we will generate the transactions that we require to be signed

// First of all, we need to increase the allowance of the exchange address
// to let the contract expend the amount of stable tokens to buy one CELO.
// We are allowing the exchange contract to spend 10 cUSD

const txObjectIncAllow = stableToken.increaseAllowance(
  exchange.address,
  tenCUSD
).txo;

//Transfer cUSD
const transferTo = receiverAddress;
const transferValue = new BigNumber(amount*10**18);
const txObject = stableToken.transfer(transferTo, transferValue.toString()).txo;

// Then we will call the Exchange contract, and attempt to buy 1 CELO with a
// max price of 10 cUSD (it could use less than that).
const txObjectExchange = exchange.buy(oneCelo, tenCUSD, true).txo;

// Then we will call the lockedGold contract to lock our CELO
// (Remember that the address should be a registered Account)
// Later, the amount to be locked will be the parameter `value`.
const txObjectLock = lockedGold.lock().txo;

// Then we use the 1 CELO to vote for a specific validator group address.
// Here you have to change the validator group address
// (At the moment of writing the tuto, the 0x5edfCe0bad47e24E30625c275457F5b4Bb619241
// was a valid address, but you could check the groups using the celocli)
const validatorGroupAddress = "0x87614eD7AF361a563C6a3624CcadD52e165f67C2";
const txObjectVote = (await election.vote(validatorGroupAddress, oneCelo)).txo;

const requestId = "signMeEverything";

// Request the TX signature from DAppKit
requestTxSig(
  kit,
  [
    {
    tx: txObject,
    from: address,
    to: stableToken.contract.options.address,
    feeCurrency: FeeCurrency.cUSD,
  },
    {
      tx: txObjectIncAllow,
      from: address,
      to: stableToken.address,
      feeCurrency: FeeCurrency.cUSD,
    },
    {
      tx: txObjectExchange,
      from: address,
      to: exchange.address,
      feeCurrency: FeeCurrency.cUSD,
      estimatedGas: 200000,
    },
    {
      tx: txObjectLock,
      from: address,
      to: lockedGold.address,
      feeCurrency: FeeCurrency.cUSD,
      value: oneCelo,
    },
    {
      tx: txObjectVote,
      from: address,
      to: election.address,
      feeCurrency: FeeCurrency.cUSD,
      estimatedGas: 300000,
    },
  ],
  { requestId, dappName, callback }
);


const dappkitResponse = await waitForSignedTxs(requestId);

const receipts = [];


//Catching errors 
//position 4
try {
 //Execute the transfer
console.log("execute the transfer");
const tx = await kit.connection.sendSignedTransaction(dappkitResponse.rawTxs[0]);
receipts.push(await tx.waitReceipt());
} catch (error) {
  console.log("Execute the transfer error ", error)
  return(false)
  // Catch and handle possible timeout errors
}

//Catching errors 
//position 5
try {
  // execute the allowance
console.log("execute the allowance");
const tx0 = await kit.connection.sendSignedTransaction(
  dappkitResponse.rawTxs[1]
);
receipts.push(await tx0.waitReceipt());
} catch (error) {
  console.log("execute the allowance error", error)
  return(false)
  // Catch and handle possible timeout errors
}


//Catching errors 
//position 6
if(stakeValue != "0"){
console.log("the stake value is zero")

try {
  // execute the exchange
console.log("execute the exchange");
const tx1 = await kit.connection.sendSignedTransaction(
  dappkitResponse.rawTxs[2]
);
receipts.push(await tx1.waitReceipt());
} catch (error) {
  console.log("execute the exhange error", error)
  return(false)
  // Catch and handle possible timeout errors
}

//Catching errors 
//position 7
try {
  // execute the lock
 console.log("execute the lock");
 const tx2 = await kit.connection.sendSignedTransaction(
   dappkitResponse.rawTxs[3]
 );
 receipts.push(await tx2.waitReceipt());
 } catch (error) {
   console.log("execute the lock error", error)
   return(false)
   // Catch and handle possible timeout errors
 }

//Catching errors 
//position 7
try {
  // execute the vote
console.log("execute the vote");
const tx3 = await kit.connection.sendSignedTransaction(
  dappkitResponse.rawTxs[4]
);
receipts.push(await tx3.waitReceipt());
console.log("Receipts: ", receipts);
 } catch (error) {
   console.log("execute the vote error", error)
   return(false)
   // Catch and handle possible timeout errors
 }

 const voteInfo = await election.getVoter(address);
console.log("Vote info: ", voteInfo);
// REMEMBER that after voting the next epoch you HAVE TO ACTIVATE those votes
// using the `activate` method in the election contract.

}


return (true)

}


export async function celoGained (value){
    //the value is the amount of celo Dollars
     const exchange = await kit.contracts.getExchange();
    const str_text= value.toString()
    const concat_string=str_text.concat("","e18")
    //currently we need 5.25cUSD to get 1 Celo
    const myexchange= await exchange.getStableExchangeRate(concat_string)
    //Exhanging cUSD
    //you will get
    const celoGained = value/myexchange
    return(celoGained)
}

export async function gasFees(){
    //Get the max amount that can be sent
    //const gas = await kit.contracts.getGasPriceMinimum()
    const exchange = await kit.contracts.getExchange();
    const gas = await kit.contracts.getGasPriceMinimum()
    const celoGas = await gas.gasPriceMinimum()/10**9
    const myexchange= await exchange.getStableExchangeRate("1e18")
    const celoGas_cUSDGas = celoGas * myexchange
    //const mygas = await gas.gasPriceMinimum()
    //console.log(parseFloat(mygas).toFixed(2))
    return(parseFloat(celoGas_cUSDGas).toFixed(2))
}

export async function test(value){
  console.log("in the contract")
  const election = await kit.contracts.getElection();
  const groups = await election.getValidatorGroupsVotes()
  console.log("in the contrac8")
  console.log(groups)

}

//Login in to the blockchain for the first time
//
export  async function blockLogin (){
  const requestId = 'login2'
  const dappName = 'Celo Dapp'
  const callback = Linking.makeUrl('/my/path')


  requestAccountAddress({
    requestId,
    dappName,
    callback,
  })

  // Wait for the Celo Wallet response
  try{
    const dappkitResponse = await waitForAccountAuth(requestId)
     // Set the default account to the account returned from the wallet
    kit.defaultAccount = dappkitResponse.address
  }catch(error){
    console.log("erro happened again")
  }
  
 
  // Get the stabel token contract
  const stableToken = await kit.contracts.getStableToken()
  const celoCoins = await kit.contracts.getGoldToken()
  const celoBalanceBig = await celoCoins.balanceOf(kit.defaultAccount)
  // Get the user account balance (cUSD)
  const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)
  // Convert from a big number to a string by rounding it to the appropriate number of decimal places
  const ERC20_DECIMALS = 18
  let cUSDBalanceDec = cUSDBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
  let cUSDBalance = cUSDBalanceDec.toString()

  let celoBalanceDec = celoBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
  let celoBalance = celoBalanceDec.toString()
  
  //storeProfile(cUSDBalance,kit.defaultAccount,celoBalance)
  
  return {'cUSDBalance':cUSDBalance, 'account':kit.defaultAccount, 'celoBalance':celoBalance }
}
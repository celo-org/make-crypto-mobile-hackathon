import React, { useState, useEffect } from 'react'
import './global'
import { web3, kit } from './root'
import { Image, StyleSheet, Text, TextInput, Button, View, YellowBox } from 'react-native'
import {   
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency
} from '@celo/dappkit'
import { toTxResult } from "@celo/connect"
import * as Linking from 'expo-linking'
import HelloWorldContract from './contracts/HelloWorld.json'

YellowBox.ignoreWarnings(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream'])

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35d07f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 8, 
    fontSize: 20, 
    fontWeight: 'bold'
  }
});

const CeloDAppKit = () => {

  // Set the defaults for the state
  const [address, setAddress] = useState('Not logged in');
  const [phoneNumber, setPhoneNumber] = useState('Not logged in');
  const [cUSDBalance, setcUSDBalance] = useState('Not logged in');
  const [helloWorldContract, setHelloWorldContract] = useState({});
  const [contractName, setContractName] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);


  useEffect(() => {
    async function setup(){
      // Check the Celo network ID
      const networkId = await web3.eth.net.getId();
      
      // Get the deployed HelloWorld contract info for the appropriate network ID
      const deployedNetwork = HelloWorldContract.networks[networkId];

      // Create a new contract instance with the HelloWorld contract info
      const instance = new web3.eth.Contract(
        HelloWorldContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Save the contract instance
      setHelloWorldContract(instance);
    };

    setup();
  }, []);

  const login = async () => {
    
    // A string you can pass to DAppKit, that you can use to listen to the response for that request
    const requestId = 'login'
    
    // A string that will be displayed to the user, indicating the DApp requesting access/signature
    const dappName = 'Hello Celo'
    
    // The deeplink that the Celo Wallet will use to redirect the user back to the DApp with the appropriate payload.
    const callback = Linking.makeUrl('/my/path')
  
    // Ask the Celo Alfajores Wallet for user info
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    })
  
    // Wait for the Celo Wallet response
    const dappkitResponse = await waitForAccountAuth(requestId)

    // Set the default account to the account returned from the wallet
    kit.defaultAccount = dappkitResponse.address

    // Get the stabel token contract
    const stableToken = await kit.contracts.getStableToken()

    // Get the user account balance (cUSD)
    const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)
    
    // Convert from a big number to a string by rounding it to the appropriate number of decimal places
    const ERC20_DECIMALS = 18
    let cUSDBalanceDec = cUSDBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
    let cUSDBalance = cUSDBalanceDec.toString()
    
    // Update state
    setcUSDBalance(cUSDBalance);
    setIsLoadingBalance(false);
    setAddress(dappkitResponse.address);
    setPhoneNumber(dappkitResponse.phoneNumber);
  }

  const read = async () => {
    
    // Read the name stored in the HelloWorld contract
    let name = await helloWorldContract.methods.getName().call()
    
    // Update state
    setContractName(name);
  }

  const write = async () => {
    const requestId = 'update_name'
    const dappName = 'Hello Celo'
    const callback = Linking.makeUrl('/my/path')

    // Create a transaction object to update the contract with the 'textInput'
    const txObject = await helloWorldContract.methods.setName(textInput)

    // Send a request to the Celo wallet to send an update transaction to the HelloWorld contract
    requestTxSig(
      kit,
      [
        {
          from: address,
          to: helloWorldContract.options.address,
          tx: txObject,
          feeCurrency: FeeCurrency.cUSD
        }
      ],
      { requestId, dappName, callback }
    )

    // Get the response from the Celo wallet
    const dappkitResponse = await waitForSignedTxs(requestId)
    const tx = dappkitResponse.rawTxs[0]
    
    // Get the transaction result, once it has been included in the Celo blockchain
    let result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    console.log(`Hello World contract update transaction receipt: `, result)  
  }

  const onChangeText = async (text) => {
    setTextInput(text);
  }

  
  return (
    <View style={styles.container}>
      <Image resizeMode='contain' source={require("./assets/white-wallet-rings.png")}></Image>
      <Text>Open up client/App.js to start working on your app!</Text>
      
      <Text style={styles.title}>Login first</Text>
      <Button title="login()" 
        onPress={()=> login()} />
              <Text style={styles.title}>Account Info:</Text>
      <Text>Current Account Address:</Text>
      <Text>{address}</Text>
      <Text>Phone number: {phoneNumber}</Text>
      <Text>cUSD Balance: {cUSDBalance}</Text>

      <Text style={styles.title}>Read HelloWorld</Text>
      <Button title="Read Contract Name" 
        onPress={()=> read()} />
      <Text>Contract Name: {contractName}</Text>
      
      <Text style={styles.title}>Write to HelloWorld</Text>
      <Text>New contract name:</Text>
      <TextInput
        style={{  borderColor: 'black', borderWidth: 1, backgroundColor: 'white' }}
        placeholder="input new name here"
        onChangeText={text => onChangeText(text)}
        value={textInput}
        />
      <Button style={{padding: 30}} title="update contract name" 
        onPress={()=> write()} />
    </View>
  );
  
}

export default CeloDAppKit;
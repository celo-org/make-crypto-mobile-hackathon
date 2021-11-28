import  React,{useState} from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
} from 'native-base';
import {kit } from '../root'
import {   
  requestAccountAddress,
  waitForAccountAuth,
} from '@celo/dappkit'
import * as Linking from 'expo-linking'
import Register from '../auth/Register'
import RNRestart from 'react-native-restart';

import Firebase from '../config/firebase';
import 'firebase/firestore';
const db = Firebase.firestore();
const auth = Firebase.auth();



export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

    //Authenticating with Wallet
const login = async () => {
  const requestId = 'login2'
  const dappName = 'Celo Dapp'
  const callback = Linking.makeUrl('/my/path')

  console.log("coins coins")

  requestAccountAddress({
    requestId,
    dappName,
    callback,
  })

  // Wait for the Celo Wallet response
  try{
    const dappkitResponse = await waitForAccountAuth(requestId)
    // Set the default account to the account returned from the wallet
    console.log("coins2 coins2")
    kit.defaultAccount = dappkitResponse.address
  }catch(error){
     console.log("the error",error)
     RNRestart.Restart();
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
  
  storeProfile(cUSDBalance,kit.defaultAccount,celoBalance)
  // Update state
  //this.setState({ cUSDBalance, 
                  //isLoadingBalance: false,
                  //address: dappkitResponse.address, 
                  //phoneNumber: dappkitResponse.phoneNumber })
}

async function storeProfile(cUSD,address,celo){
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log("User is")
      console.log(uid)
       db.collection("database")
      .doc(uid).set({
      address: address,
      cUSD: cUSD,
      celo:celo,
      stakevalue:"0",
      validator:""
    })
    console.log(cUSD)
   
    
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
 

}


  const onLogin = async () => {
    
    try {
      if (email !== '' && password !== '') {
        
        await auth.signInWithEmailAndPassword(email, password);
      
        //authenticate with the wallet
       login()

      }
    } catch (error) {
      setLoginError(error.message);
      console.log("jukuiu")
    }
  };
  return (
    <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      <Heading size="xl" fontWeight="600" color="coolGray.800">
        Welcome
        </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
        </Heading>

      <VStack space={3} mt="10">
        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xl',
              fontWeight: 200,
            }}>
            Email ID
            </FormControl.Label>
          <Input size="2xl" onChangeText={text => setEmail(text)}  />
        </FormControl>
        <FormControl mt="5">
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xl',
              fontWeight: 200,
            }}>
            Password
            </FormControl.Label>
          <Input type="password" onChangeText={text => setPassword(text)}/>
          <Link
            _text={{ fontSize: 'xs', fontWeight: '500', color: 'primary.500' }}
            alignSelf="flex-end"
            mt="1">
            Forget Password?
            </Link>
        </FormControl>
        <Button onPress={onLogin} size="lg" mt="5" color="primary.900" _text={{ color: 'white' }}>
          Sign in
          </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I'm a new user.{loginError}
          </Text>
          <Link
            _text={{
              color: 'primary.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={() => navigation.navigate('Register')}
          >
            Sign Up
            </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
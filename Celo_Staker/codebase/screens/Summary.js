import React,{useState, useEffect} from "react"
import { HStack, Button, Input, Text, Box, Center, NativeBaseProvider, Heading, Spacer, Flex, Link,
IconButton, ChevronLeftIcon, VStack, Spinner, Pressable} from "native-base"

import { exchangeCelo } from "../web3/getCeloData";

import Firebase from '../config/firebase';
import 'firebase/firestore';
import { fontWeight } from "styled-system";
import { asin } from "react-native-reanimated";
const db = Firebase.firestore();
const auth = Firebase.auth();
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHome, faRedoAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'


export default function Summary ({route, navigation}){
  
  const {amount, address, cUSD} = route.params
  const [validator, setValidator] =useState("")
  const [stakeValue, setStakeValue] =useState("")
  const [ ownerAddress, setOwnerAddress] = useState("")
  const [total, setTotal]= useState("")
  const [loading, setLoader] = useState(false)
  const [userId, setUserId] = useState("")
  const [error, setError] = useState(false)
  const [nullValidator, setNullValidator] = useState("")
  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          var uid = user.uid;
          console.log(uid)
          setUserId(uid)
          
          //fetch data from firestore
         
            var docRef =  db.collection("database").doc(uid);

            docRef.get().then((doc) => {
                if (doc.exists) {
                  
                    const validation =  doc.data()["validator"]
                    const staking =  doc.data()["stakevalue"]
                    const myAddress =  doc.data()["address"]
                    setValidator(validation)
                    setStakeValue(staking)
                    setOwnerAddress(myAddress)
                    console.log("The address is: ", validator)

                    if(doc.data()["validator"] ==""){
                      setNullValidator("No validator set")
                      
                    }
                    
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
         
          console.log(amount," ",stakeValue)
          
          //end of fetch data from firestore
         // ...
        } else {
          // User is signed out
          // ...
        }
      });
      setTotal(parseFloat(amount)+ parseFloat(stakeValue))
   
  });
  //"amount":amount, "channelType":"phone", "coin":coin, "address":address
  ///const { amount, channelType, coin, address } = route.params;
  //console.log("Summarising: ",amount," ",channelType, coin, address )

  const tryAgain = async()=>{
    setLoader(true)
    setError(false)
    transact()
  }

  const goToHome= ()=>{
    setError(false)
    navigation.navigate("Root")
  }

  const transact = async()=>{
    setLoader(true)
    const results = await exchangeCelo(address, stakeValue, parseFloat(amount), ownerAddress)
    if(results){
      receiptsFunction()
    setLoader(false)
    navigation.navigate("Thankyou")
    }else{
      console.log("results ",results)
      setLoader(false)
      setError(true)
      
    }
    
  }

  const receiptsFunction = async()=>{
   
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log("uploading receipts")
          var uid = user.uid;
           db.collection("database")
          .doc(uid).collection("transactions").add({
            id:uuidv4(),
            detail:"Sent Celo",
            amount:amount
           }) 
           if(stakeValue != "0"){
            db.collection("database")
            .doc(uid).collection("transactions").add({
              id:uuidv4(),
              detail:"Staked Celo",
              amount:stakeValue
             })  
           }
                // ...
        } else {
          // User is signed out
          // ...
        }
      });
     
 
  }
 
  if(error){
    return(
      <Center flex={1} px="3">
          <VStack space={4} alignItems="center">
            <HStack pb="5"><FontAwesomeIcon  mr="10px" pt="1px" size="25px" color="#003F5E"  icon={ faExclamationTriangle} />
                    <Heading fontSize="24px" textAlign="center" > Error Occured</Heading>
            </HStack>
            <HStack>
              <VStack paddingRight="10">
                <Pressable onPress={()=>{tryAgain()}}>
                <Center><FontAwesomeIcon color="#003F5E" mr="13px" pt="1px"    icon={ faRedoAlt} /></Center>
                <Text fontWeight="bold">Try Again</Text>
                </Pressable>
              </VStack>
             
              <VStack paddingLeft="10">
              <Pressable onPress={()=>{goToHome()}}>
              <Center><FontAwesomeIcon color="#003F5E" ml="13px" pt="1px"   icon={ faHome} /></Center>
              <Text fontWeight="bold">Home</Text>
              </Pressable>
              </VStack>
            </HStack>
          
              
              
          </VStack>
      </Center>
      )
    
  }

  if(loading){
    return (
      <Center flex={1} px="3">
          <VStack space={4} alignItems="center">
          
              <Heading textAlign="center" mb="10">
                  Processing Transaction
      </Heading>
              <Spinner size="lg" />
          </VStack>
      </Center>

  )
  }else{
    return (
      <NativeBaseProvider >
         <Box safeAreaTop backgroundColor="primary.900" />
        <Box bg="white" flex={1}> 
        <HStack bg='primary.900' px="1" py="3" justifyContent='space-between' alignItems='center'>
                      <HStack space="4" alignItems='center'>
                          <IconButton onPress={()=>navigation.navigate("Channel",{"amount":amount, "cUSD":cUSD})} icon={<ChevronLeftIcon size="md" color="white" />} />
  
                          <Text color="white" fontSize="20" fontWeight='bold'>Summary</Text>
                      </HStack>
                      
                  </HStack>
       
        <Box p="5" >
          <Text color="#000" mt="3" fontWeight="medium" fontSize={20}>
            Sending To
          </Text>
          <Text mt="2" fontSize={14} color="#393E46">
          {address}
          </Text>
        </Box>
        <VStack p="5" >
          <Text color="#000" mt="3" fontWeight="medium" fontSize={20}>
            Validator Address
          </Text>
          <Text  fontSize={14} color="#393E46">
          {validator}
          </Text>
          {validator =="" &&
          <Text color="#F90716"  fontWeight="bold" fontSize={14}>
          {nullValidator}
        </Text>
        }
          <Link
               
               isUnderlined={false}
               _text={{
                   color: 'primary.500',
                   fontSize:"xs",
                   fontWeight:"bold"
               }}
               onPress={()=>navigation.navigate("Validator")}
           >
               Change Validator
   </Link>
        </VStack>
        <Box >
          <Box p="5">
        <HStack alignItems="flex-start">
            <Text fontSize={16} color="#000" fontWeight="medium">
              Amount
            </Text>
            <Spacer />
            <Text fontSize={15} fontWeight="bold" color="#393E46">
              ${amount}
            </Text>
          </HStack>
          </Box>
          <Box p="5">
          <HStack alignItems="flex-start">
            <Text fontSize={16} color="#000" fontWeight="medium">
              Stake Value
            </Text>
            <Spacer />
            <Text fontSize={15} fontWeight="bold" color="#393E46">
              ${stakeValue}
            </Text>
          </HStack>
          
          <Flex>
            
            <Link
               
               isUnderlined={false}
               _text={{
                   color: 'primary.500',
                   fontSize:"xs",
                   fontWeight:"bold"
               }}
               onPress={()=>navigation.navigate("Settings")}
           >
               Change stake amount
   </Link>
          </Flex>
          </Box>
         
          
        </Box>
        </Box>
        
  
        <Box  bg="#fff" safeAreaTop>
        
         <HStack alignItems="center" safeAreaBottom shadow={6}>
  
             <Button
                 size="lg"
                 bg="primary.900"
                 flex={1}
                 onPress={()=>transact()}
  
             >
                 Send Now
             </Button>
            
         </HStack>
     </Box>
      </NativeBaseProvider>
    )
  }
  
  
}
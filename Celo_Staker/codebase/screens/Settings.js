import React, { useState, useEffect } from "react"
import { HStack, Button, Input, Text, Box, Center, NativeBaseProvider, Heading, Spacer, Flex, IconButton 
,ChevronLeftIcon, Link,
VStack} from "native-base"

import Firebase from '../config/firebase';
import 'firebase/firestore';
const db = Firebase.firestore();
const auth = Firebase.auth();

export default function Settings ({navigation}) {
  const [stakeValue, setStakeValue] = useState("")
  const [address, setAddress] = useState("")
  const [validator, setValidator] = useState("")
  const [nullValidator, setNullValidator] = useState("")


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("caled again")
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          var uid = user.uid;
          
          //fetch data from firestore
          var docRef = db.collection("database").doc(uid);

          docRef.get().then((doc) => {
              if (doc.exists) {
                setStakeValue(doc.data()["stakevalue"])
                setAddress(doc.data()["address"])
                setValidator(doc.data()["validator"])
                console.log("valids", doc.data()["validator"])
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
          //end of fetch data from firestore
          

          // ...
        } else {
          // User is signed out
          // ...
        }
      });
   
  },[]);

  async function storeStakeValue(stake){
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        var staking = db.collection("database").doc(uid);
       
        return staking.update({
          stakevalue:  stakeValue
      })
      .then(() => {
          console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
      
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
  return (
    <NativeBaseProvider >
      <Box safeAreaTop backgroundColor="primary.900" />
      
      <HStack bg='primary.900' px="1" py="3" justifyContent='space-between' alignItems='center'>
                      <HStack space="4" alignItems='center'>
                          <IconButton onPress={()=>navigation.navigate("Root")} icon={<ChevronLeftIcon size="md" color="white" />} />
  
                          <Text color="white" fontSize="20" fontWeight='bold'>Settings</Text>
                      </HStack>
                      
                  </HStack>
        <Box p="2" bg="#fff" flex={1} justifyContent="space-between">
      
      <VStack alignItems="flex-start">
              <Text fontSize={16} color="#000" fontWeight="medium">
              Address
              </Text>
              <Spacer />
              <Text fontSize={14} color="#393E46">
              {address}
              </Text>
            </VStack>
     
            <VStack>
          <HStack mt="8" alignItems="flex-start">
            <Text fontSize={16} color="#000" fontWeight="medium">
              Stake Value
          </Text>
            <Spacer />
            <Input
            value={stakeValue}
            onChangeText={(value)=>{setStakeValue(value)}}
            w={{
              base: "25%",
              md: "25%",
            }}
            InputLeftElement={
              <Text fontWeight="bold">$</Text>
            } fontWeight="bold" size="md" variant="filled"  />

          </HStack>
         
          </VStack>
           
         <VStack>
         <Text color="#000" mt="3" fontWeight="medium" fontSize={16}>
          Validator Address
        </Text>
        {validator =="" &&
          <Text color="#F90716"  fontWeight="bold" fontSize={14}>
          {nullValidator}
        </Text>
        }
        <Text mt="1" fontSize={14} color="#393E46">
          {validator}
        </Text>
        <Flex>
            
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
          </Flex>
        </VStack>   
          
         
      </Box>
      
      <Box pt="4" bg="#fff" safeAreaTop>
        <Button bg="primary.900" onPress={()=>{storeStakeValue(stakeValue)}}>Save</Button>
    </Box>

      
      
    </NativeBaseProvider>
  )
}
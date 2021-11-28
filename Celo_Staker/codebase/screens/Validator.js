import React, { useState } from "react"
import {
  Radio,
  Heading,
  FlatList,
  Pressable,
  Text,
  Box,
  HStack,
  Spacer,
  Flex,
  Center,
  IconButton,
  ChevronLeftIcon,
  NativeBaseProvider,
} from "native-base"
import { NavigationContainer } from "@react-navigation/native"
import { fontWeight } from "styled-system"

import Firebase from '../config/firebase';
import 'firebase/firestore';
const db = Firebase.firestore();
const auth = Firebase.auth();



export default function Example({navigation}) {
  const [value, setValue] = React.useState("kdfihfidjfdhfi25jkjr633")
  

  async function storeValidators(validator){
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log("User is in validators")
        console.log(validator)
        setValue(validator)
        var myValidator = db.collection("database").doc(uid);
       return myValidator.update({
        validator: validator,
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

  const data = [
    {
      "name":"Celo labs 1",
      "address":"0x87614eD7AF361a563C6a3624CcadD52e165f67C2",
      "lockedCelo":"10,829",
      "groupShare":"50%",
      "voterRewards":"40",
      "votes":"0.4%"
    },
    {
      "name":"Celo labs 2",
      "address":"0x87614eD7AF361a563C6a3624CcadD52e165f6832",
      "lockedCelo":"10,829",
      "groupShare":"50%",
      "voterRewards":"40",
      "votes":"0.9%"
    },
    {
      "name":"Censusworks",
      "address":"0x87614eD7AF361a563C6a3624CcadD52e165f8960",
      "lockedCelo":"10,829",
      "groupShare":"50%",
      "voterRewards":"40",
      "votes":"3%"
    }
  ]
  
    return (
      <NativeBaseProvider>
         <Box safeAreaTop backgroundColor="primary.900" mb="2"/>
        
      <Box
        
      > <HStack>
         <IconButton pt="3" onPress={()=>navigation.navigate("Root")} icon={<ChevronLeftIcon size="md" color="#000" />} />
        <Heading fontSize="xl" p="4" pb="3">
          Validators
        </Heading>

      </HStack>
        
       
        <FlatList
  
          data={data}
          renderItem={({ item }) => (
            <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={(validatorAddress) => {
              storeValidators(validatorAddress)
            }}
          >
            <Box width="90%" p="5" mr="5" ml="5" mt="2" rounded="7" bg="cyan.700">
            <HStack>
              <Radio value={item.address} >
              {item.name}
            </Radio>
              </HStack>
              <HStack alignItems="flex-start">
                <Text fontSize={12} color="cyan.50" fontWeight="medium">
                Locked CELO({item.lockedCelo})
                </Text>
                <Spacer />
                <Text fontSize={12} color="cyan.100">
                Group Share({item.groupShare})
                </Text>
              </HStack>
              <HStack alignItems="flex-start">
                <Text fontSize={12} color="cyan.50" fontWeight="medium">
                Votes({item.votes})
                </Text>
                <Spacer />
                <Text fontSize={12} color="cyan.100">
                Voter Rewards({item.voterRewards})
                </Text>
              </HStack>
              
              <Text color="cyan.50" mt="3" fontWeight="bold" fontSize={11}>
              {item.address}
              </Text>
            </Box>
          </Radio.Group>
          )}
          keyExtractor={(item) => item.address}
        />
       
      </Box>
      </NativeBaseProvider>
    )
  
 
}



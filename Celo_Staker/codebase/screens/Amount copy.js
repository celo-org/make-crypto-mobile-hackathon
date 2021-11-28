import React, { Component, useState, useEffect } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { VStack, CheckIcon, Select,Heading, HStack, Link, Flex, Spacer, Button, Box, Center, Pressable,
    Icon } from "native-base";

import VirtualKeyboard from 'react-native-virtual-keyboard';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Firebase from '../config/firebase';
import 'firebase/firestore';
const db = Firebase.firestore();
const auth = Firebase.auth();


export default function Amount({ route,navigation }) {
    const [coin, setCoin] = useState("cUSD")
    const [amount, setAmount] = useState('');
    const {celo, cUSD} = route.params;
    const [max, setMax] =useState("")
    const [stakeValue, setStakeValue] = useState("")
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
              var uid = user.uid;
              //fetch data from firestore
              var docRef = db.collection("database").doc(uid);
    
              docRef.get().then((doc) => {
                  if (doc.exists) {
                     
                    setStakeValue(doc.data()["stakevalue"])
                    
                    console.log("The address is: ", stakeValue)
                      
                  } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                  }
              }).catch((error) => {
                  console.log("Error getting document:", error);
              });
              //end of fetch data from firestore
    
              const joy = async ()=>{
                //const data = await getData(address)
              
                //setcUSD(data["cUSD"])
    
                //setCelo(data["Celo"])
                //console.log(data)
              }
              
              joy()
              
    
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
          if(cUSD > stakeValue){
            setMax(cUSD-stakeValue)
            console.log(cUSD,"herehe",stakeValue)
          }else{
              console.log("reduce the stake value to proceed")
          }
          
       
      });

    return (
        <>
         <Box safeAreaTop backgroundColor="primary.900" mb="2"/>
          <VStack mb="2" alignItems="center" space={4}>
      <Select
        selectedValue={coin}
        minWidth="200"
        accessibilityLabel="Send To Mobile"
        placeholder="Send To Mobile"
        defaultValue="Send To Address"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => setCoin(itemValue)}
      >
        <Select.Item label="Send Celo" value="celo" />
        <Select.Item label="Send cUSD" value="cUSD" />
      </Select> 
    </VStack>
    {coin == "celo" &&
    <>
     <View style={styles.container}>
     <Heading fontSize="5xl" fontWeight={900} textAlign="center" >${amount}</Heading>
     <HStack mt="6" justifyContent="center">
         <Text fontSize="md" color="muted.700" fontWeight={400}>
             ${celo}
         </Text>
         <Link
             mt={-1}
             isUnderlined={false}
             _text={{
                 color: 'primary.500',
                 fontWeight: 'medium',
                 fontSize: 'md',
             }}
             onPress={()=>setAmount(celo)}
         >
             Max
 </Link>
     </HStack>
     <VirtualKeyboard decimal={true} fontWeight="bold" color='black' pressMode='string' onPress={(val) => setAmount(val)} />


 </View>
 <Box bg="white" safeAreaTop>
 <Center flex={1}></Center>
 <HStack bg="primary.900" alignItems="center" safeAreaBottom shadow={6}>

     <Pressable
         py="2"
         flex={1}

     >
         <Center>
             <Icon
                 mb={1}
                 as={Ionicons} name="md-arrow-back"
                 size={36}
                 color="white"
                 size="sm"
             />
             <Text color="white" fontSize={12}>
                 Back
</Text>
         </Center>
     </Pressable>
     <Pressable
         py="2"
         flex={1}
         onPress={() => navigation.navigate("Channel",{"amount":amount, "coin":"celoGold"})}
     >
         
         <Center>
             <Icon
                 mb={1}
                 as={Ionicons} name="arrow-dropright-cicle"
                 size={36}
                 color="white"
                 size="sm"
             />
             <Text color="white" fontSize="18">
                 Next
</Text>
         </Center>
     </Pressable>
 </HStack>
</Box>
</>
    }
    {coin =="cUSD" &&
    <>
     <View style={styles.container}>
     <Heading fontSize="5xl" fontWeight={900} textAlign="center" >${amount}</Heading>
     <HStack mt="6" justifyContent="center">
         <Text fontSize="md" color="muted.700" fontWeight={400}>
             ${max}
         </Text>
         <Link
             mt={-1}
             isUnderlined={false}
             _text={{
                 color: 'primary.500',
                 fontWeight: 'medium',
                 fontSize: 'md',
             }}
             onPress={()=>setAmount(cUSD)}
         >
             Max
 </Link>
     </HStack>
     <VirtualKeyboard decimal={true} fontWeight="bold" color='black' pressMode='string' onPress={(val) => setAmount(val)} />


 </View>
       <Box bg="white" safeAreaTop>
       <Center flex={1}></Center>
       <HStack bg="primary.900" alignItems="center" safeAreaBottom shadow={6}>

           <Pressable
               py="2"
               flex={1}

           >
               <Center>
                   <Icon
                       mb={1}
                       as={Ionicons} name="md-arrow-back"
                       size={36}
                       color="white"
                       size="sm"
                   />
                   <Text color="white" fontSize={12}>
                       Back
     </Text>
               </Center>
           </Pressable>
           <Pressable
               py="2"
               flex={1}
               onPress={() => navigation.navigate("Channel", {"amount":amount, "coin":"cUSD"})}
           >
               
               <Center>
                   <Icon
                       mb={1}
                       as={Ionicons} name="arrow-dropright-cicle"
                       size={36}
                       color="white"
                       size="sm"
                   />
                   <Text color="white" fontSize="18">
                       Next
     </Text>
               </Center>
           </Pressable>
       </HStack>
   </Box>
    </>
    }
    </>
           
           

      
       

    );
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    textInput: {
        height: 34,
    }
});


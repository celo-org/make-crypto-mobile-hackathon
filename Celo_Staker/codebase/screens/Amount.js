import React, { Component, useState, useEffect } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { VStack, CheckIcon, Select,Heading, HStack, Link, Flex, Spacer, Button, Box, Center, Pressable, ChevronLeftIcon,
    ChevronRightIcon,Icon } from "native-base";

import VirtualKeyboard from 'react-native-virtual-keyboard';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Firebase from '../config/firebase';
import 'firebase/firestore';
const db = Firebase.firestore();
const auth = Firebase.auth();


export default function Amount({ route,navigation }) {
    const [coin, setCoin] = useState("cUSD")
    const [amount, setAmount] = useState('');
    const [notice, setNotice] = useState(false)
    const [amountNotice, setAmountNotice] = useState(false)
    const {cUSD} = route.params;
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
          if(parseFloat(cUSD) > parseFloat(stakeValue)){
              const maxValue =parseFloat(cUSD)-parseFloat(stakeValue) 
              
            setMax(parseFloat(maxValue).toFixed(2))
            setNotice(false)
            console.log(cUSD,"herehe",stakeValue)
          }else{
              setNotice(true)
              console.log("reduce the stake value to proceed")
              console.log(cUSD,"herehe",stakeValue)
          }

      });

      const next = async()=>{
        if(parseFloat(amount) > parseFloat(max)){
          setAmountNotice(true)
        }else if(parseFloat(amount) < parseFloat(max) && parseFloat(amount)!=""){
            setAmountNotice(false)
            navigation.navigate("Channel", {"amount":amount, "coin":"cUSD", "cUSD":cUSD})
        }
    }
    

    return (
        <>
         <Box safeAreaTop backgroundColor="primary.900" mb="2"/>
          <VStack mb="2" alignItems="center" space={4}>
          {notice ==true &&
          
              <HStack mt="6" justifyContent="center">
         <Text fontSize="sm" color="muted.700" fontWeight={400}>
             Reduce your 
         </Text>
         <Link
             mt={-1}
             pl={1}
             pr={1}
             isUnderlined={false}
             _text={{
                 color: 'primary.500',
                 fontWeight: 'medium',
                 fontSize: 'md',
             }}
             onPress={()=>{navigation.navigate("Settings")}}
         >
             stake 
 </Link>
             <Text fontSize="32px" color="muted.700" fontWeight={400}>value to continue.</Text>
     </HStack> }
     {amountNotice ==true &&
          
          <HStack mt="6" justifyContent="center">
     <Text fontSize="sm" color="red" fontWeight={400}>
         The amount specified is greater than your max amount
     </Text>
 </HStack> }
         </VStack>
   
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
               onPress={()=>{navigation.navigate("Root")}}

           >
               <Center>
                   <ChevronLeftIcon
                       size={36}
                       color="white"
                       size="xl"
                   />
                   
               </Center>
           </Pressable>
           <Pressable
               py="2"
               flex={1}
               onPress={() => next()}
           >
               
               <Center>
                   <ChevronRightIcon
                       size={40}
                       color="white"
                       size="xl"
                   />
                 
               </Center>
           </Pressable>
       </HStack>
   </Box>
    </>
    
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


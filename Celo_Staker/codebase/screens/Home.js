import React, { useState, useEffect } from "react";
import { LogBox } from "react-native"
import {
    FlatList, Avatar, ScrollView, Heading, Spacer, Flex, Image, VStack, HStack, Button,
    IconButton, Icon, Text, NativeBaseProvider, Center, Box, Container, StatusBar, Divider, Spinner,  HamburgerIcon
} from "native-base";
import { Ionicons, FontAwesome } from '@expo/vector-icons';


import { Platform } from 'react-native';
//import { Ionicons, FontAwesome } from '@expo/vector-icons';

import {kit } from '../root'
//const {login} = require('../web3/index');
import { requestAccountAddress, waitForAccountAuth } from "@celo/dappkit";
import * as Linking from 'expo-linking'
LogBox.ignoreLogs(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream'])
//import { requestAccountAddress, waitForAccountAuth } from "@celo/dappkit";
//import { Linking } from "expo";

import { getData, blockLogin } from "../web3/getCeloData";
import Firebase from '../config/firebase';
import 'firebase/firestore';
const db = Firebase.firestore();
const auth = Firebase.auth();

import RNRestart from 'react-native-restart';




export default function Home({ navigation }) {

    const [userName, setUserName] = useState("")
    const [cUSD, setcUSD] = useState("")
    const [celo, setCelo] = useState("")
    const [address, setAddress] = useState("")
    const [rewards, setRewards] = useState("")
    const [loading, loadingStatus] = useState(true)
    const [receipts, setReceipts] = useState([])
    const [userId, setUserId] = useState()


    //const blockLogin= async ()=>{
   

    

    useEffect(() => {
        //let isMounted = true;  
        
            console.log("first async")
         auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;

                //fetch data from firestore
               

                db.collection("database").doc(uid).get().then((doc) => {
                    setUserId(uid)
                    console.log("the  uid is: ",uid)
                    if (doc.exists) {
                        //If document exist then it is a returning user
                         setAddress(doc.data()["address"])
                       //Getting cUSD 
                        const joy = async () => {
                        const data = await getData(doc.data()["address"])
                        setcUSD(data["cUSD"])
                        setCelo(data["Celo"])
                        loadingStatus(false)
                        console.log(data)
                        }
                        joy()

                    } else {
                        // This is a first time user
                        
                        const blockData = async ()=>{
                            console.log("awaiting data")
                            try{
                                const {cUSDBalance, account, celoBalance } = await blockLogin()
                                console.log("cUSDBalance ",cUSDBalance)
                                console.log("cUSDBalance ",uid)
                            if(uid){
                                db.collection("database")
                                .doc(uid).set({
                                address: account,
                                cUSD: cUSDBalance,
                                celo:celoBalance,
                                stakevalue:"0",
                                validator:""
                              })
                              //set Loading to false
                              loadingStatus(false)
                              
                            }
                            }catch(error){
                                console.log(error)
                                console.log("the error happened")
                            }
                        }

                        blockData()
                        console.log("No such document!");
                        //RNRestart.Restart();
                        
                        //onLogout()
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                    RNRestart.Restart();
                });

                // Getting transaction data
                const transData = []
                db.collection("database").doc(uid).collection("transactions").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        //console.log(doc.id, " => ", doc.data());
                        transData.push({"id":doc.data().id, "amount":doc.data().amount, "detail":doc.data().detail})
                    });
                }).catch((error) => {
                    console.log("Error getting document:", error);
                    onLogout()
                });
                setReceipts(transData)
                console.log(transData)
                
            } else {
                // User is signed out
                // ...
            }
        });
        console.log("The address is hehe: ", address)
        
    },[]);

    useEffect(()=>{

        db.collection("database").doc(userId).get().then((doc) => {
            
            if (doc.exists) {
                //If document exist then it is a returning user
                 setAddress(doc.data()["address"])
               //Getting cUSD 
                const joy = async () => {
                const data = await getData(doc.data()["address"])
                setcUSD(data["cUSD"])
                setCelo(data["Celo"])
                loadingStatus(false)
                console.log(data)
                }
                joy()

                 // Getting transaction data
                 const transData = []
                 db.collection("database").doc(userId).collection("transactions").get().then((querySnapshot) => {
                     querySnapshot.forEach((doc) => {
                         // doc.data() is never undefined for query doc snapshots
                         //console.log(doc.id, " => ", doc.data());
                         transData.push({"id":doc.data().id, "amount":doc.data().amount, "detail":doc.data().detail})
                     });
                 }).catch((error) => {
                     console.log("Error getting document:", error);
                     onLogout()
                 });
                 setReceipts(transData)

            } 
        })
    },[])


    

    async function onLogout() {

        try {
            await auth.signOut();
        } catch (error) {
            console.log(error);
        }
    }
    


    if (loading) {
        return (
            <Center flex={1} px="3">
                <VStack space={4} alignItems="center">
                    <Heading textAlign="center" mb="10">
                        Loading Data
            </Heading>
                    <Spinner size="lg" />
                </VStack>
            </Center>

        )
    } else {
        return (
            <>
                <StatusBar backgroundColor="primary.900" barStyle="light-content" />

                <Box safeAreaTop backgroundColor="primary.900" />

                <HStack bg='primary.900' px="1" py="3" justifyContent='space-between' alignItems='center'>
                    <HStack space="4" alignItems='center'>
                        <IconButton onPress={navigation.openDrawer} icon={<HamburgerIcon size="sm" color="white" />} />

                        <Text color="white" fontSize="20" fontWeight='bold'>Home</Text>
                    </HStack>
                    
                </HStack>


                <Box bg="primary.900" h="100%">


                    <Box bg="primary.900" h="13%"></Box>
                    <Center>
                        <Box bg="#fff" h="100%" w="90%">
                            <Center>

                                <Avatar size={150} mt="-20" bg="#fff">
                                    <Heading color="primary.900" fontWeight={900}>$0</Heading>
                                    <Text fontWeight={800}>Rewards</Text>
                                </Avatar>

                                <Center mt="-7">
                                    <Flex direction="row">
                                        <Flex mx="5">
                                            <Text fontWeight={800}>cUSD</Text>
                                            <Center><Text fontWeight={500} fontSize="md">${cUSD}</Text></Center>
                                        </Flex>

                                        <Flex mx="5">
                                            <Text fontWeight={800}>Celo</Text>
                                            <Center><Text fontWeight={500} fontSize="md">${celo}</Text></Center>
                                        </Flex>


                                    </Flex>
                                </Center>
                                <Flex direction="row" mt="5" mb="5">
                                    <Button width="50%" bg="primary.900" mx="5" onPress={() => { navigation.navigate("Amount", { "celo": celo, "cUSD": cUSD }) }}>Send Celo</Button>


                                </Flex>
                                <Divider my="3" />
                            </Center>

                            <Box
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                            >
                                <Heading color="primary.900" fontSize="xl" pl="2" pb="3">
                                    Transactions
      </Heading>
                                <FlatList
                                    data={receipts}
                                    renderItem={({ item }) => (
                                        <Box
                                            borderBottomWidth="1"
                                            _dark={{
                                                borderColor: "gray.600",
                                            }}
                                            borderColor="coolGray.200"
                                            pl="4"
                                            pr="5"
                                            py="2"
                                        >   
                                        
                                       
                                            <HStack justifyContent="space-between" >
                                                <HStack>
                                                <Avatar size="sm" bg="primary.100"> T</Avatar>
                                                <Text
                                                        p="1.5"
                                                        _dark={{
                                                            color: "warmGray.50",
                                                        }}
                                                        color="coolGray.800"
                                                        bold
                                                    >
                                                        {item.detail}
                                                    </Text>
                                                </HStack>
                                               
                                                    <Spacer/>
                                                    <Text
                                                    p="1.5"
                                                    fontSize="xs"
                                                    _dark={{
                                                        color: "warmGray.50",
                                                    }}
                                                    color="coolGray.800"
                                                    alignSelf="flex-start"
                                                >
                                                    ${item.amount}
                                                </Text>
                                                
                                                
                                                
                                            </HStack>
                                            
                                          
                                        </Box>
                                    )}
                                    keyExtractor={(item) => item.id}
                                />
                            </Box>
                        </Box>

                    </Center>
                </Box>





            </>
        )
    }
}


import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, Button, View, Pressable, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Constants from 'expo-constants';


import { web3, kit } from './root'
import {   
    requestTxSig,
    waitForSignedTxs,
    requestAccountAddress,
    waitForAccountAuth,
    FeeCurrency
  } from '@celo/dappkit'
import { toTxResult } from "@celo/connect"
import * as Linking from 'expo-linking'
import { task_contract } from './pages/abi';


const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'column',
      backgroundColor: "#E8DED8",
      flex: 1,
      paddingTop: 60
    },
    submitContainer:{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'column',
      margin: 40,
      backgroundColor: "#E8DED8",
    },
    buttonContainer: {
      //paddingTop: 180,
      margin: 30,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        margin: 5,
        // padding: 30,
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FFCF00',
        margin: 5,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    space: {
        width: 150, 
        height: 60,
    },
  });


const Task = ({ route, navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);  
    const [carouselItems, setCarouselItems] = useState([]);
    const { taskID, user_address, contract_address, labels, datasize } = route.params;
    const [message, setMessage] = useState("");
    const [userLabels, setUserLabels] = useState({
        "reviewer": user_address,
        data: { }
    });

    const fetchTaskDataset = async () => {
        const dataset_response = await fetch(`https://us-central1-aster-38850.cloudfunctions.net/api/task/data/${taskID}/${user_address}`);
        const dataset_json = await dataset_response.json();
        setCarouselItems(dataset_json);
    }

    useEffect(() => {
        fetchTaskDataset();
    }, []);

    const submitLabels = async () => {
        const response = await fetch(`https://us-central1-aster-38850.cloudfunctions.net/api/task/${taskID}/submit`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLabels),
        });
        const json = await response.json();
        console.log(json);
        if(json == "Data submitted")
            setMessage("task completed!");
        else
            setMessage("submission failed!");
    };

   
    const labelButtonPressed = (answer, index) => {
        console.log(index + " " + answer);
        setUserLabels({
           ...userLabels,
           data: {
               ...userLabels.data,
               [index]: answer
           }
        });
    };

    const claimReward = async () => {
        // Check the Celo network ID
      const networkId = 44787;
      
      // Create a new contract instance
      const TaskContract = new web3.eth.Contract(
        task_contract.abi, contract_address
      );

      const requestId = 'claim_reward'
      const dappName = 'Aster'
      const callback = Linking.makeUrl('/my/path')
  
      // Create a transaction object to update the contract 
      const txObject = await TaskContract.methods.submission(user_address)
  
      // Send a request to the Celo wallet 
      requestTxSig(
        kit,
        [
          {
            from: user_address,
            to: contract_address,
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
  
      console.log(`Task contract update transaction receipt: `, result) 
      setMessage("reward sent successfully!");
    }

    const renderItem = ({item,index}) => {
        // console.log("current card: ", activeIndex);
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                        textAlign: 'center'
                        }}>Progress: {activeIndex+1}/{datasize}</Text>
                <Text style={{paddingBottom: 10}}>selected: {userLabels.data[activeIndex]}</Text>
                <Image style = {{ width: 300, height: 300 }} source={{ uri: carouselItems[index] }}/>
                <ScrollView style={styles.buttonContainer}>
                    {
                        labels.map((item, index) => (
                            <View key={index} style={styles.space}>
                                <Pressable style={styles.button} onPress={() => labelButtonPressed(item, activeIndex)}>
                                    <Text style={styles.text}>{item}</Text>
                                </Pressable>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }

    return (
       
        <View style={styles.container}>
            <Carousel
                layout={"default"}
                data={carouselItems}
                sliderWidth={400}
                itemWidth={300}
                sliderHeight={1000}
                itemHeight={300}
                renderItem={renderItem}
                onSnapToItem = { index => setActiveIndex(index) }
                // loop={true} 
            />
             {
                (activeIndex+1) == datasize ?
                <View style={styles.submitContainer}>
                    <Pressable style={styles.submitButton} onPress={submitLabels}>
                        <Text style={styles.text}>submit</Text>
                    </Pressable>
                    <Text style={{ fontSize: 16,
                        lineHeight: 21,
                        fontWeight: 'bold',
                        letterSpacing: 0.25,
                        color: 'black',
                        textAlign: 'center'
                        }}>
                    {message}</Text>
                    {
                        message == "task completed!" ? 
                        <Pressable style={styles.submitButton} onPress={claimReward}>
                            <Text style={styles.text}>claim reward</Text>
                        </Pressable>
                        : 
                        <></>
                    }
                </View>
                :
                <></>
            }

           
          
        </View>
    );
}


export default Task;
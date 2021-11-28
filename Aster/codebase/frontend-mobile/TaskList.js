import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, Button, View, Pressable, Linking, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Constants from 'expo-constants';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight + 50,
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection:'row',
      backgroundColor: "#E8DED8"
    },
    textTag: {
        backgroundColor: "#FFCF00",
        color: '#ffffff',
        alignSelf: 'flex-start', // keep background color to text area only
        padding: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10, 
        overflow: 'hidden',
    },
    textTag2:{
        backgroundColor: "#36D07F",
        color: '#ffffff',
        alignSelf: 'flex-start', // keep background color to text area only
        padding: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10, 
        overflow: 'hidden',
    },
    link:{
        color: '#228EF7',
        textDecorationLine: 'underline'
    },
    card:{
        margin: 10,
    }
  });


const TaskList = ({ route, navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);  
    const [carouselItems, setCarouselItems] = useState([]);
    const { address } = route.params;


    const fetchTaskList = async () => {
        const response = await fetch('https://us-central1-aster-38850.cloudfunctions.net/api/tasks');
        const json = await response.json();
        setCarouselItems(json);
    };

    useEffect(() => {
        fetchTaskList();
    }, []);

    
    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    carouselItems.map((item, index) => (
                        <Pressable key={index} style={styles.card} onPress={() => navigation.navigate('Task', {taskID: item.id, user_address: address, contract_address: item.contract_id, labels: item.labels, datasize: item.dataset.length})} > 
                            <View style={{
                                backgroundColor:'floralwhite',
                                borderRadius: 15,
                                height: 300,
                                padding: 30,
                                marginLeft: 25,
                                marginRight: 25, 
                                justifyContent: 'center'
                                }}>
                                
                                <Text style={{fontSize: 30}}>{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text></Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.textTag}>Pay: {item.total_price / item.number_of_labelers} CELO</Text>
                                    <Image style = {{ width: 20, height: 20, margin: 5 }} source={require("./assets/celo-logo-img.png")} />
                                </View>
                                <Text></Text>
                                <Pressable onPress={()=>{Linking.openURL(`https://alfajores-blockscout.celo-testnet.org/address/${item.contract_id}/transactions`)}}>
                                    <Text>Contract Address: </Text>
                                    <Text style={styles.link}>{item.contract_id}</Text>
                                </Pressable>
                                <Text></Text>
                                <Text style={styles.textTag2}>Image Classification</Text>
                            </View> 
                        </Pressable>
                    ))
                }
            </ScrollView>
        </View>
    );
}


export default TaskList;
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Alert, Pressable, StyleSheet, Dimensions } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

//components
import Screen from '../../components/Screen';
//config

import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../consts/theme';
import { SIZES } from '../../consts/theme';


const { height } = SIZES.height;


function HelpScreen(props) {

    const [pickerModel, setPickerModel] = useState(false);

    const Data = [
        {
            title: 'Frequently Asked Questions'
        },
        {
            title: 'Raise Account Limit'
        },
        {
            title: 'Ask the Community'
        },
        {
            title: 'Documentation'
        },
        {
            title: 'Contact'
        },
    ]

    return (
        <Screen statusBarColor="#E5E5E5" style={styles.status}>

            {/* Nav */}
            <View style={styles.nav}>

                {/* Menue Icon */}
                <Image style={styles.menu} sty source={require('../../assets/images/menue.png')} />

                {/* Heading */}
                <Text style={styles.heading}>
                    Help
                </Text>
            </View>

            {/* Saperator line and headings */}
            {Data.map((item, i) => (

                <View key={i} style={{ marginTop: i === 0 ? RFPercentage(10) : RFPercentage(3), width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <View style={{ width: '100%', height: 0.3, backgroundColor: COLORS.line }} />
                    <TouchableOpacity onPress={() => i === 1 ? setPickerModel(true) : null} activeOpacity={0.7}>
                        <Text style={{ marginTop: RFPercentage(2.6), marginLeft: RFPercentage(6), color: COLORS.darkBlue, fontSize: RFPercentage(2.6), fontFamily: 'Rubik_400Regular' }}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                    {i === 4 ? <View style={{ width: '100%', height: 0.3, backgroundColor: COLORS.line, marginTop: RFPercentage(3) }} />
                        : null}
                </View>
            ))}

            {/* Model */}
            <Modal visible={pickerModel} transparent={true} >
                <View style={styles.model} >


                    <LinearGradient colors={['#F7EFFA', '#FCF8ED']} start={[1, 1]} end={[1, 0.2]} style={{ alignSelf: 'center', alignItems: "center", justifyContent: 'center', borderRadius: RFPercentage(3), width: "80%", height: RFPercentage(45) }} >
                        <Image style={{ width: RFPercentage(16), height: RFPercentage(16) }} source={require('../../assets/images/model.png')} />
                        <View style={{ width: "90%", marginTop: RFPercentage(1.5), justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ alignSelf: 'center', fontFamily: 'Rubik_400Regular', fontSize: RFPercentage(2.8) }}>
                                Coming Soon
                            </Text>
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.text}>
                                Stay put. You will soon be able to increase your account limit
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => setPickerModel(false)} activeOpacity={0.8} style={{ marginTop: RFPercentage(4) }}>
                            <Text style={{ color: COLORS.darkBlue, fontSize: RFPercentage(2.4), fontFamily: 'Rubik_500Medium' }}>
                                Dismiss
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>

                </View>
            </Modal>



        </Screen>
    );
}



export default HelpScreen;

const styles = StyleSheet.create({

    status: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: "center", 
    backgroundColor: "#E5E5E5"
    
    },
    
    model: {
      justifyContent: "center", 
      flex: 1, 
      height: height,
       width: "100%", 
       backgroundColor: "rgba(0, 0, 0, 0)" 
    },
    
    heading: {
        color: "#333333",
        fontSize: RFPercentage(2.5), 
        fontFamily: 'Rubik_500Medium'
        
        },
    
    nav: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: RFPercentage(3)
    },
        
    menu: {
        width: RFPercentage(5.8), 
        height: RFPercentage(5.8), 
        position: 'absolute', 
        left: RFPercentage(2) 

    },
    
    text: {
        marginTop: RFPercentage(3),
        fontFamily: 'Rubik_400Regular', 
        fontSize: RFPercentage(2.2)

    }
    
    });
import React from 'react';
import { View, Text, Image } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

//components
import Screen from '../../components/Screen';
import MyAppButton from '../../components/MyAppButton';
import { LinearGradient } from 'expo-linear-gradient';

//config
import { COLORS } from '../../consts/theme';

function PinSuccessScreen(props) {
    return (
        <Screen statusBarColor="#E5E5E5" style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#E5E5E5" }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: RFPercentage(-5) }}>
                {/* Success Image */}
                <Image style={{ width: RFPercentage(6), height: RFPercentage(6) }} source={require('../../assets/images/tick.png')} />
                <Text style={{ color: COLORS.darkBlue, marginTop: RFPercentage(2), fontSize: RFPercentage(2.6), fontFamily: "Rubik_500Medium" }}>
                    Success
                </Text>
            </View>

            <View style={{ marginTop: RFPercentage(4), width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#333333', fontSize: RFPercentage(2.1), fontFamily: "Rubik_400Regular" }}>
                    Your PIN has been updated sucessfully.
                </Text>
                <Text style={{ marginTop: RFPercentage(0.8), color: '#333333', fontSize: RFPercentage(2.1), fontFamily: "Rubik_400Regular" }}>
                    Please dont share with anyone.
                </Text>
            </View>

            {/* Button */}
            <View style={{ width: '100%', position: 'absolute', bottom: RFPercentage(6) }}>
                <MyAppButton
                    title="Okay"
                    bold={true}
                    borderradius={RFPercentage(20)}
                    backgroundColor={"#133FDB"}
                    color={COLORS.white}
                    width={"70%"}
                />
            </View>
        </Screen>
    );
}


export default PinSuccessScreen;
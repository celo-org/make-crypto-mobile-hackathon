import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';

//components
import Screen from '../../components/Screen';

//config
import theme from '../../consts/theme';
import { COLORS } from '../../consts/theme';

function ContactScreen(props) {
    return (
        <Screen statusBarColor="#E5E5E5" style={{ flex: 1, justifyContent: 'flex-start', alignItems: "center", backgroundColor: "#F5F5F5" }}>

            {/* Nav */}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: RFPercentage(6) }}>
                {/* Back Icon */}
                <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2), position: 'absolute', left: RFPercentage(2) }} color={COLORS.darkBlue} />
            </View>

            <View style={{ width: '80%', marginTop: RFPercentage(10), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image style={{ width: RFPercentage(8.5), height: RFPercentage(8.5) }} source={require('../../assets/images/text.png')} />
                </TouchableOpacity>
                <Text style={{ color: COLORS.black, fontSize: RFPercentage(2.5), fontFamily: "Rubik_500Medium", marginLeft: RFPercentage(2) }}>
                    Contact Support
                </Text>
            </View>

            <View style={{ width: '80%', marginTop: RFPercentage(2), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ color: "#333333", fontSize: RFPercentage(2.1), fontFamily: "Rubik_400Regular" }}>
                    To contact us, send an email to
                </Text>
            </View>

            <View style={{ width: '80%', marginTop: RFPercentage(1), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ textDecorationLine: 'underline', color: COLORS.darkBlue, fontSize: RFPercentage(2.1), fontFamily: "Rubik_400Regular" }}>
                    contact@wakala.xyz
                </Text>
            </View>

        </Screen>
    );
}

export default ContactScreen;

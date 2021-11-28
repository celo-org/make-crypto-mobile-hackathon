import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

//components
import Screen from '../../components/Screen';
//consts
import MyAppButton from '../../components/MyAppButton';
import { COLORS } from '../../consts/theme';

function RecoveryPhrase(props, {navigation}) {
    return (
        <Screen statusBarColor="#E5E5E5" style={{ flex: 1, justifyContent: 'flex-start', alignItems: "center", backgroundColor: "#E5E5E5" }}>

            {/* Nav */}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: RFPercentage(2) }}>

                {/* Back Icon */}
                <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2), position: 'absolute', left: RFPercentage(2) }} color={COLORS.darkBlue} />
            

                {/* Heading */}
                <Text style={{ color: "#333333", fontSize: RFPercentage(2.5), fontFamily: 'Rubik_500Medium' }}>
                    Recovery phrase
                </Text>
            </View>

            {/* Center view */}
            <View style={{ marginTop: RFPercentage(20), width: "80%", justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white, height: RFPercentage(26), borderRadius: RFPercentage(3) }}>
                <View style={{ width: "99%", justifyContent: 'flex-start', alignItems: 'center', backgroundColor: COLORS.lightGrey, height: RFPercentage(25.6), borderRadius: RFPercentage(3) }}>
                    <View style={{ width: '90%', marginTop: RFPercentage(7) }}>
                        <Text style={{ color: COLORS.black, fontSize: RFPercentage(2) }}>
                        horse giraffe dog money book fire drink cup phone car jacket computer wire charger curtain router window plate floor plate wine glass oak
                        </Text>
                    </View>
                </View>
            </View>

            {/* Button */}
            <View style={{ width: '100%', position: 'absolute', bottom: RFPercentage(6) }}>
                <MyAppButton
                    title="Okay"
                    bold={true}
                    borderradius={RFPercentage(20)}
                    backgroundColor={COLORS.darkBlue}
                    color={COLORS.white}
                    width={"70%"}
                />
            </View>
        </Screen>
    );
}



export default RecoveryPhrase;
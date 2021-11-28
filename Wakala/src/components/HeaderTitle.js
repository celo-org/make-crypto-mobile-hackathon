import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {RFPercentage} from "react-native-responsive-fontsize";
import {COLORS, FONTS, SIZES} from "../consts/theme";


function HeaderTitle(props){
    return(
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: "row", width: '100%', justifyContent: "space-between"}}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{alignSelf: "flex-start"}}>
                    <Ionicons name="chevron-back" style={{fontSize: RFPercentage(3.2), alignSelf: "flex-start"}}
                              color={COLORS.darkBlue}/>
                </TouchableOpacity>
                {props.skipButton ?
                <TouchableOpacity
                    onPress={() => props.skipAction()}
                    style={{alignSelf: "flex-end"}}>
                    <Text style={{...FONTS.body3, fontWeight: "bold", color: COLORS.primary}}>Skip</Text>
                </TouchableOpacity> : null
                }

            </View>

            <Text style={{...styles.title, ...props.titleStyle}}>
                {props.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        textAlign: "left",
        color: "#4840BB",
        lineHeight: 28.44,
        fontFamily: "Rubik_500Medium",
        width: 240,
        alignSelf: "flex-start",
        paddingTop: 30
    }
})
export default HeaderTitle;
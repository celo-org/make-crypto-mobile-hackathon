import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';


function MyAppButton({
    title,
    onPress = () => { },
    bold = true,
    fontFamily = null,
    borderradius = RFPercentage(2.5),
    padding = RFPercentage(2),
    width = "100%",
    color,
    borderWidth = null,
    borderColor = null,
    gradColor = ['#133FDB', 'rgba(183, 0, 77, 0.30)']
}) {
    return (



        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                // backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: borderWidth,
                width: width,
                borderRadius: borderradius,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                padding: padding,
            }}
        >
            <LinearGradient colors={gradColor} start={[0.1, 0.3]} end={[1, 0.2]} style={{
                alignItems: "center", justifyContent: "center", padding: padding, width: "100%", borderRadius: borderradius, flexDirection: "row"
            }} >
                <Text
                    style={{
                        fontFamily: fontFamily,
                        fontSize: RFPercentage(2.2),
                        color: color,
                        fontWeight: bold ? "bold" : null,
                    }}
                >
                    {title}
                </Text>
            </LinearGradient >
        </TouchableOpacity>

    );
}



export default MyAppButton;
import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Clipboard} from "react-native";
//import Clipboard from "@react-native-community/clipboard"
import {RFPercentage} from "react-native-responsive-fontsize";
import {Ionicons} from "@expo/vector-icons";

//components
import Screen from "../../components/Screen";
//consts
import MyAppButton from "../../components/MyAppButton";
import {COLORS, SIZES} from "../../consts/theme";
import {connect} from "react-redux";
import {LinearGradient} from "expo-linear-gradient";

function AccountAddress(props) {
    const [address, setAddress] = useState();
    const [user, setUser] = useState('');
    useEffect(() => {
        if(props.userMetadata !== null){
            let {publicAddress} = props.userMetadata
            setAddress(publicAddress)
        }else {
            props.magic.user.getMetadata().then(userMetadata => {
                let {publicAddress} = userMetadata
                setAddress(publicAddress)
                dispatch({type: "UPDATE_USER_METADATA", value: {userMetadata: userMetadata}})
            }, error => {
                //console.log(error.toString() + " Logged In")
                alert("You're not properly logged in!")
            });
        }

    }, []);
    const copyToClipboard = () => {
        Clipboard.setString(address)
    }
    return (
        <Screen
            statusBarColor="#E5E5E5"
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#E5E5E5",
            }}
        >
            {/* Nav */}
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: RFPercentage(2),
                }}
            >
                {/* Back Icon */}
                <Ionicons
                    name="chevron-back"
                    style={{
                        fontSize: RFPercentage(3.2),
                        position: "absolute",
                        left: RFPercentage(2),
                    }}
                    color={COLORS.darkBlue}
                />

                {/* Heading */}
                <Text
                    style={{
                        color: "#333333",
                        fontSize: RFPercentage(2.5),
                        fontFamily: "Rubik_500Medium",
                    }}
                >
                    Account Address
                </Text>
            </View>

            {/* Center view */}
            <View style={styles.centerView}>
                <View
                    style={{
                        width: "99%",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        backgroundColor: COLORS.lightGrey,
                        height: RFPercentage(25.6),
                        borderRadius: RFPercentage(3),
                    }}
                >
                    <View style={{width: "90%", marginTop: RFPercentage(7)}}>
                        <Text style={{color: COLORS.black, fontSize: RFPercentage(2)}}>
                            {address}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Copy button */}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => copyToClipboard()}
                style={{
                    marginTop: RFPercentage(3),
                    width: RFPercentage(10),
                    height: RFPercentage(5),
                    borderRadius: RFPercentage(10),
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{color: COLORS.black, fontSize: RFPercentage(2.2)}}>
                    Copy
                </Text>
            </TouchableOpacity>

            {/* Button */}
            <View
                style={{width: SIZES.width, position: "absolute", justifyContent: "center", bottom: RFPercentage(6)}}
            >
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <LinearGradient
                        colors={COLORS.buttonGradient}
                        start={[1, 0]}
                        end={[0, 1]}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Okay</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    centerView: {
        marginTop: RFPercentage(20),
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        height: RFPercentage(26),
        borderRadius: RFPercentage(3),
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 30,
        height: 56,
        width: "80%",
    },

    buttonText: {
        fontSize: 20,
        lineHeight: 23.3,
        textAlign: "center",
        color: "#FFF",
        fontFamily: "Rubik_700Bold",
    },
})
const mapStateToProps = (state) => {
    return {
        magic: state.magic,
        userMetadata: state.userMetadata
    }
}
const mapDispatchToProps = dispatch => {
    return {
        dispatch: async (action) => {
            await dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountAddress);
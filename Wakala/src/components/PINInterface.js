import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, TextInput } from "react-native";

import { Feather } from "@expo/vector-icons";
import {SIZES, COLORS, FONTS} from "../consts/theme";

const PINInterface = (props) => {
    const [value, setValue] = useState("");

    const handleChange = (text) => {
        let actualPin = value
        if(actualPin.length < 6) {
            actualPin += text
        }
        if(actualPin.length === 6)  {
            props.callback(actualPin)
            actualPin = ""
        }
        setValue(actualPin)
    }

    const handleDelete = () => {
        let actualPin = value
        actualPin = actualPin.substring(0, actualPin.length - 1);
        setValue(actualPin)
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputsBlock}>
                {[...Array(6).keys()].map((number, index) => {
                    return(
                        <TextInput
                            maxLength={1}
                            secureTextEntry={true}
                            editable={false}
                            style={styles.numberInput}
                            key={index}
                            value={value[index] !== undefined ? value[index] : ""}
                        />
                    )
                })}
            </View>

            <View style={styles.row}>
                {[1,2,3].map((number, index) => {
                    return(
                        <TouchableHighlight
                            onPress={() => handleChange(number)}
                            underlayColor="rgba(247, 239, 250, 0.6)"
                            delayPressOut={100}
                            key={index}
                            style={styles.key}
                        >
                            <Text style={styles.number}>{number}</Text>
                        </TouchableHighlight>
                    )
                })}

            </View>

            <View style={styles.row}>
                {[4,5,6].map((number, index) => {
                    return(
                        <TouchableHighlight
                            onPress={() => handleChange(number)}
                            underlayColor="rgba(247, 239, 250, 0.6)"
                            delayPressOut={100}
                            key={index}
                            style={styles.key}
                        >
                            <Text style={styles.number}>{number}</Text>
                        </TouchableHighlight>
                    )
                })}
            </View>

            <View style={styles.row}>
                {[7,8,9].map((number, index) => {
                    return(
                        <TouchableHighlight
                            onPress={() => handleChange(number)}
                            underlayColor="rgba(247, 239, 250, 0.6)"
                            delayPressOut={100}
                            key={index}
                            style={styles.key}
                        >
                            <Text style={styles.number}>{number}</Text>
                        </TouchableHighlight>
                    )
                })}
            </View>

            <View style={[styles.row]}>
                <TouchableHighlight
                    underlayColor="rgba(247, 239, 250, 0.6)"
                    delayPressOut={100}
                    style={styles.key}
                    disabled={true}
                >
                    {/* Dummy key to make keypad first line position consistent */}
                    <Text/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => handleChange(0)}
                    underlayColor="rgba(247, 239, 250, 0.6)"
                    delayPressOut={100}
                    style={styles.key}
                >
                    <Text style={styles.number}>0</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => handleDelete()}
                    underlayColor="rgba(247, 239, 250, 0.6)"
                    delayPressOut={100}
                    style={styles.key}
                >
                    <Feather
                        name="delete"
                        size={24}
                        color="#1C1939"
                        style={styles.number}
                    />
                </TouchableHighlight>
            </View>
        </View>
    );
};

let keyWidth = SIZES.width * 0.25;
let keyHeight = keyWidth * 0.75;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        fontSize: 28,
        fontFamily: "Rubik_700Bold",
        lineHeight: 34,
        color: COLORS.primary,
        textAlign: "center",
        marginBottom: 30,
    },

    row: {
        width: "100%",
        height: "auto",
        flexDirection: "row",
        justifyContent: "space-around",
    },

    key: {
        width: keyWidth,
        height: keyHeight,
        borderRadius: keyWidth / 2,
        justifyContent: "center",
        marginVertical: 10,
    },
    numberInput: {
        ...FONTS.body1,
        color: COLORS.primary,
        backgroundColor: COLORS.white,
        height: 40,
        width: 35,
        borderRadius: 6,
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderColor: COLORS.backgroundColor
    },

    number: {
        color: "#1C1939",
        fontSize: 24,
        lineHeight: 26,
        textAlign: "center",
        fontFamily: "DMSans_700Bold",
    },

    button: {
        height: 56,
        width: 100,
        borderRadius: 28,
        marginHorizontal: 30,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0000FF",
    },
    inputsBlock: {flexDirection: "row",
        width: SIZES.width * 0.8,
        height: 40, alignSelf: "center",
        justifyContent: "space-around"
    }
});

export default PINInterface;

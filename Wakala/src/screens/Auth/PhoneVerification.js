import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Pressable, Alert, Image} from 'react-native'
import {LinearGradient} from "expo-linear-gradient";
import {COLORS, FONTS, SIZES} from "../../consts/theme";
import {ScrollView} from "react-native-gesture-handler";
import Wave from "../../components/WaveAnimation";
import {WAKALA_LOGO} from "../../assets/images";
import Animated, {Easing, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";

function PhoneVerificationLoader({navigation}) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [allSet, setAllSet] = React.useState(false);
    const [progress, setProgress] = useState(new Animated.Value(0));
    const logo = WAKALA_LOGO;
    const dispatch = () => {}
    const moveNext = () => {
        setAllSet(true);
        setTimeout(() => {
            dispatch({type: 'FINISHED_BOARDING', payload: {}})
            //navigation.navigate("Drawer Nav");
        }, 1500);
    };

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
        }).start();
    }, []);

    return (
        <LinearGradient style={styles.container}
                        colors={["rgba(247, 239, 250, 1.0)", "rgba(252, 248, 237, 1.0)"]}
                        start={[1, 0]}
                        end={[1, 1]}>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper}>
                    {!allSet ? (
                        <><TouchableOpacity
                            onPress={() => moveNext()}
                            style={{alignSelf: "flex-start"}}>
                            <Text style={{...FONTS.body3, fontWeight: "bold", color: COLORS.primary}}>Cancel</Text>
                        </TouchableOpacity>
                            <View style={{
                                height: SIZES.height * 0.5,
                                alignItems: "center",
                                justifyContent: "center",
                                //backgroundColor: COLORS.backgroundColor,
                                width: SIZES.width*0.5
                            }}>
                                <Wave>
                                    <Text style={{...FONTS.body2, color: COLORS.primary}}>28%</Text>
                                </Wave>
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <ScrollView horizontal>
                                            <Text>test</Text>
                                        </ScrollView>

                                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={{...FONTS.body3, color: COLORS.primary}}>Hide Modal</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={{...FONTS.body3, color: COLORS.primary}}>Learn more</Text>
                            </TouchableOpacity>
                        </>)
                    : (
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image source={logo}/>
                                <Text
                                    style={{...FONTS.h1, color: COLORS.primary, paddingTop: 10}}
                                >
                                    You're all set!
                                </Text>
                            </View>
                        )}
                </View>
            </SafeAreaView>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default PhoneVerificationLoader;
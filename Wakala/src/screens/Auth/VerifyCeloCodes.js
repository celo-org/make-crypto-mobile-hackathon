import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Image,
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {connect} from "react-redux";
import {useDispatch} from 'react-redux';

import {COLORS, FONTS, SIZES} from "../../consts/theme";
import {LinearGradient} from "expo-linear-gradient";
import HeaderTitle from "../../components/HeaderTitle";
import {WAKALA_LOGO} from "../../assets/images";

function VerifyCeloCodes({navigation}) {
    const [code, setCode] = React.useState([]);
    const [allSet, setAllSet] = React.useState(false);
    const dispatch = useDispatch();

    const setCodeInput = (index, value) => {
        let codeArray = value;
        codeArray[index] = code;
        setCode(codeArray);
        // Todo check if the code is valid
    };
    // Loading the logo before it's shown
    const logo = WAKALA_LOGO;
    const moveNext = () => {
        setAllSet(true);
        setTimeout(() => {
            dispatch({type: 'FINISHED_BOARDING', payload: {}})
            //navigation.navigate("Drawer Nav");
        }, 1500);
    };
    React.useEffect(() => {
        if (allSet) {

            moveNext();
        }
    }, []);
    return (
        <KeyboardAwareScrollView style={{flex: 1}}>
            <LinearGradient
                style={styles.container}
                colors={["rgba(247, 239, 250, 1.0)", "rgba(252, 248, 237, 1.0)"]}
                start={[1, 0]}
                end={[1, 1]}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.wrapper}>
                        {!allSet ? (
                            <>
                                <HeaderTitle navigation={navigation} title="Verify"/>
                                <View style={{width: "100%"}}>
                                    <Text
                                        style={{
                                            ...FONTS.body4,
                                            textAlign: "left",
                                            alignSelf: "flex-start",
                                        }}
                                    >
                                        We sent three codes to{" "}
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                fontFamily: "Rubik_600SemiBold",
                                            }}
                                        >
                                            +254 706 111 427
                                        </Text>
                                        ,{"\n"}please enter them below
                                    </Text>
                                </View>
                                <View style={{width: "100%"}}>
                                    {[1, 2, 3].map((value, index) => {
                                        return (
                                            <View style={styles.inputWrapper} key={index}>
                                                <Text
                                                    style={{
                                                        ...FONTS.body3,
                                                        alignSelf: "flex-start",
                                                        padding: 10,
                                                        paddingBottom: 0,
                                                        color: "gray",
                                                    }}
                                                >
                                                    Code {value}
                                                </Text>
                                                <View style={{width: "90%"}}>
                                                    <TextInput
                                                        style={styles.codeInput}
                                                        placeholder={"Paste code"}
                                                        value={code[index]}
                                                        onChangeText={(text) => setCodeInput(index, text)}
                                                    />
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>

                                <TouchableOpacity onPress={() => moveNext()} style={{}}>
                                    <Text style={FONTS.body4}>Skip (will be removed)</Text>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Text style={{...FONTS.body3, color: COLORS.primary}}>
                                        Resend all messages
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
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
        </KeyboardAwareScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        //favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => {
    return {
        dispatch: async (action) => {
            await dispatch(action)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VerifyCeloCodes);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: SIZES.height,
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 25,
    },
    inputWrapper: {
        width: "100%",
        alignItems: "center",
        backgroundColor: COLORS.white,
        height: 80,
        marginBottom: 15,
        borderRadius: SIZES.radius * 0.4,
    },
    codeInput: {
        ...FONTS.body3,
        height: 50,
        color: COLORS.black,
        fontSize: 20,
    },
    buttonWrapper: {
        width: "100%",
        justifyContent: "flex-start",
        paddingBottom: 30,
    },

    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        height: 56,
        width: "100%",
    },

    buttonText: {
        fontSize: 20,
        lineHeight: 23.3,
        textAlign: "center",
        color: "#FFF",
        fontFamily: "Rubik_700Bold",
    },
});


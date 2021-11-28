import * as React from "react";
import {
    SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS, FONTS, SIZES} from "../../consts/theme";
import HeaderTitle from "../../components/HeaderTitle";
import {RFPercentage} from "react-native-responsive-fontsize";

export default function ToC({navigation}) {
    return (
        <LinearGradient style={styles.container}
                        colors={["rgba(247, 239, 250, 1.0)", "rgba(252, 248, 237, 1.0)"]}
                        start={[1, 0]}
                        end={[1, 1]}>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper}>
                    <HeaderTitle navigation={navigation} title="Terms & Conditions"/>
                    <View style={styles.titleWrapper}>
                        <ScrollView contentContainerStyle={{alignItems: "flex-start"}} style={styles.contentWrapper}>
                            <Text style={{...FONTS.body4, lineHeight: 24}}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever{" "}
                            </Text>
                            <Text style={styles.paragraphTitle}>Data and Privacy</Text>
                            <Text style={{...FONTS.body4, lineHeight: 24}}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem standard dummy text ever. Learn more at
                                wakala.xyz/terms.
                            </Text>
                            <Text style={styles.paragraphTitle}>
                                Celo Assets and Kukuza Account
                            </Text>
                            <Text style={{...FONTS.body4, lineHeight: 24}}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem standard dummy text ever. Learn more at
                                wakala.xyz/terms.
                            </Text>
                        </ScrollView>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={() => navigation.navigate("SetPIN")}>
                            <LinearGradient
                                colors={COLORS.buttonGradient}
                                start={[1, 0]}
                                end={[0, 1]}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Accept</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
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
        paddingHorizontal: 40,
    },

    titleWrapper: {
        width: "100%",
        marginTop: RFPercentage(8),
        marginBottom: 0,

    },

    title: {
        ...FONTS.h1,
        color: "#4840BB",
        lineHeight: 28.44,
        fontFamily: "Rubik_500Medium",
        marginBottom: 10,
    },
    contentWrapper: {
        marginBottom: RFPercentage(18),
        width: "100%",
        maxHeight: SIZES.height * 0.75,
    },
    buttonWrapper: {
        width: "100%",
        justifyContent: "flex-start",
        marginBottom: 40,
    },
    paragraphTitle: {
        ...FONTS.body2,
        fontSize: 18,
        color: COLORS.primary,
        paddingTop: 40,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        height: 56,
        width: "100%",
        marginBottom: 40,
    },
    buttonText: {
        fontSize: 20,
        lineHeight: 23.3,
        textAlign: "center",
        color: "#FFF",
        fontFamily: "Rubik_700Bold",
    },
});

import {StyleSheet} from "react-native";
import {SIZES} from "./theme";

const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        justifyContent: "space-between",
        alignItems: "center",
    },

    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: 45,
        height: 38,
        borderRadius: 6,
        backgroundColor: "#4840BB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    title: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333333",
        fontFamily: "Rubik_500Medium",
    },

    text: {
        fontSize: 14,
        lineHeight: 21,
        color: "#333333",
        fontFamily: "Rubik_400Regular",
    },

    secondaryButtonText: {
        fontSize: 20,
        lineHeight: 24,
        fontFamily: "Rubik_500Medium",
        textAlign: "center",
        color: "#FFF",
    },

    button: {
        width: "auto",
        height: 56,
        marginTop: 10,
        justifyContent: "center",
    },
});

const cardStyles = StyleSheet.create({
    container: {
        height: SIZES.height * 0.35,
        width: "100%",
        borderRadius: 16,
        backgroundColor: "#FFF",
        justifyContent: "space-around",
        padding: 15,
    },

    subTitle: {
        fontSize: 16,
        lineHeight: 24,
        color: "#A2A3A2",
        fontFamily: "Rubik_500Medium",
    },

    title: {
        fontSize: 28,
        lineHeight: 34,
        color: "#4840BB",
        fontFamily: "Rubik_700Bold",
    },

    copyContainer: {
        width: 70,
        height: 30,
        marginTop: 10,
        borderRadius: 16,
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
    },

    copyText: {
        fontSize: 12,
        lineHeight: 18,
        color: "#333333",
        textAlign: "center",
        fontFamily: "Rubik_500Medium",
    },
});

const modalStyles = StyleSheet.create({
    container: {
        height: "auto",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "flex-start",
    },

    image: {
        height: 70,
        maxWidth: SIZES.width * 0.8,
        resizeMode: "contain",
        marginBottom: 20,
    },

    errorImage: {
        height: 180,
        maxWidth: SIZES.width * 0.8,
        resizeMode: "contain",
        marginBottom: 20,
    },

    title: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333333",
        textAlign: "center",
        fontFamily: "Rubik_500Medium",
    },

    text: {
        fontSize: 14,
        lineHeight: 21,
        color: "#333333",
        textAlign: "center",
        fontFamily: "Rubik_400Regular",
        marginTop: 25,
    },

    button: {
        fontSize: 20,
        lineHeight: 24,
        color: "#133FDB",
        textAlign: "center",
        fontFamily: "Rubik_500Medium",
        marginTop: 40,
    },
});

export {modalStyles, mainStyles, cardStyles}
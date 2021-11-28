import {ActivityIndicator, Text, View} from "react-native";
import {COLORS} from "../consts/theme";
import React from "react";

const ModalLoading = ({loadingMessage}) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator
                size="large"
                style={{ padding: 10 }}
                color={COLORS.primary}
            />
            <Text style={{ textAlign: "center" }}>{loadingMessage}</Text>
        </View>
    );
};
ModalLoading.props = {loadingMessage: ""}
export default ModalLoading
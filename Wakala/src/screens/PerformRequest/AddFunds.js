import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/core";
import { TextInputMask } from "react-native-masked-text";
import { LinearGradient } from "expo-linear-gradient";

import ScreenCmpt from "../../components/ScreenCmpt";
import NavHeader from "../../components/NavHeader";
import KeyPad from "../../components/KeyPad";

import { COLORS } from "../../consts/theme";

const AddFunds = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [value, setValue] = useState("");
  const operation = route.params.operation;

  function handleChange(newValue) {
    setValue(newValue);
  }

  return (
    <ScreenCmpt>
      <NavHeader
        showTitle={true}
        newTitle={operation === "TopUp" ? "Add Funds" : "Withdraw Funds"}
      />
      <View style={styles.container}>
        <TextInputMask
          type={"money"}
          options={{
            unit: "Ksh ",
          }}
          value={value}
          style={styles.title}
          placeholder="Ksh 0,00"
          placeholderTextColor={COLORS.primary}
        />
        <KeyPad value={value} onChange={handleChange} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Confirm Funds", {
              value: value,
              operation: operation,
            })
          }
        >
          <LinearGradient
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Review</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenCmpt>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: "flex-end",
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 30,
    textAlign: "center",
    color: COLORS.primary,
    fontFamily: "Rubik_700Bold",
  },

  button: {
    height: 56,
    width: "100%",
    marginTop: 10,
    borderRadius: 28,
    marginBottom: 30,
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 20,
    lineHeight: 24,
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Rubik_500Medium",
  },
});

export default AddFunds;

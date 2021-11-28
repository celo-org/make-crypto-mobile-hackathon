import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import ScreenCmpt from "../components/ScreenCmpt";

const Success = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <ScreenCmpt>
      <View style={styles.container}>
        <Ionicons
          name="checkmark-circle"
          size={36}
          color="#4840BB"
          style={{ textAlign: "center", marginBottom: 12 }}
        />
        <Text style={styles.title}>Transaction Successful!</Text>
        <Text style={styles.text}>
          Your cUSD has been deposited to your wallet.
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Rate", { operation: route.params.operation })
          }
        >
          <LinearGradient
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Okay</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenCmpt>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 30,
    marginTop: 80,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
    lineHeight: 24,
    color: "#4840BB",
    textAlign: "center",
    marginBottom: 24,
  },

  text: {
    fontSize: 14,
    fontFamily: "Rubik_400Regular",
    lineHeight: 21,
    color: "#333333",
    marginBottom: 37,
  },

  button: {
    justifyContent: "center",
    borderRadius: 28,
    height: 56,
    width: "100%",
    marginTop: 80,
  },

  buttonText: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Rubik_500Medium",
    textAlign: "center",
    color: "#FFF",
  },
});

export default Success;

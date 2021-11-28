import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";

import ScreenCmpt from "../../components/ScreenCmpt";
import NavHeader from "../../components/NavHeader";

import { SIZES } from "../../consts/theme";

const OperationButton = (props) => {
  return (
    <TouchableOpacity onPress={() => props.handleAction()}>
      <LinearGradient
        colors={["#F7EFFA", "#FCF8ED"]}
        start={[1, 0]}
        end={[1, 1]}
        style={buttonStyles.button}
      >
        <View style={buttonStyles.icon}>
          <EvilIcons
            name={props.icon}
            size={40}
            color="#4840BB"
            style={props.styleIcon}
          />
        </View>
        <Text style={buttonStyles.buttonTitle}>{props.title}</Text>
        <Text style={buttonStyles.buttonSubTitle}>{props.subTitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const SelectOperation = () => {
  const navigation = useNavigation();

  return (
    <ScreenCmpt>
      <NavHeader />
      <View style={styles.container}>
        <Text style={styles.subTitle}>Current balance</Text>
        <Text style={styles.title}>Ksh 10,000</Text>

        <View style={styles.buttonContainer}>
          <OperationButton
            title="Top Up"
            subTitle="Buy cUSD"
            icon="arrow-up"
            styleIcon={{
              transform: [{ rotate: "135deg" }],
            }}
            handleAction={() =>
              navigation.navigate("Select Payment Method", {
                operation: "TopUp",
              })
            }
          />
          <OperationButton
            title="Withdraw"
            subTitle="Sell cUSD"
            icon="arrow-up"
            styleIcon={{
              transform: [{ rotate: "45deg" }],
            }}
            handleAction={() =>
              navigation.navigate("Select Payment Method", {
                operation: "Withdraw",
              })
            }
          />
        </View>
      </View>
    </ScreenCmpt>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    color: "#4840BB",
    fontFamily: "Rubik_700Bold",
  },

  subTitle: {
    fontSize: 12,
    lineHeight: 14,
    color: "#333333",
    fontFamily: "Rubik_400Regular",
  },

  buttonContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const buttonWidth = (SIZES.width - 100) / 2;
const buttonHeight = buttonWidth + 70;

const buttonStyles = StyleSheet.create({
  button: {
    width: buttonWidth,
    height: buttonHeight,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#FFFFFF",
    alignItems: "center",
  },

  icon: {
    width: buttonWidth / 2 - 10,
    height: buttonWidth / 2 - 6,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 15,
  },

  buttonTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: "#4840BB",
    marginTop: 15,
    fontFamily: "Inter_500Medium",
  },

  buttonSubTitle: {
    fontSize: 12,
    lineHeight: 14,
    color: "#333333",
    marginTop: 15,
    fontFamily: "Rubik_400Regular",
  },
});

export default SelectOperation;

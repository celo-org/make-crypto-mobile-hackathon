import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";

//components
import Screen from "../../components/Screen";

//config
import { COLORS } from "../../consts/theme";

function SelectCurrencyScreen(props, { navigation }) {
  const [list, setList] = useState([
    {
      currencyText: "USD",
      enable: "unchecked",
    },
    {
      currencyText: "KES",
      enable: "unchecked",
    },
    {
      currencyText: "CAD",
      enable: "unchecked",
    },
    {
      currencyText: "EUR",
      enable: "unchecked",
    },
    {
      currencyText: "MXN",
      enable: "unchecked",
    },
    {
      currencyText: "COP",
      enable: "unchecked",
    },
    {
      currencyText: "UGX",
      enable: "unchecked",
    },
    {
      currencyText: "CAD",
      enable: "unchecked",
    },
    {
      currencyText: "BRL",
      enable: "unchecked",
    },
    {
      currencyText: "CVE",
      enable: "unchecked",
    },
    {
      currencyText: "EUR",
      enable: "unchecked",
    },
    {
      currencyText: "MXN",
      enable: "unchecked",
    },
    {
      currencyText: "COP",
      enable: "unchecked",
    },
    {
      currencyText: "USD",
      enable: "unchecked",
    },
  ]);

  const handleCurrency = (index) => {
    const tempList = [...list];
    let tempList2 = [];
    for (let i = 0; i < tempList.length; i++) {
      if (i === index) {
        tempList[i].enable = "checked";
      } else {
        tempList[i].enable = "unchecked";
      }
      tempList2.push(tempList[i]);
    }
    setList(tempList2);
  };

  return (
    <Screen
      statusBarColor="#F5F5F5"
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
      }}
    >
      {/* Nav */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(4),
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
            Select Currency
          </Text>
        </View>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            marginTop: RFPercentage(1),
          }}
        >
          <View
            style={{
              width: "100%",
              height: RFPercentage(0.1),
              backgroundColor: COLORS.line,
              marginTop: RFPercentage(3),
            }}
          />

          {list.map((item, i) => (
            <View
              key={i}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  marginTop: RFPercentage(3),
                  width: "80%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    marginLeft: RFPercentage(2),
                    color: COLORS.darkBlue,
                    fontSize: RFPercentage(2.6),
                    fontFamily: "Rubik_400Regular",
                  }}
                >
                  {item.currencyText}
                </Text>
                <View style={{ marginLeft: RFPercentage(5) }}>
                  <RadioButton
                    value="first"
                    color={COLORS.primary}
                    status={item.enable}
                    onPress={() => handleCurrency(i)}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  height: RFPercentage(0.1),
                  backgroundColor: COLORS.line,
                  marginTop: RFPercentage(3),
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

export default SelectCurrencyScreen;

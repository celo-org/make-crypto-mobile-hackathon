import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

//components
import Screen from "../../components/Screen";
//config
import theme from "../../consts/theme";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../consts/theme";

function ContactSupportScreen(props) {
  const Data = [
    {
      imageSource: require("../../assets/images/twitter.png"),
      title: "Twitter",
    },
    {
      imageSource: require("../../assets/images/telegram.png"),
      title: "Telegram",
    },
    {
      imageSource: require("../../assets/images/git.png"),
      title: "Git hub",
    },
    {
      imageSource: require("../../assets/images/discord.png"),
      title: "Discord",
    },
    {
      imageSource: require("../../assets/images/whatsapp.png"),
      title: "WhatsApp",
    },
  ];
  return (
    <Screen
      statusBarColor="#E5E5E5"
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <LinearGradient
        colors={["#F7EFFA", "#FCF8ED"]}
        start={[0.1, 0.3]}
        end={[1, 0.2]}
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* Nav */}
        <View
          style={{
            width: "80%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: RFPercentage(3),
          }}
        >
          {/* Back Icon */}
          <Ionicons
            name="chevron-back"
            style={{ fontSize: RFPercentage(3.2) }}
            color={COLORS.darkBlue}
          />
        </View>

        <ScrollView style={{ flex: 1, width: "100%" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: RFPercentage(1),
            }}
          >
            {/* Community icon,heading*/}
            <View
              style={{
                marginTop: RFPercentage(7),
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Image
                style={{ width: RFPercentage(8), height: RFPercentage(8) }}
                source={require("../../assets/images/com.png")}
              />
              <Text
                style={{
                  marginLeft: RFPercentage(4.5),
                  color: COLORS.black,
                  fontSize: RFPercentage(2.7),
                  fontFamily: "Rubik_500Medium",
                }}
              >
                Ask the Community
              </Text>
            </View>

            {/* listing of social links */}
            {Data.map((item, i) => (
              <View
                key={i}
                style={{
                  marginTop: i === 0 ? RFPercentage(7) : RFPercentage(5),
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "80%",
                }}
              >
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    style={{ width: RFPercentage(5), height: RFPercentage(5) }}
                    source={item.imageSource}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: RFPercentage(4.5),
                    color: COLORS.darkBlue,
                    fontSize: RFPercentage(2.5),
                    fontFamily: "Rubik_400Regular",
                  }}
                >
                  {item.title}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </Screen>
  );
}

export default ContactSupportScreen;

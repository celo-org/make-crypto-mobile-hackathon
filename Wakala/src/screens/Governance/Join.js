import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import ScreenCmpt from "../../components/ScreenCmpt";

import { PARTICIPATE } from "../../assets/images";
import { SIZES } from "../../consts/theme";

const Join = () => {
  const navigation = useNavigation();
  const url = "https://governance.wakala.xyz/";

  const openLink = () => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert(
          "This device is not able to open the link \nPlease visit the following website\n" +
            url
        );
      }
    });

    navigation.navigate("Home Screen");
  };

  return (
    <ScreenCmpt>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.container}>
          <Image source={PARTICIPATE} style={styles.image} />
          <Text style={styles.title}>Participate in Governance</Text>
          <Text style={styles.subtitle}>
            Join the governing process, make proposals, vote on proposal
          </Text>
          <TouchableOpacity onPress={openLink}>
            <LinearGradient
              colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
              start={[1, 0]}
              end={[0, 1]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Govern Wakala</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenCmpt>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.65,
    justifyContent: "space-around",
    alignItems: "center",
  },

  wrapper: {
    flex: SIZES.height > 460 ? 0.5 : 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },

  image: {
    height: 150,
    maxWidth: SIZES.width * 0.8,
    resizeMode: "contain",
    marginBottom: 40,
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#4840BB",
    lineHeight: 28.44,
    fontFamily: "Rubik_400Regular",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#1C1939CC",
    lineHeight: 19.36,
    paddingHorizontal: 30,
    fontFamily: "Inter_400Regular",
  },

  button: {
    justifyContent: "center",
    borderRadius: 28,
    height: 56,
    width: 300,
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

export default Join;

import React, { useState, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import FadeInOut from "react-native-fade-in-out";

import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SIZES } from "../consts/theme";
import { useNavigation } from "@react-navigation/native";

const swipeLeftContent = () => {
  return (
    <Animated.View
      style={{
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
      }}
    >
      <Fontisto name="preview" size={24} color="#133FDB" />
      <Text
        style={{
          color: "#133FDB",
          fontFamily: "Rubik_500Medium",
          fontSize: 14,
        }}
      >
        View
      </Text>
    </Animated.View>
  );
};

const swipeRightContent = () => {
  return (
    <View
      style={{
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
      }}
    >
      <MaterialIcons name="block-flipped" size={24} color="#EF8787" />
      <Text
        style={{
          color: "#EF8787",
          fontFamily: "Rubik_500Medium",
          fontSize: 14,
        }}
      >
        Hide
      </Text>
    </View>
  );
};

const RequestCard = (props) => {
  const {transaction} = props
  const [amount, setAmount] = useState();
  const [starsRate, setStarsRate] = useState();
  const [ratingsNumber, setRatingsNumber] = useState();
  const [visible, setVisible] = useState(true);
  const [type, setType] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    setAmount(props.amount);
    setStarsRate(props.stars);
    setRatingsNumber(props.rating);
    setType(props.type);
  }, []);

  function handleDeleteItem() {
    props.deleteItem(props._id);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Accept Request", {
          type: type,
          value: amount,
          transaction: transaction
        })
      }
      activeOpacity={0.6}
    >
      <Swipeable
        renderLeftActions={swipeLeftContent}
        overshootLeft={false}
        onSwipeableLeftOpen={() =>
          navigation.navigate("Accept Request", {
            type: type,
            value: amount,
            transaction: transaction
          })
        }
        overshootRight={false}
        renderRightActions={swipeRightContent}
        onSwipeableRightOpen={handleDeleteItem}
        onSwipeableRightWillOpen={() => setVisible(!visible)}
      >
        <FadeInOut visible={visible} duration={650}>
          <LinearGradient
            colors={["#FF8CA121", "#FCCF2F21", "#F830B421", "#2F44FC21"]}
            start={[0.3, 0]}
            end={[1, 0.3]}
            style={styles.container}
          >
            <View style={styles.imageContainer}>
              <View style={styles.img} />
            </View>
            <View style={styles.requestInfoContainer}>
              <Text style={styles.title}>
                {props.type === "DEPOSIT"
                  ? "Deposit Request"
                  : "Withdraw Request"}
              </Text>
              <Text style={styles.subTitle}>Amount</Text>
              <Text style={styles.amount}>Ksh {amount}</Text>
            </View>

            <View style={styles.moreInfoContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="star" size={14} color="#002B4E" />
                <Text
                  style={[
                    styles.subTitle,
                    { color: "#002B4E", marginRight: 15 },
                  ]}
                >
                  {" "}
                  {starsRate}
                </Text>
                <Text style={[styles.subTitle, { color: "#133FDB" }]}>
                  {ratingsNumber} Ratings
                </Text>
              </View>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() =>
                  navigation.navigate("Accept Request", {
                    type: type,
                    value: amount,
                    transaction: transaction
                  })
                }
              >
                <Text style={styles.textButton}>View</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </FadeInOut>
      </Swipeable>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: SIZES.width * 0.9,
    borderRadius: 16,
    borderColor: "#FFF",
    borderWidth: 1,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",

    padding: 15,
    marginVertical: 16,
    marginLeft: SIZES.width * 0.05,
    marginRight: SIZES.width * 0.05,
  },

  imageContainer: {
    width: SIZES.width * 0.1,
    alignItems: "center",
    // backgroundColor: "#FF0000",
  },

  img: {
    width: 32,
    height: 32,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontFamily: "Rubik_500Medium",
    color: "#002B4E",
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 10,
  },

  subTitle: {
    fontFamily: "Rubik_400Regular",
    color: "#333333",
    fontSize: 9,
    lineHeight: 10,
  },

  amount: {
    fontFamily: "Rubik_500Medium",
    color: "#333333",
    fontSize: 18,
  },

  requestInfoContainer: {
    flexDirection: "column",
    width: SIZES.width * 0.4,
    // backgroundColor: "#00FF00",
  },

  moreInfoContainer: {
    flexDirection: "column",
    width: SIZES.width * 0.3,
    alignItems: "center",
    justifyContent: "space-between",

    // backgroundColor: "#0000FF",
  },

  viewButton: {
    width: 80,
    height: 30,
    borderWidth: 0.65,
    borderColor: "#949494",
    borderRadius: 30,
    justifyContent: "center",
  },

  textButton: {
    fontFamily: "Inter_700Bold",
    color: "#1B40D7",
    fontSize: 12,
    textAlign: "center",
  },
});

export default RequestCard;

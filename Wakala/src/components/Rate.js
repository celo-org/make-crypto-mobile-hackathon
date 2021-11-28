import React, { Fragment, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";

import ScreenCmpt from "../components/ScreenCmpt";
import RatingSwiper from "./RatingSwiper";
import Modal from "../components/Modal";
import NavHeader from "./NavHeader";

import { ERROR } from "../assets/images";
import { SIZES } from "../consts/theme";

const ModalContent = (props) => {
  return (
    <View style={modalStyles.container}>
      {props.isRatingSubmissionSuccess ? (
        <View>
          <Ionicons
            name="checkmark-circle"
            size={36}
            color="#4840BB"
            style={{ textAlign: "center", marginBottom: 12 }}
          />
          <Text style={modalStyles.title}>Thank you!</Text>
          <Text style={modalStyles.text}>We appreciate your feedback!</Text>
          <TouchableOpacity onPress={() => props.handleAction()}>
            <Text style={modalStyles.button}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Image source={ERROR} style={modalStyles.image} />
          <Text style={modalStyles.title}>Oh Snap!</Text>
          <Text style={modalStyles.text}>
            Something just happened. Please try again.
          </Text>
          <TouchableOpacity onPress={() => props.handleAction()}>
            <Text style={modalStyles.button}>Try again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Rate = () => {
  const route = useRoute();
  const modalRef = useRef();
  const navigation = useNavigation();
  const operation = route.params.operation;

  const [newTitle, setNewTitle] = useState("");
  const [userStars, setUserStars] = useState(5);
  const [ratingValue, setRatingValue] = useState("");
  const [numberOfTransactions, setNumberOfTransactions] = useState(180);
  const [isRatingSubmissionSuccess, setIsRatingSubmissionSuccess] =
    useState(true);

  useEffect(() => {
    if (operation == "TopUp") {
      setNewTitle("Rate your community");
    } else {
      setNewTitle("Support community");
    }
  }, []);

  function handleChange(newValue) {
    setRatingValue(newValue);
  }

  const handleRatingSubmition = async () => {
    // Call function to perform rating submition
    // If rating return success response set
    // isRatingSubmissionSuccess to true and open modal
    // performRating(rating).then(
    //   response => {
    //     setIsRatingSubmissionSuccess(true)
    //   },
    //   error => {
    //     setIsRatingSubmissionSuccess(false)
    //   },
    // )
    openModal();
  };

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    if (isRatingSubmissionSuccess) {
      navigation.navigate("Home Screen");
    }
    modalRef.current?.closeModal();
  };

  return (
    <Fragment>
      <ScreenCmpt>
        <NavHeader hideBackButton={true} showTitle={true} newTitle={newTitle} />
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.icon} />
            <View style={styles.starsIcons}>
              {[...Array(userStars)].map((e, i) => (
                <Entypo key={i} name="star" size={12} color="#4840BB" />
              ))}
              <Text style={styles.starsText}> {userStars}</Text>
            </View>
            <Text style={styles.transactionsText}>
              {numberOfTransactions} successful transactions
            </Text>
          </View>

          <View style={styles.reactionContainer}>
            <Text style={styles.text}>
              How was your experience with the community member?
            </Text>
            <RatingSwiper rating={ratingValue} onChange={handleChange} />
            <TouchableOpacity
              style={styles.button}
              onPress={handleRatingSubmition}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenCmpt>
      <Modal
        ref={modalRef}
        style={isRatingSubmissionSuccess ? { height: 340 } : { height: 490 }}
        content={
          <ModalContent
            handleAction={closeModal}
            isRatingSubmissionSuccess={isRatingSubmissionSuccess}
          />
        }
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginVertical: SIZES.height > 700 ? 70 : 30,
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoContainer: {
    width: "100%",
    alignItems: "center",
  },

  icon: {
    width: 59,
    height: 59,
    borderRadius: 30,
    backgroundColor: "#FF8CA1",
  },

  starsIcons: {
    flexDirection: "row",
    marginTop: 18,
  },

  starsText: {
    fontSize: 12,
    color: "#4840BB",
    fontFamily: "Inter_700Bold",
  },

  transactionsText: {
    fontSize: 14,
    color: "#333333",
    fontFamily: "Rubik_400Regular",
    marginTop: 10,
  },

  reactionContainer: {
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    fontFamily: "Rubik_500Medium",
    marginBottom: 50,
  },

  button: {
    width: 150,
    height: 50,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    marginTop: 30,
  },

  buttonText: {
    fontSize: 18,
    color: "#4840BB",
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
    marginTop: 60,
  },
});

export default Rate;

import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SIZES } from "../../consts/theme";
import HeaderTitle from "../../components/HeaderTitle";
import PhoneInput from "react-native-phone-number-input";
import { connect, useDispatch } from "react-redux";

function SignUpScreen({ navigation, magic }) {
  const [countryCode, setCountryCode] = React.useState("+254");
  const [number, setNumber] = React.useState("");
  const [user, setUser] = React.useState({});
  const dispatch = useDispatch();

  // phone number input
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef();

  // Trigger magic link for user to login / generate wallet
  const login = async () => {
    try {
      const isValid = phoneInput.current?.isValidNumber(value);
      setValid(isValid);

      if (isValid) {
        let DID = await magic.auth.loginWithSMS({
          phoneNumber: value, //pass the phone input value to get otp sms
        });

        // Consume decentralized identity (DID)
        if (DID !== null) {
          magic.user.getMetadata().then((userMetadata) => {
            setUser(userMetadata);
            dispatch({
              type: "LOGIN",
              payload: { phoneNumber: value, userMetadata: userMetadata },
            });
          });
        }
        //TODO Navigate to Terms and Conditions Page
        navigation.navigate("ToC");
      } else {
        setTimeout(() => {
          setValid(true);
        }, 2000);
      }
    } catch (err) {
      alert(err);
    }
  };

  // Logout of Magic session
  const logout = async () => {
    await magic.user.logout();
    setUser("");
    console.log("logged out");
  };

  const title = "A community \nthat you \nwill love.";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        style={styles.container}
        colors={["rgba(247, 239, 250, 1.0)", "rgba(252, 248, 237, 1.0)"]}
        start={[1, 0]}
        end={[1, 1]}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            <HeaderTitle navigation={navigation} title={title} />

            <View>
              <Text
                style={{ ...FONTS.body3, fontSize: 14, alignSelf: "center" }}
              >
                Enter your phone number to join or log in.
              </Text>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  borderColor: valid ? "white" : "red",
                  borderWidth: valid ? 0 : 1.5,
                }}
              >
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={value}
                  defaultCode="KE"
                  onChangeFormattedText={(text) => {
                    setValue(text);
                  }}
                  textContainerStyle={{
                    borderRadius: 10,
                  }}
                  containerStyle={{
                    borderRadius: 10,
                  }}
                  withDarkTheme
                  withShadow
                  autoFocus
                />
              </View>
            </View>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={() => login()}>
                <LinearGradient
                  colors={COLORS.buttonGradient}
                  start={[1, 0]}
                  end={[0, 1]}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <magic.Relayer />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
const mapStateToProps = (state) => {
  return {
    magic: state.magic,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: async (action) => {
      await dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 40,
  },

  buttonWrapper: {
    width: "100%",
    justifyContent: "flex-start",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 56,
    width: "100%",
  },

  buttonText: {
    fontSize: 20,
    lineHeight: 23.3,
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Rubik_700Bold",
  },
  orText: {
    textAlign: "center",
    padding: 15,
    color: COLORS.textBlack,
  },
  numberInputBlock: {
    flexDirection: "row",
    width: SIZES.width * 0.8,
    height: 40,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  countryInput: {
    width: SIZES.width * 0.15,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.white,
  },
  numberInput: {
    width: "80%",
    paddingLeft: 5,
    backgroundColor: COLORS.white,
    borderBottomRightRadius: 10,
  },
  border: {
    backgroundColor: COLORS.backgroundColor,
    width: 1,
    height: 25,
    alignSelf: "center",
  },
  countrySelectorButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#4840BB",
  },
});

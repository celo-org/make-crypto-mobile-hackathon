import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

//components
import Screen from "../../components/Screen";

//config
import theme from '../../consts/theme';
import { COLORS } from "../../consts/theme";

function PinDoNotMatch(props) {
  const refInput2 = useRef();
  const refInput3 = useRef();
  const refInput4 = useRef();
  const refInput5 = useRef();
  const refInput6 = useRef();

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");
  const [value6, setValue6] = useState("");

  const [value, setValue] = useState("");

  const handleChange = (text) => {
    if (value.length < 6) {
      setValue(value + text);
    }

    if (value.length == 5) {
      showWarn(true);
    }
  };

  const handleClear = () => {
    showWarn(false);
    let temp = value;
    let newValue = temp.slice(0, -1);
    setValue(newValue);
  };

  const [warn, showWarn] = useState(false);

  const handleLastValue = (text) => {
    setValue6(text);
  

    if (value1 && value2 && value3 && value4 && value5 && text) {
      showWarn(true);
      console.log("dshf");
    } else {
      showWarn(false);
    }
}

  return (
    <Screen
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F2F0F0",
      }}
    >
      {/* Back Icon */}
      <TouchableOpacity
        style={{
          position: "absolute",
          left: RFPercentage(4),
          top: RFPercentage(7),
        }}
      >
        <Ionicons
          name="chevron-back"
          style={{ fontSize: RFPercentage(3.5) }}
          color={COLORS.primary}
        />
      </TouchableOpacity>

      <View
        style={{
          marginTop: RFPercentage(5),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {warn ? (
          <Text
            style={{
              marginTop: RFPercentage(7),
              fontSize: RFPercentage(2.5),
              color: COLORS.warn,
            }}
          >
            PINs do not match
          </Text>
        ) : null}
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            marginTop: warn ? RFPercentage(7) : RFPercentage(16),
            fontSize: RFPercentage(3.5),
            color: COLORS.primary,
            fontWeight: "bold",
          }}
        >
          {warn ? "Confirm New PIN" : "Enter Old PIN"}
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: RFPercentage(2) }}>
        {/* First input */}
        <View style={styles.input}>
          <Text style={styles.textinp}>
            {value[0] === "" || value[0] === undefined ? "" : "*"}
          </Text>
        </View>
        {/* second input */}
        <View style={styles.input}>
          <Text style={styles.textinp}>
            {value[1] === "" || value[1] === undefined ? "" : "*"}
          </Text>
        </View>
        {/* third input */}
        <View style={styles.input}>
          <Text style={styles.textinp}>
            {value[2] === "" || value[2] === undefined ? "" : "*"}
          </Text>
        </View>
        {/* fourth input */}
        <View style={styles.input}>
          <Text style={styles.textinp}>
            {value[3] === "" || value[3] === undefined ? "" : "*"}
          </Text>
        </View>
        {/* fifth input */}
        <View style={styles.input}>
          <Text style={styles.textinp}>
            {value[4] === "" || value[4] === undefined ? "" : "*"}
          </Text>
        </View>
        {/* sixth input */}
        <View style={styles.input}>
          <Text style={styles.textinp}>
            {value[5] === "" || value[5] === undefined ? "" : "*"}
          </Text>
        </View>
      </View>

      {/* Keypad */}
      <View
        style={{
          width: "100%",
          height: RFPercentage(53),
          position: "absolute",
          bottom: 0,
          backgroundColor: COLORS.white,
        }}
      >
        {/* First row */}
        <View style={styles.rowst}>
          <TouchableOpacity style={{ position: "absolute", left: 0 }}>
            <Text onPress={() => handleChange("1")} style={styles.keypad}>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => handleChange("2")} style={styles.keypad}>
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: "absolute", right: 0 }}>
            <Text onPress={() => handleChange("3")} style={styles.keypad}>
              3
            </Text>
          </TouchableOpacity>
        </View>

        {/* second row */}
        <View style={styles.rowst}>
          <TouchableOpacity style={{ position: "absolute", left: 0 }}>
            <Text onPress={() => handleChange("4")} style={styles.keypad}>
              4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => handleChange("5")} style={styles.keypad}>
              5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: "absolute", right: 0 }}>
            <Text onPress={() => handleChange("6")} style={styles.keypad}>
              6
            </Text>
          </TouchableOpacity>
        </View>

        {/* third row */}
        <View style={styles.rowst}>
          <TouchableOpacity style={{ position: "absolute", left: 0 }}>
            <Text onPress={() => handleChange("7")} style={styles.keypad}>
              7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => handleChange("8")} style={styles.keypad}>
              8
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: "absolute", right: 0 }}>
            <Text onPress={() => handleChange("9")} style={styles.keypad}>
              9
            </Text>
          </TouchableOpacity>
        </View>

        {/* Fourth  row*/}
        <View style={styles.rowst}>
          <TouchableOpacity style={{ position: "absolute", left: 0 }}>
            {/* Dummy entry */}
            <Text style={{ color: COLORS.white, fontSize: RFPercentage(3.4) }}>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => handleChange("0")} style={styles.keypad}>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleClear()}
            style={{ position: "absolute", right: 0 }}
          >
            <Image source={require("../../assets/images/cross.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );  
    
}

const styles = StyleSheet.create({
  input: {
    marginTop: RFPercentage(2),
    marginRight: RFPercentage(1.3),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: RFPercentage(6),
    height: RFPercentage(6.9),
    marginVertical: RFPercentage(0.7),
    borderRadius: RFPercentage(1)
},

textinp: {
    color: COLORS.warn ? 'red' : COLORS.black, 
    fontSize: RFPercentage(5)

},

keypad: {
    fontFamily: 'DMSans_700Bold',
    color: COLORS.keypad, 
    fontSize: RFPercentage(3.4)
},

rowst: {
    marginTop: RFPercentage(6), 
    width: '80%', 
    flexDirection: 'row', 
    alignSelf: 'center', 
    justifyContent: 'center', 
    alignItems: 'center'

}








});

export default PinDoNotMatch;

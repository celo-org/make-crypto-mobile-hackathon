import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

function NavHeader(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.name);

  useEffect(() => {
    if (props.newTitle) {
      setTitle(props.newTitle);
    }
  });

  return (
    <View style={styles.container}>
      {!props.hideBackButton ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={32} color="#4840BB" />
        </TouchableOpacity>
      ) : (
        <View style={styles.dummyView} />
      )}

      {props.showTitle && <Text style={styles.title}>{title}</Text>}

      <View style={styles.dummyView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    width: 40,
    height: 40,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    textAlign: "center",
    fontFamily: "Rubik_500Medium",
  },

  dummyView: {
    width: 40,
  },
});

export default NavHeader;

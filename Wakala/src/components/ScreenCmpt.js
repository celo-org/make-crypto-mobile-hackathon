import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function ScreenCmpt({ children, home }) {
  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeArea} />

      <SafeAreaView
        style={[
          styles.bottomSafeArea,
          home === true && { backgroundColor: "#F5F5F5" },
        ]}
      >
        <View style={styles.statusBar}>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="#F7EFFA"
          />
        </View>

        <LinearGradient
          colors={["#F7EFFA", "#FCF8ED"]}
          start={[1, 0]}
          end={[1, 1]}
          style={styles.screen}
        >
          {children}
        </LinearGradient>
      </SafeAreaView>
    </Fragment>
  );
}

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: "#F7EFFA",
  },

  bottomSafeArea: {
    flex: 1,
    backgroundColor: "#FCF8ED",
  },

  statusBar: {
    height: BAR_HEIGHT,
  },

  screen: {
    flex: 1,
  },
});

export default ScreenCmpt;

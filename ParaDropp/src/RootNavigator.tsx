import React from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./screens/Tabs";

LogBox.ignoreLogs([
  "Warning: The provided value 'moz",
  "Warning: The provided value 'ms-stream",
]);

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <TabNavigator />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

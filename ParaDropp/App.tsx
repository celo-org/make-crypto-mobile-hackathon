import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { LogBox } from "react-native";
import RootNavigator from "./src/RootNavigator";
import "./global";

LogBox.ignoreLogs([
  "Warning: The provided value 'moz",
  "Warning: The provided value 'ms-stream",
]);

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <RootNavigator />
    </>
  );
}

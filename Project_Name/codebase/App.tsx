import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { border, fontsFamily } from './src/styles';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import { MontserratAlternates_600SemiBold } from '@expo-google-fonts/montserrat-alternates';

import { Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Montserrat_700Bold,
    MontserratAlternates_600SemiBold,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 300,
    height: 500,
    borderTopLeftRadius: border.radius.lg10,
    borderTopRightRadius: border.radius.lg10,
    backgroundColor: 'red',
    borderWidth: 0.5,
    borderColor: 'blue',
  },
  text: {
    fontFamily: fontsFamily.montserrat.bold,
  },
});

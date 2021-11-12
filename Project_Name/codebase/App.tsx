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

import {
  MontserratAlternates_400Regular,
  MontserratAlternates_600SemiBold,
} from '@expo-google-fonts/montserrat-alternates';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Montserrat_700Bold,
    MontserratAlternates_400Regular,
    MontserratAlternates_600SemiBold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }
  return (
    <View>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

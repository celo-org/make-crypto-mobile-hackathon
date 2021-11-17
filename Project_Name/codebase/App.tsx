import 'intl';
import 'intl/locale-data/jsonp/en-US';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import BottomRoutes from './src/routes/bottomTabs.routes';

import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import {
  useFonts as useFontsAlternates,
  MontserratAlternates_400Regular,
  MontserratAlternates_600SemiBold,
} from '@expo-google-fonts/montserrat-alternates';

export default function App() {
  const [montserratFontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const [montserratAlternatesFontsLoaded] = useFontsAlternates({
    MontserratAlternates_400Regular,
    MontserratAlternates_600SemiBold,
  });

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_600SemiBold,
        Montserrat_500Medium,
        Montserrat_700Bold,
        MontserratAlternates_400Regular,
        MontserratAlternates_600SemiBold,
      }))();
  }, []);

  if (!montserratFontsLoaded && !montserratAlternatesFontsLoaded) {
    <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <BottomRoutes />
    </NavigationContainer>
  );
}

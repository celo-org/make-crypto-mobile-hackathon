import 'intl';
import 'intl/locale-data/jsonp/en-US';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import BottomRoutes from './src/routes/bottomTabs.routes';

import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export default function App() {
  const [montserratFontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });
  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
      }))();
  }, []);

  if (!montserratFontsLoaded) {
    <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <BottomRoutes />
    </NavigationContainer>
  );
}

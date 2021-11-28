import 'intl';
import './global';
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
import { ModalProvider } from './src/context/modal.context';

import { WalletProvider } from '@nft/context/wallet';
import { AuthProvider } from '@nft/context/auth';

export default function App() {
  const [montserratFontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!montserratFontsLoaded) {
    <AppLoading />;
  }

  return (
    <NavigationContainer>
      <ModalProvider>
        <AuthProvider>
          <WalletProvider>
            <StatusBar style="auto" />
            <BottomRoutes />
          </WalletProvider>
        </AuthProvider>
      </ModalProvider>
    </NavigationContainer>
  );
}

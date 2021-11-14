import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';

import EtherSvg from './assets/ether.svg';

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

import { LargeButton } from './src/components';
import { colors, fontsFamily, fontsSize } from './src/styles';
import { AlignTypes } from './src/utils/enum';

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

  if (!montserratFontsLoaded && !montserratAlternatesFontsLoaded) {
    <AppLoading />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LargeButton
        label="Place a bid"
        backgroundColor={colors.light.neutralColor4}
        iconChildren={EtherSvg}
        textAlign={AlignTypes.CENTER}
        textColor={colors.light.neutralColor11}
        textFontFamily={fontsFamily.montserratAlternates.semiBold600}
        textFontSize={fontsSize.md16}
      />
      <StatusBar style="auto" />
    </View>
  );
}

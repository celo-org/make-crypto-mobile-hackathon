import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
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
  useFonts as useFontsAlternates,
  MontserratAlternates_400Regular,
  MontserratAlternates_600SemiBold,
} from '@expo-google-fonts/montserrat-alternates';

import { Text, SubmitButton } from './src/components';
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
    <View>
      <SubmitButton label="Hello World" />
      <Text
        textDescription="Hello World"
        color={colors.light.neutralColor7}
        textAlign={AlignTypes.CENTER}
        fontFamily={fontsFamily.montserrat.medium}
        fontsSize={fontsSize.xs12}
      />
      <StatusBar style="auto" />
    </View>
  );
}

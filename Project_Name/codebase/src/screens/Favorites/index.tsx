import React from 'react';
import { SafeAreaView, View } from 'react-native';

import HipaLogoSVG from '../../../assets/hipa-logo.svg';
import HIPASVG from '../../../assets/HIPA.svg';

import MenuSvg from '../../../assets/menu.svg';
import Magnifier from '../../../assets/magnifier.svg';

import { SquareButton, Text } from '@nft/components';
import { colors, fontsFamily, fontsSize } from '@nft/styles';

import { styles } from './styles';

const Favorites = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <HipaLogoSVG />
          <View style={styles.divider} />
          <HIPASVG />
        </View>
        <View style={styles.buttons}>
          <SquareButton iconChildren={Magnifier} />
          <SquareButton iconChildren={MenuSvg} />
        </View>
      </View>

      <View style={styles.title}>
        <Text
          color={colors.light.neutralColor5}
          fontFamily={fontsFamily.montserrat.semiBold600}
          fontsSize={fontsSize.xl20}
          textDescription={'Favorites'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorites;

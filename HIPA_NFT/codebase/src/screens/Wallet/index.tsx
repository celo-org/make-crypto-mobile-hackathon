import React from 'react';
import { SafeAreaView, View } from 'react-native';

import HipaLogoSVG from '../../../assets/hipa-logo.svg';
import HIPASVG from '../../../assets/HIPA.svg';

import MenuSvg from '../../../assets/menu.svg';
import Magnifier from '../../../assets/magnifier.svg';

import { styles } from './styles';
import { SquareButton, Text } from '@nft/components';
import { colors, fontsFamily, fontsSize } from '@nft/styles';

const Wallet = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <HipaLogoSVG />
          <View style={{ paddingRight: 8 }} />
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
          textDescription={'Wallet'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Wallet;

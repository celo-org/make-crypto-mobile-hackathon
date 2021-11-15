import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Text } from '..';
import { colors, fontsFamily } from '../../styles';
import { SvgProps } from 'react-native-svg';
import fontSizes from '../../styles/fontSizes';
import { AlignTypes } from '../../utils/enum';

import { styles } from './styles';

interface IBidCard {
  value: number;
  smallIconChildren: React.FC<SvgProps>;
  largeIconChildren: React.FC<SvgProps>;
  currency: string;
  small?: boolean;
}

const BidCard = ({
  value,
  currency,
  smallIconChildren: SmallIconChildren,
  largeIconChildren: LargeIconChildren,
  small,
}: IBidCard): JSX.Element => {
  const styleManager = StyleSheet.create({
    icon: {
      width: 25,
      height: 25,
    },
  });
  return (
    <View style={styles.container}>
      <View style={[styles.icon, small && styleManager.icon]}>
        {small ? <SmallIconChildren /> : <LargeIconChildren />}
      </View>
      <View style={styles.texts}>
        <Text
          textDescription={'Current Bid'}
          color={colors.light.neutralColor5}
          fontFamily={fontsFamily.montserrat.medium500}
          fontsSize={small ? fontSizes.xxs10 : fontSizes.sm14}
          textAlign={AlignTypes.CENTER}
        />
        <Text
          textDescription={`${value} ${currency}`}
          color={colors.light.neutralColor5}
          fontFamily={fontsFamily.montserrat.bold700}
          fontsSize={small ? fontSizes.xs12 : fontSizes.md16}
          textAlign={AlignTypes.CENTER}
        />
      </View>
    </View>
  );
};

export default BidCard;

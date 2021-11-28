import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Text } from '@nft/components';
import { colors, fontsFamily, fontsSize } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import { SvgProps } from 'react-native-svg';

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
          fontsSize={small ? fontsSize.xxs10 : fontsSize.sm14}
          textAlign={AlignTypes.CENTER}
        />
        <Text
          textDescription={`${value} ${currency}`}
          color={colors.light.neutralColor5}
          fontFamily={fontsFamily.montserrat.bold700}
          fontsSize={small ? fontsSize.xs12 : fontsSize.md16}
          textAlign={AlignTypes.CENTER}
        />
      </View>
    </View>
  );
};

export default BidCard;

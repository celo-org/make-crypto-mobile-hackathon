import React from 'react';

import { Text } from '@nft/components';
import { colors, border } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import styles from './styles';

interface ISellTypesButton extends TouchableOpacityProps {
  title: string;
  Icon: typeof React.Component;
  isActive: boolean;
  fontsSize: number;
  fontFamily: string;
  textAlign: AlignTypes;
}

const SellTypesButton = ({
  title,
  Icon,
  isActive,
  fontsSize,
  fontFamily,
  textAlign,
  ...rest
}: ISellTypesButton) => {
  const colorManager = StyleSheet.create(
    isActive
      ? {
          button: {
            borderWidth: border.width.thick,
            borderColor: colors.light.neutralColor4,
            flexDirection: AlignTypes.ROW,
          },
        }
      : {
          button: {
            borderColor: colors.light.neutralColor9,
            borderWidth: border.width.thick,
            flexDirection: AlignTypes.ROW,
          },
        },
  );
  return (
    <TouchableOpacity style={[colorManager.button, styles.button]} {...rest}>
      <View style={styles.text}>
        <Text
          textDescription={title}
          color={colors.light.neutralColor3}
          fontsSize={fontsSize}
          fontFamily={fontFamily}
          textAlign={textAlign}
        />
      </View>
      <Icon key={title} />
    </TouchableOpacity>
  );
};

export default SellTypesButton;

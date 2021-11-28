import React from 'react';
import { StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text } from '@nft/components';
import { colors } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import { styles } from './styles';

interface FilterButtonProps extends RectButtonProps {
  title: string;
  isActive?: boolean;
  textColor: string;
  textFontFamily: string;
  textFontSize: number;
  textAlign: AlignTypes;
}

const FilterButton = ({
  title,
  isActive = false,
  textColor,
  textFontFamily,
  textFontSize,
  textAlign,
  ...rest
}: FilterButtonProps): JSX.Element => {
  const colorManager = StyleSheet.create({
    button: {
      backgroundColor: isActive ? colors.light.neutralColor1 : colors.light.neutralColor12,
    },
  });
  return (
    <RectButton style={[styles.container, colorManager.button]} {...rest}>
      <Text
        textDescription={title}
        color={isActive ? colors.light.neutralColor11 : textColor}
        fontsSize={textFontSize}
        fontFamily={textFontFamily}
        textAlign={textAlign}
      />
    </RectButton>
  );
};

export default FilterButton;

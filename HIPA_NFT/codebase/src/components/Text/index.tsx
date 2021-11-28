import React from 'react';
import { TextProps } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import { AlignTypes } from '@nft/utils/enum';

interface ITextProps extends TextProps {
  textDescription: string | number;
  color: string;
  fontFamily: string;
  fontsSize: number;
  textAlign?: AlignTypes;
  textDecoration?: boolean;
}

const TextComponent = ({
  textDescription,
  color,
  fontFamily,
  fontsSize,
  textAlign,
  textDecoration = false,
  ...rest
}: ITextProps): JSX.Element => {
  const styleManager = StyleSheet.create({
    textProps: {
      color: color,
      fontFamily: fontFamily,
      fontSize: fontsSize,
      textAlign: textAlign,
      textDecorationLine: textDecoration ? 'underline' : 'none',
    },
  });

  return (
    <Text style={styleManager.textProps} {...rest}>
      {textDescription}
    </Text>
  );
};

export default TextComponent;

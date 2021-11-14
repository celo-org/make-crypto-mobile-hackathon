import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AlignTypes } from '../../utils/enum';

interface ITextProps {
  textDescription: string;
  color: string;
  fontFamily: string;
  fontsSize: number;
  textAlign: AlignTypes;
}

const TextComponent = ({
  textDescription,
  color,
  fontFamily,
  fontsSize,
  textAlign,
}: ITextProps): JSX.Element => {
  const styleManager = StyleSheet.create({
    textProps: {
      color: color,
      fontFamily: fontFamily,
      fontSize: fontsSize,
      textAlign: textAlign,
    },
  });
  return <Text style={styleManager.textProps}>{textDescription}</Text>;
};

export default TextComponent;

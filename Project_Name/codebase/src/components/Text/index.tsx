import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface IDescriptionProps {
  textDescription: string;
  color: string;
  fontFamily: string;
  fontsSize: number;
  alignment: TextStyle['textAlign'];
}

const TextComponent = ({
  textDescription,
  color,
  fontFamily,
  fontsSize,
  alignment,
}: IDescriptionProps): JSX.Element => {
  const styleManager = StyleSheet.create({
    textProps: {
      color: color,
      fontFamily: fontFamily,
      fontSize: fontsSize,
      textAlign: alignment,
    },
  });
  return <Text style={styleManager.textProps}>{textDescription}</Text>;
};

export default TextComponent;

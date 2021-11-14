import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '..';
import { AlignTypes } from '../../utils/enum';
import styles from './style';

interface ITagProps {
  label: string;
  borderColor: string;
  color: string;
  fontFamily: string;
  fontSize: number;
  textAlign: AlignTypes;
}

const Tag = ({ label, color, borderColor, fontFamily, fontSize, textAlign }: ITagProps) => {
  const styleManager = StyleSheet.create({
    container: {
      borderColor,
    },
  });

  return (
    <View style={[styles.container, styleManager.container]}>
      <Text
        textDescription={label}
        color={color}
        fontFamily={fontFamily}
        fontsSize={fontSize}
        textAlign={textAlign}
      />
    </View>
  );
};

export default Tag;

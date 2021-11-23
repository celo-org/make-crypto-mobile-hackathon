import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@nft/components';
import { AlignTypes } from '@nft/utils/enum';
import styles from './styles';

interface ITagProps {
  label: string;
  backgroundColor?: string;
  borderColor: string;
  color: string;
  fontFamily: string;
  fontSize: number;
  textAlign: AlignTypes;
}

const Tag = ({
  label,
  color,
  borderColor,
  fontFamily,
  fontSize,
  textAlign,
  backgroundColor,
}: ITagProps) => {
  const styleManager = StyleSheet.create({
    container: {
      borderColor,
      backgroundColor,
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

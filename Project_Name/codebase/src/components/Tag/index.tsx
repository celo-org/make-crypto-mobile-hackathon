import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@nft/components';
import { AlignTypes } from '@nft/utils/enum';
import styles from './styles';
import { colors, fontsFamily, fontsSize } from '@nft/styles';

interface ITagProps {
  label: string;
  backgroundColor?: string;
  borderColor: string;
  key: string;
}

const Tag = ({ key, label, borderColor, backgroundColor }: ITagProps) => {
  const styleManager = StyleSheet.create({
    container: {
      borderColor,
      backgroundColor,
    },
  });

  return (
    <View style={[styles.container, styleManager.container]} key={key}>
      <Text
        textDescription={label}
        color={colors.light.neutralColor5}
        fontFamily={fontsFamily.montserrat.medium500}
        fontsSize={fontsSize.xxs10}
      />
    </View>
  );
};

export default Tag;

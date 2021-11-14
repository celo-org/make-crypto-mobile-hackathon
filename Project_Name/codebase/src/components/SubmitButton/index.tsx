import React from 'react';
import { FlexAlignType, StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import styles from './styles';

interface ISubmitButtonProps extends RectButtonProps {
  label: string;
  backgroundColor: string;
  borderRadius: number;
  color: string;
}

const SubmitButton = ({
  label,
  backgroundColor,
  borderRadius,
  color,
  ...rest
}: ISubmitButtonProps): JSX.Element => {
  const styleManager = StyleSheet.create({
    container: {
      backgroundColor,
      borderRadius,
    },
    text: {
      color,
    },
  });
  const { onPress } = { ...rest };
  return (
    <RectButton style={[styles.container, styleManager.container]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </RectButton>
  );
};

export default SubmitButton;

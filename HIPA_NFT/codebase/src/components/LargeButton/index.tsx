import React from 'react';
import { StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text } from '@nft/components';
import { SvgProps } from 'react-native-svg';
import { AlignTypes } from '@nft/utils/enum';
import styles from './styles';

interface ILargeButtonProps extends RectButtonProps {
  label: string;
  backgroundColor: string;
  iconChildren?: React.FC<SvgProps>;
  textColor: string;
  textFontFamily: string;
  textFontSize: number;
  textAlign: AlignTypes;
}

const LargeButton = ({
  label,
  backgroundColor,
  iconChildren: IconChildren,
  textColor,
  textAlign,
  textFontFamily,
  textFontSize,
  ...rest
}: ILargeButtonProps): JSX.Element => {
  const colorManager = StyleSheet.create({
    container: {
      backgroundColor,
    },
  });
  return (
    <RectButton style={[styles.container, colorManager.container]} {...rest}>
      {IconChildren && <IconChildren style={styles.icon} />}
      <Text
        textDescription={label}
        color={textColor}
        fontFamily={textFontFamily}
        fontsSize={textFontSize}
        textAlign={textAlign}
      />
    </RectButton>
  );
};

export default LargeButton;

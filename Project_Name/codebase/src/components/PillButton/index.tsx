import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import TextComponent from '../Text';

import { styles } from './styles';

interface IPillButtonProps extends RectButtonProps {
  textFontFamily: string;
  textFontsSize: number;
  textColor: string;
  label: string;
  iconChildren?: React.FC<SvgProps>;
  backgroundColor: string;
  textButtonDescription?: string;
}

const PillButton = ({
  textFontFamily,
  textFontsSize,
  textColor,
  label,
  iconChildren: IconChildren,
  backgroundColor,
  textButtonDescription,
  ...rest
}: IPillButtonProps): JSX.Element => {
  const stylesManager = StyleSheet.create({
    container: {
      backgroundColor,
    },
  });
  return (
    <RectButton style={[styles.container, stylesManager.container]} {...rest}>
      <View style={styles.containerTextIcon}>
        {IconChildren && <IconChildren style={styles.icon} />}

        <TextComponent
          fontFamily={textFontFamily}
          fontsSize={textFontsSize}
          color={textColor}
          textDescription={label}
        />
      </View>

      {textButtonDescription && (
        <Text style={styles.textButtonDescription}>{textButtonDescription}</Text>
      )}
    </RectButton>
  );
};

export default PillButton;

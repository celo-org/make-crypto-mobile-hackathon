import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import Text from '../Text';

import { styles } from './styles';

interface IPillButtonProps extends RectButtonProps {
  textFontFamily: string;
  textFontsSize: number;
  textColor: string;
  label: string;
  iconChildren?: React.FC<SvgProps>;
}

const PillButton = ({
  textFontFamily,
  textFontsSize,
  textColor,
  label,
  iconChildren: IconChildren,
  ...rest
}: IPillButtonProps): JSX.Element => {
  return (
    <RectButton style={styles.container} {...rest}>
      {IconChildren && <IconChildren style={styles.icon} />}

      <Text
        fontFamily={textFontFamily}
        fontsSize={textFontsSize}
        color={textColor}
        textDescription={label}
      />
    </RectButton>
  );
};

export default PillButton;

import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text } from '..';
import { SvgProps } from 'react-native-svg';
import { AlignTypes } from '../../utils/enum';
import styles from './styles';
import { dimensions } from '../../styles';

interface ILargeButtonProps extends RectButtonProps {
  label: string;
  iconChildren?: React.FC<SvgProps>;
  textColor: string;
  textFontFamily: string;
  textFontSize: number;
  textAlign: AlignTypes;
}

const LargeButton = ({
  label,
  iconChildren: IconChildren,
  textColor,
  textAlign,
  textFontFamily,
  textFontSize,
  ...rest
}: ILargeButtonProps): JSX.Element => {
  return (
    <RectButton style={styles.container} {...rest}>
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

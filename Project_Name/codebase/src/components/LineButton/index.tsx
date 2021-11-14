import React from 'react';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from '..';
import { AlignTypes } from '../../utils/enum';

interface ILineButtonProps extends TouchableOpacityProps {
  label: string;
  textColor: string;
  textFontFamily: string;
  textFontSize: number;
  textAlign: AlignTypes;
}

const LineButton = ({
  label,
  textColor,
  textAlign,
  textFontFamily,
  textFontSize,
  ...rest
}: ILineButtonProps): JSX.Element => {
  return (
    <TouchableOpacity {...rest}>
      <Text
        textDescription={label}
        color={textColor}
        textAlign={textAlign}
        fontFamily={textFontFamily}
        fontsSize={textFontSize}
        textDecoration
      />
    </TouchableOpacity>
  );
};

export default LineButton;

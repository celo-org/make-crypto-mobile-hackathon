import React from 'react';

import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';
import { Text } from '..';
import { AlignTypes } from '../../utils/enum';

interface ILineButtonProps extends BorderlessButtonProps {
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
    <BorderlessButton {...rest}>
      <Text
        textDescription={label}
        color={textColor}
        textAlign={textAlign}
        fontFamily={textFontFamily}
        fontsSize={textFontSize}
        textDecoration
      />
    </BorderlessButton>
  );
};

export default LineButton;

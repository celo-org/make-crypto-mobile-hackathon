import React from 'react';

import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';

import { SvgProps } from 'react-native-svg';

import { styles } from './styles';

interface ISquareButton extends BorderlessButtonProps {
  iconChildren: React.FC<SvgProps>;
}

const SquareButton = ({ iconChildren: IconChildren, ...rest }: ISquareButton): JSX.Element => {
  return (
    <BorderlessButton style={styles.container} {...rest}>
      <IconChildren />
    </BorderlessButton>
  );
};

export default SquareButton;

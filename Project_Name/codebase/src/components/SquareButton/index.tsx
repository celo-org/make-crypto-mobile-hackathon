import React from 'react';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { SvgProps } from 'react-native-svg';

import { styles } from './styles';

interface ISquareButton extends RectButtonProps {
  iconChildren: React.FC<SvgProps>;
}

const SquareButton = ({ iconChildren: IconChildren, ...rest }: ISquareButton): JSX.Element => {
  return (
    <RectButton style={styles.container} {...rest}>
      <IconChildren />
    </RectButton>
  );
};

export default SquareButton;

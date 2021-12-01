import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import Svg, {Circle} from 'react-native-svg';

export const DotLegend = (props) => {
  const renderDot = (color) => {
    return (
      <Svg height="12" width="10" viewBox="0 10 100 100">
        <Circle cx="50" cy="50" r="45" fill={color} />
      </Svg>
    );
  };

  return (
    <Button
      size="tiny"
      style={styles.button}
      appearance="ghost"
      accessoryLeft={() => renderDot(props.color)}>
      {props.name}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '30%',
  },
});

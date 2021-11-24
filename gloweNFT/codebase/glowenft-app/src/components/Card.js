import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  STANDARD_WHITE, WIDTH_DEVICE,
} from '../constants';
import {Normalize} from '../utils';
import {Row} from './index';
import {BoxShadow} from 'react-native-shadow';
import {getColor} from '../constants/colors';


export class Card extends React.Component {
  render() {
    const {wrapperStyle, style, children, color, radius} = this.props;

    const shadowOpt = {
      width: WIDTH_DEVICE - Normalize(20),
      height: wrapperStyle.height,
      color: getColor(color) || STANDARD_WHITE,
      // color: "#FFFFFF",
      border: Normalize(radius || 5),
      radius: Normalize(15),
      opacity: 0.5,
      x: 0,
      y: 0,
      style: {
        marginHorizontal: Normalize(10),
        ...wrapperStyle,
      }
    }
    return (
      <BoxShadow setting={shadowOpt} >
        <Row style={[styles.container, style]}>
          {children}
        </Row>
      </BoxShadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Normalize(15),
    borderWidth: 3,
    borderColor: STANDARD_WHITE,
    padding: Normalize(10),
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1D1D1D'
  },
});

export default Card;

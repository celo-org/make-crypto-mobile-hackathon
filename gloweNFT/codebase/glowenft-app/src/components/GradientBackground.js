import React from 'react';
import { StyleSheet, ImageBackground, StatusBar } from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_GRADIENT,
  PRIMARY_YELLOW,
  STANDARD_BOTTOM_SPACE,
  STANDARD_GREY,
  STANDARD_STATUS_BAR_HEIGHT,
} from '../constants';
import {Normalize} from '../utils';
import {ActivityIndicator} from 'react-native-paper';
import Row from './Row';
import LinearGradient from 'react-native-linear-gradient'
import {BackgroundPattern} from '../assets';

const noPaddingStyle = {
  paddingTop: 0,
  paddingBottom: 0
}

export class GradientBackground extends React.Component {
  render() {
    const { style, children } = this.props;

    return (
      <LinearGradient colors={PRIMARY_GRADIENT} style={[styles.container, style]} start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}>
        {/*<ImageBackground style={[styles.container, noPadding && noPaddingStyle, style]} source={BackgroundPattern}>*/}
          {children}
        {/*</ImageBackground>*/}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default GradientBackground

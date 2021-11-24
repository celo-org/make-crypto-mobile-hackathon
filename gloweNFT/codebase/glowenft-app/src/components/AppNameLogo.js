import React from 'react';
import {StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View, Text} from 'react-native';
import Row from './Row';
import {LogoTransparent} from '../assets';
import {PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, PRIMARY_VERY_LIGHT_COLOR, STANDARD_WHITE} from '../constants';
import {Normalize} from '../utils';


export class AppNameLogo extends React.Component {

  render() {
    const { style, light, small } = this.props;

    if (small) {
      return (
        <Row style={[styles.container, style]}>
          <Row style={{flex: 0, marginRight: 20,}}>
            <Text style={[styles.smallTextTitle, light && {color: STANDARD_WHITE}]}>doc</Text><Text style={[styles.smallTextTitle2, light && {color: PRIMARY_VERY_LIGHT_COLOR}]}>dot</Text>
          </Row>
          <Image source={LogoTransparent} style={styles.smallLogo}/>
        </Row>
      );
    }

    return (
      <Row style={[styles.container, style]}>
        <Row>
          <Text style={[styles.textTitle, light && {color: STANDARD_WHITE}]}>doc</Text><Text style={[styles.textTitle2, light && {color: PRIMARY_VERY_LIGHT_COLOR}]}>dot</Text>
        </Row>
        <Image source={LogoTransparent} style={styles.logo}/>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: Normalize(48),
    color: PRIMARY_COLOR,
    textAlign: 'left',
    letterSpacing: 3
  },
  textTitle2: {
    fontSize: Normalize(48),
    color: PRIMARY_LIGHT_COLOR,
    textAlign: 'left',
    letterSpacing: 3
  },
  logo: {
    width: 80,
    height: 80
  },
  smallTextTitle: {
    fontSize: Normalize(30),
    color: PRIMARY_COLOR,
    textAlign: 'left',
    letterSpacing: 3
  },
  smallTextTitle2: {
    fontSize: Normalize(30),
    color: PRIMARY_LIGHT_COLOR,
    textAlign: 'left',
    letterSpacing: 3
  },
  smallLogo: {
    width: 50,
    height: 50
  }
});

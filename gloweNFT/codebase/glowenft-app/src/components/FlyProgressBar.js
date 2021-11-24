import React, { PureComponent } from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import {
  ERROR_COLOR,
  PRIMARY_COLOR,
  PRIMARY_DARK_COLOR,
  PRIMARY_LIGHT_COLOR, SECONDARY_COLOR,
  STANDARD_STATUS_BAR_HEIGHT,
  STANDARD_WHITE
} from '../constants';
import _ from 'lodash'

import { TextInput as TextInputPaper } from 'react-native-paper';
import Row from './Row';
import {Normalize} from '../utils';
import {BellIcon, Logo} from "../assets";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'

export class FlyProgressBar extends PureComponent {

  state = {
    showPassword: false
  }

  componentDidMount() {

  };

  render() {
    const { style, value } = this.props;

    return (
      <LinearGradient colors={[PRIMARY_COLOR, SECONDARY_COLOR]} style={[styles.container, style]} >
        <Row justifyCenter>
          <Text style={styles.text}>{value}%</Text>
        </Row>
        <View style={[styles.content, {width: 100-value+'%'}]}>

        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: STANDARD_WHITE,
    padding: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 50,
  },
  content: {
    backgroundColor: STANDARD_WHITE,
    height: '100%'
  },
  text: {
    fontSize: Normalize(18),
    color: STANDARD_WHITE,
    alignSelf: 'center',
    fontWeight: '800'
  }
});


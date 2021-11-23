import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {PRIMARY_COLOR, PRIMARY_YELLOW} from '../constants';
import {ArrowRight, ArrowRightDisabled} from '../assets';
import {Normalize} from '../utils';
import {ActivityIndicator} from 'react-native-paper';
import Row from './Row';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export class ButtonPicker extends React.Component {
  render() {
    const { onPress, style, text, nextArrow, loading, arrowStyle, disabled } = this.props;

    return (
      <TouchableOpacity style={[styles.container, disabled && {backgroundColor: '#F1F1F1'} ,style]} onPress={onPress} disabled={disabled}>
        <Text style={styles.text}>{text}</Text>
        <FontAwesome5 name={'caret-down'} size={20}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5FB',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: PRIMARY_COLOR,
    fontSize: Normalize(14),
    marginRight: 10,
  },
  nextArrow: {
    marginLeft: 30
  }
});


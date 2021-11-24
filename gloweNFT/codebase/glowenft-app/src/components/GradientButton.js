import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {PRIMARY_COLOR, PRIMARY_YELLOW, SECONDARY_COLOR, STANDARD_GREY, STANDARD_WHITE} from '../constants';
import {ArrowRight, ArrowRightDisabled} from '../assets';
import {Normalize} from '../utils';
import {ActivityIndicator} from 'react-native-paper';
import Row from './Row';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class GradientButton extends React.Component {
  render() {
    const { onPress, style, text, wrapperStyle, loading, textStyle, disabled, icon } = this.props;

    return (
      <LinearGradient colors={[PRIMARY_COLOR, SECONDARY_COLOR]} style={[styles.container ,style]}>
        <TouchableOpacity style={[styles.wrapper, wrapperStyle]} onPress={onPress} disabled={disabled || loading}>
          {!loading ?
            <Row style={[styles.content]}>
              <Text style={[styles.text, textStyle]}>{text}</Text>
              {!!icon && <FontAwesome name={icon} style={styles.icon} size={25}/>}
            </Row> :
            <ActivityIndicator color={PRIMARY_YELLOW} /> }
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 2
  },
  wrapper: {
    backgroundColor: STANDARD_WHITE,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: STANDARD_GREY,
    fontSize: Normalize(18),
  },
  nextArrow: {
    marginLeft: 30
  },
  icon: {
    marginLeft: 10
  }
});


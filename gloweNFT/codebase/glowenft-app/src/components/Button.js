import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  JTENERGY_BOLD,
  PRIMARY_COLOR, SECONDARY_COLOR,
  STANDARD_WHITE,
} from "../constants";
import {Normalize} from '../utils';
import {ActivityIndicator} from 'react-native-paper';
import Row from './Row';

export class Button extends React.Component {
  render() {
    const {
      onPress,
      style,
      text,
      loading,
      textStyle,
      disabled,
      secondary,
    } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.container,
          !!disabled && {backgroundColor: '#F1F1F1'},
          secondary && styles.containerSecondary,
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}>
        {!loading ? (
          <Row style={[styles.content]}>
            <Text style={[styles.text, secondary && styles.textSecondary, textStyle]}>{text}</Text>
          </Row>
        ) : (
          <ActivityIndicator color={'black'} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Normalize(45),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    width: '100%',
    borderWidth: 3,
  },
  containerSecondary: {
    backgroundColor: 'transparent',
    borderColor: PRIMARY_COLOR,
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    // color: STANDARD_GREY,
    fontSize: Normalize(18),
    fontFamily: JTENERGY_BOLD,
    color: 'black',
  },
  textSecondary: {
    color: STANDARD_WHITE,
  },
  nextArrow: {
    marginLeft: 30,
  },
});

export default Button;

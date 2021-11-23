import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox as PaperCheckbox} from "react-native-paper";
import {PRIMARY_COLOR, SECONDARY_COLOR, STANDARD_WHITE} from '../constants';
import {Normalize} from '../utils';

export class Radio extends React.Component {



  render() {
    const { status, onPress, label } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={[styles.circle, {borderColor: SECONDARY_COLOR}]}>
          {status &&
          <View style={styles.centerCircle}/>
          }
        </View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 50,
  },
  label: {
    fontSize: Normalize(14),
    marginLeft: 15,
    color: SECONDARY_COLOR
  },
  circle: {
    borderWidth: 4,
    borderColor: PRIMARY_COLOR,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: STANDARD_WHITE
  },
  centerCircle: {
    height: 13,
    width: 13,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 12
  }
});

export default Radio

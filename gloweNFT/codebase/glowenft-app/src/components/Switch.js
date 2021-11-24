import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PRIMARY_COLOR, STANDARD_GREY, STANDARD_WHITE} from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch as SwitchPaper} from "react-native-paper";

export class Switch extends Component {

  render() {

    const { status, onPress, label } = this.props;

    return (

      <View style={styles.container} onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
        <SwitchPaper color={PRIMARY_COLOR} value={status} onValueChange={onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0,
    flexDirection: 'row',
    minHeight: 50,
  },
  label: {
    maxWidth: '80%',
    fontSize: 18
  },
  square: {
    borderColor: STANDARD_GREY,
    borderWidth: 2,
    height: 26,
    width: 26,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerCircle: {
    height: 14,
    width: 14,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12
  }
});

export default Checkbox

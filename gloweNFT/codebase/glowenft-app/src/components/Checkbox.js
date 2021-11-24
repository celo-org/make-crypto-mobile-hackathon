import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PRIMARY_COLOR, STANDARD_GREY, STANDARD_WHITE} from "../constants";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Switch as SwitchPaper} from "react-native-paper";

export class Checkbox extends Component {

  render() {

    const { status, onPress, label, style, checkSize = 30 } = this.props;

    return (

      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        {status && <AntDesign name={'check'} size={checkSize}/>}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    backgroundColor: STANDARD_WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default Checkbox

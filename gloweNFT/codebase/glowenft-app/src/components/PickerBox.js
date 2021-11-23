import {StyleSheet, View, Dimensions, Text, Image, Animated, Platform} from 'react-native';
import React, {Component} from 'react';
import {HEIGHT_DEVICE, PRIMARY_COLOR, PRIMARY_DARK_COLOR, STANDARD_WHITE, WIDTH_DEVICE} from '../constants';
export const PickerBoxScreenId = 'et.pickerBox'

export class PickerBox extends Component {

  state = {

  }

  componentDidMount() {

  }

  render() {
    const {cardTop} = this.state;
    const {title, message, secondCallback, secondCallbackText} = this.props;
    return (
      <View style={styles.container}>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },


})


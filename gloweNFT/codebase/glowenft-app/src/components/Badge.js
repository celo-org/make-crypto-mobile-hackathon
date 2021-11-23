/**
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import {PRIMARY_COLOR, STANDARD_BOTTOM_SPACE, STANDARD_STATUS_BAR_HEIGHT, STANDARD_WHITE} from "../constants";

export class Badge extends Component {
  _renderStyle = () => {
    return {

    }
  }

  render() {
    const { text, style } = this.props

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: STANDARD_WHITE,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 7
  },
  text: {
    color: STANDARD_WHITE,
    fontSize: 12
  }
})

export default Badge

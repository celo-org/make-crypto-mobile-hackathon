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
import {STANDARD_BOTTOM_SPACE, STANDARD_STATUS_BAR_HEIGHT} from "../constants";

export class Container extends Component {
  _renderStyle = () => {
    return {

    }
  }

  render() {
    const {
      text,
      style,
      onPress,
      invertColor,
      disabled,
      children
    } = this.props

    const dynamicStyle = this._renderStyle(invertColor, disabled)
    return (
      <View style={[styles.container, style]}>
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: STANDARD_STATUS_BAR_HEIGHT,
    paddingBottom: STANDARD_BOTTOM_SPACE
  },
})

export default Container

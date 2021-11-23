/**
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import React from 'react'

export const Row = ({ children, style, pointerEvents = null, onLayout, noFlex, alignCenter, spaceBetween, width, justifyCenter }) => {

  return (
    <View
      style={[styles.row, noFlex && { flex: 0 }, alignCenter && {alignItems: 'center'}, justifyCenter && {justifyContent: 'center'}, spaceBetween && {justifyContent: 'space-between'}, width && {width}, style]}
      pointerEvents={pointerEvents}
      collapsable={false}
      onLayout={onLayout}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default Row

/**
 * @flow
 */

import {StyleSheet, View} from 'react-native';
import React from 'react';

export const Col = ({
  children,
  style,
  pointerEvents = null,
  alignCenter,
  flexStart,
  noFlex,
  justifyCenter,
  flexEnd,
}) => {
  return (
    <View
      style={[
        styles.col,
        flexStart && {alignItems: 'flex-start'},
        flexEnd && {alignItems: 'flex-end'},
        alignCenter && {alignItems: 'center'},
        justifyCenter && {justifyContent: 'center'},
        noFlex && {flex: 0},
        style,
      ]}
      pointerEvents={pointerEvents}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  col: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default Col;

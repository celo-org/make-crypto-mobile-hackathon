//Importações Externas
import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export const PortfolioTag = ({text}) => {
  return <Text style={styles.tag}>{`$${text}`}</Text>;
};

const styles = StyleSheet.create({
  tag: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 8,
    marginTop: 16,
    marginRight: 16,
    color: '#005CFF',
  },
});

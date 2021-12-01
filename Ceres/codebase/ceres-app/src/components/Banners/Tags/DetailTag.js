//Importações Externas
import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export const DetailTag = ({text}) => {
  return <Text style={styles.tag}>{text}</Text>;
};

const styles = StyleSheet.create({
  tag: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#CEDAFF',
    borderRadius: 24,
    marginTop: 8,
    marginRight: 8,
    color: '#005CFF',
  },
});

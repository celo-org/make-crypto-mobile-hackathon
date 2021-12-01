//Importações Externas
import React from 'react';

import {Avatar, Text} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';

//Importações Internas

export const RankedPosition = ({avatar, name, gains, index}) => {
  return (
    <View style={styles.container}>
      <Text>{index + 1}</Text>
      <Avatar
        style={styles.avatar}
        size="medium"
        source={require('../../assets/images/avatar.png')}
      />

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.gains}>{`$${gains}`}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 24,
    marginLeft: 24,
    paddingBottom: 16,
  },
  avatar: {
    marginRight: 16,
    marginLeft: 16,
  },
  name: {
    flex: 1,
  },
  gains: {
    fontWeight: 'bold',
    color: '#3CD654',
  },
});

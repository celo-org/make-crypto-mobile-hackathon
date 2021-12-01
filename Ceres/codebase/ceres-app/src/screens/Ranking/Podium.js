//Importações Externas
import React from 'react';

import {Layout, Avatar, Text} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';

//Importações Internas

export const Podium = ({first, second, third}) => {
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Avatar
          style={styles.avatar}
          size="large"
          source={require('../../assets/images/avatar.png')}
        />
        <Text style={styles.secondName}>{`${second.name}`}</Text>
        <Text style={styles.secondGains}>{`$${second.gains}`}</Text>
      </View>
      <View style={styles.firstContainer}>
        <Avatar
          style={styles.avatar}
          size="giant"
          source={require('../../assets/images/avatar.png')}
        />
        <Text style={styles.firstName}>{`${first.name}`}</Text>
        <Text style={styles.firstGains}>{`$${first.gains}`}</Text>
      </View>
      <View style={styles.thirdContainer}>
        <Avatar
          style={styles.avatar}
          size="medium"
          source={require('../../assets/images/avatar.png')}
        />
        <Text style={styles.thirdName}>{`${third.name}`}</Text>
        <Text style={styles.thirdGains}>{`$${third.gains}`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 8,
  },
  firstContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  secondContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    paddingTop: 8,
  },
  thirdContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    paddingTop: 16,
  },
});

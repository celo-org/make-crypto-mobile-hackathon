//Importações Externas
import React from 'react';

import {Layout, Avatar, Text} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';

//Importações Internas

export const UserPosition = ({userRanking, userName, userGains}) => {
  return (
    <View style={styles.container}>
      <Avatar
        style={styles.avatar}
        size="giant"
        source={require('../../assets/images/avatar.png')}
      />
      <View style={styles.info}>
        <Text>{userName}</Text>
        <Text>{`$${userGains}`}</Text>
      </View>
      <Text style={styles.position}>{userRanking}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#F6F7F9',
    margin: 24,
  },
  avatar: {
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  position: {
    backgroundColor: '#3CD654',
    color: 'white',
    borderRadius: 12,
    height: 24,
    paddingTop: 2,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

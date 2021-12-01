//Importações Externas
import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet, View, Dimensions, Image} from 'react-native';

import * as Progress from 'react-native-progress';
import lilDuck from '../../assets/images/avatar/lil-duck.jpg';

const data = {
  actualPoints: 1500,
  pointsToNextLevel: 3500,
  userLevel: 10,
  userLevelAlias:'LilDuck',
  totalPoints: 10000,
};
const windowWidth = Dimensions.get('window').width;

export const InvestorProfileBanner = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>Level {data.userLevel} ({data.userLevelAlias})</Text>
        <Text style={styles.info}>
          Próximo nível: {data.actualPoints}/{data.pointsToNextLevel}
        </Text>
        <Progress.Bar
          progress={data.actualPoints / data.pointsToNextLevel}
          borderWidth={0}
          color="#1BD665"
          unfilledColor="white"
          width={windowWidth * 0.5}
          height={6}
        />
      </View>
      <Image style={styles.imageBackground} source={lilDuck} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    marginTop: 40,
    backgroundColor: '#005CFF',
    borderRadius: 8,
    padding: 16,
  },
  infoContainer: {
    flex: 1,
  },
  info: {
    fontSize: 10,
    color: 'white',
    marginBottom: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 24,
  },
  imageBackground: {
    width: 100,
    height: 100,
    borderRadius: 8,
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

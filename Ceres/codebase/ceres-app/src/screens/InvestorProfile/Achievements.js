//Importações Externas
import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet, View, Image} from 'react-native';

import test from '../../assets/images/avatar/achievement.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {navigate} from '../../navigation/NavigationService';

const data = [
  {
    img: test,
    name: 'Indicar Inimigos1',
    done: 1,
    total: 4,
    pointsPerTask: 500,
    actualPoints: 1500,
    pointsToNextLevel: 3500,
  },
  {
    img: test,
    name: 'Indicar Amigos2',
    done: 1,
    total: 4,
    pointsPerTask: 500,
    actualPoints: 1500,
    pointsToNextLevel: 3500,
  },
  {
    img: test,
    name: 'Indicar Amigos3',
    done: 1,
    total: 4,
    pointsPerTask: 500,
    actualPoints: 1500,
    pointsToNextLevel: 3500,
  },
  {
    img: test,
    name: 'Indicar Amigos4',
    done: 1,
    total: 4,
    pointsPerTask: 500,
    actualPoints: 1500,
    pointsToNextLevel: 3500,
  },
  {
    img: test,
    name: 'Indicar Amigos5',
    done: 1,
    total: 4,
    pointsPerTask: 500,
    actualPoints: 1500,
    pointsToNextLevel: 3500,
  },
  {
    img: test,
    name: 'Indicar Amigos6',
    done: 1,
    total: 4,
    pointsPerTask: 500,
    actualPoints: 1500,
    pointsToNextLevel: 3500,
  },
  {
    img: test,
    name: 'Indicar Amigos7',
    done: 1,
    total: 4,
    pointsPerTask: 500,
    actualPoints: 1500,
    pointsToNextLevel: 3500,
  },
];

export const Achievements = (props) => {
  const handleOnPress = (params) => {
    navigate('AchievementDetail', params);
  };
  return (
    <View style={styles.container}>
      <Text category="h5" style={styles.header}>
        Conquistas
      </Text>
      <View style={styles.achievements}>
        {data.map((d, index) => (
          <TouchableOpacity
            style={styles.achievementContainer}
            key={index}
            onPress={() => handleOnPress(d)}>
            <Image source={d.img} style={styles.achievementImage} />
            <Text style={styles.achievementName}>{d.name}</Text>
            <Text style={styles.achievementProgress}>
              {d.done} de {d.total}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    backgroundColor: '#EBEBEB',
    borderRadius: 8,
    padding: 16,
  },
  achievements: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  achievementContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  achievementImage: {
    height: 80,
    width: 80,
  },
  achievementName: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  achievementProgress: {
    fontSize: 12,
    color: '#8F9BB3',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 18,
  },
});

//Importações Externas

import React from 'react';
import {SafeAreaView, Image, View, StyleSheet, Dimensions} from 'react-native';
import {Layout, StyleService, Text} from '@ui-kitten/components';
import * as Progress from 'react-native-progress';
//Importações Internas
import {CustomHeader} from '../../../shared/customHeader';
import {BorderlessButton} from 'react-native-gesture-handler';

export const AchievementDetailScreen = ({route}) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView>
      <Layout>
        <CustomHeader title="Detalhe da Recompensa" />
        <View style={styles.container}>
          <Image source={route.params.img} style={styles.image} />
          <Text style={styles.rewardName}>{route.params.name}</Text>
          <Text style={styles.rewardDescription}>
            Você conseguiu um total de{' '}
            {route.params.pointsPerTask * route.params.done} pontos com essa
            recompensa.
          </Text>
          <View style={styles.progressBarContainer}>
            <Text style={styles.progressBarLegend}>
              Próximo nível: 1500/3500
            </Text>
            <Progress.Bar
              progress={
                route.params.actualPoints / route.params.pointsToNextLevel
              }
              borderWidth={0}
              color="#1BD665"
              unfilledColor="#F4F5F7"
              width={windowWidth - 48}
              height={12}
            />
          </View>
          <View style={styles.rewardPerTaskContainer}>
            <Text style={styles.rewardPerTaskHeader}>
              Recompensa por conquista
            </Text>
            <Text style={styles.rewardPerTaskPoints}>{route.params.pointsPerTask}(x)</Text>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: 24,
    borderRadius: 8,
    padding: 16,
  },
  image: {
    height: 128,
    width: 128,
    marginBottom: 16,
  },
  rewardName: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 24,
  },
  rewardDescription: {
    fontSize: 16,
  },
  progressBarContainer: {
    marginTop: 48,
  },
  progressBarLegend: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rewardPerTaskContainer: {
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: '#F4F5F7',
    borderRadius: 8,
    padding: 8,
  },
  rewardPerTaskHeader: {
    fontWeight: 'bold',
    fontSize: 10,
    padding: 8,
  },
  rewardPerTaskPoints: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

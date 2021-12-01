//Importações Externas
import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet, View, Dimensions} from 'react-native';

const data = {actualPoints: 1500, pointsToNextLevel: 3500};
const windowWidth = Dimensions.get('window').width;

export const TriviaBanners = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Acertos</Text>
        <Text style={styles.info}>
          Próximo nível: {data.actualPoints}/{data.pointsToNextLevel}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>Pontos</Text>
        <Text style={styles.info}>
          Próximo nível: {data.actualPoints}/{data.pointsToNextLevel}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#005CFF',
    borderRadius: 8,
    padding: 8,
    margin: 12,
  },
  info: {
    fontSize: 10,
    color: 'white',
  },
  header: {
    fontSize: 18,
    color: 'white',
    marginBottom: 24,
  },
});

//Importações Externas
import React from 'react';
import {Text} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import * as Progress from 'react-native-progress';
import test from '../../assets/images/bank_bg.jpg';
import {navigate} from '../../navigation/NavigationService';
import {PortfolioTag} from './Tags/PortfolioTag';

export const ProgressBarTagBanner = ({
  title,
  totalValue,
  investedValue,
  url,
}) => {
  const pressAction = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pressAction(url)}>
        <ImageBackground
          source={test}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
          blurRadius={6}>
          <Text category="h5" status="control" style={styles.text}>
            {title}
          </Text>
          <PortfolioTag style={styles.tag} text={totalValue} />
          <View style={styles.progressView}>
            <Text category="s2" status="control" style={styles.progressBarText}>
              {`Total investido: ${investedValue}/ ${totalValue}`}
            </Text>
            <Progress.Bar
              progress={investedValue / totalValue}
              borderWidth={0}
              unfilledColor={'white'}
              width={300}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 141,
    borderRadius: 10,
    margin: 16,
    marginBottom: 24,
  },
  progressView: {
    marginBottom: 24,
    marginTop: 'auto',
    marginLeft: 16,
    marginRight: 16,
    width: '100%', 
  },
  progressBarText: {
    marginLeft: 'auto',
    marginRight: 40,
    fontWeight: 'bold',
  },
  imageBackground: {
    height: '100%',
  },
  imageStyle: {borderRadius: 8},
  text: {
    marginTop: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
});

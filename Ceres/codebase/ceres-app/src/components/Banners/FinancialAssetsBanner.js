//Importações Externas
import React from 'react';
import {Text, Divider, Icon} from '@ui-kitten/components';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {generateBoxShadow} from '../../assets/utils/generateBoxShadow';
import {DetailTag} from './Tags/DetailTag';
import * as NavigationService from '../../navigation/NavigationService';

export const FinancialAssetsBanner = ({
  title,
  risk,
  type,
  expectedRentability,
  lastMonthsRentability,
  apr,
  admnistrationFee,
  numberOfInvestors,
  volume,
  weeklyRentability,
  perfomanceFee,
  poolTotal,
  description,
  origin,
}) => {
  const handleOnPress = (url, params) => {
    if (url) {
      NavigationService.navigate(url, params);
    }
  };

  const data = {
    title: title,
    risk: risk,
    type: type,
    expectedRentability: expectedRentability,
    lastMonthsRentability: lastMonthsRentability,
    weeklyRentability: weeklyRentability,
    apr: apr,
    admnistrationFee: admnistrationFee,
    numberOfInvestors: numberOfInvestors,
    volume: volume,
    perfomanceFee: perfomanceFee,
    poolTotal: poolTotal,
    description: description,
    origin: origin,
  };
  return (
    <View style={[styles.container, styles.boxShadow]}>
      <TouchableOpacity
        onPress={() => handleOnPress('FinancialAssetDetail', data)}>
        <View>
          <View style={styles.topContainer}>
            <View style={styles.tagContainer}>
              <DetailTag text={`${risk} Risk`} />
              <DetailTag text={type} />
            </View>
            <Icon
              style={styles.arrow}
              fill="black"
              name="diagonal-arrow-right-up-outline"
            />
          </View>
          <Text style={styles.title} category="h6">
            {title}
          </Text>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.bottomContainer}>
          <Text category="c2">{`Rentabilidade esperada ${expectedRentability}% por Semana`}</Text>
          <Text category="c2">{`Rentabilidade último mês ${lastMonthsRentability}%`}</Text>
          <Text style={styles.apr} category="c2">{`APR: ${apr}%`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    marginBottom: 16,
    height: 132,
    display: 'flex',
    flexDirection: 'column',
  },
  arrow: {
    marginRight: 16,
    height: 32,
    width: 32,
  },
  title: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 16,
    height: 32,
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  divider: {
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: 'black',
  },
  bottomContainer: {
    marginLeft: 16,
    marginRight: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  apr: {
    position: 'absolute',
    right: 0,
  },
  boxShadow: generateBoxShadow(0, 0, '#000', 0.25, 3, 6, '#ffffff'),
});

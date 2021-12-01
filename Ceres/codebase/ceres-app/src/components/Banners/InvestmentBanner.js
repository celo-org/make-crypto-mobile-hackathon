//Importações Externas
import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import * as NavigationService from '../../navigation/NavigationService';

//Importações Internas
import {ScrollView} from 'react-native-gesture-handler';
import {generateBoxShadow} from '../../assets/utils/generateBoxShadow';

//lmy == Last Month Yield
const data = [
  {
    risk: 'Low',
    type: 'Paper',
    title: 'Tesla',
    origin: 'KreskoFi',
    expectedRentability: 10,
    lastMonthsRentability: 20,
    weeklyRentability: 1,
    perfomanceFee: 5,
    poolTotal: 1500000.0,
    volume: 1000000.0,
    numberOfInvestors: 2000,
    admnistrationFee: 0,
    apr: 275,
    description:
      'Esta pool é composta pelos seguintes tokens: {cUSD} e {mUSD}. É considerada de baixo risco. Movimentou nas ultimas 24 horas 2332 transações.',
  },
  {
    risk: 'High',
    type: 'Liquidity Pool',
    title: 'mcEUR- mcUSD',
    origin: 'UbeSwap',
    expectedRentability: 10,
    lastMonthsRentability: 20,
    weeklyRentability: 1,
    perfomanceFee: 5,
    poolTotal: 1500000.0,
    volume: 1000000.0,
    numberOfInvestors: 2000,
    admnistrationFee: 0,
    apr: 275,
    description:
      'Esta pool é composta pelos seguintes tokens: {cUSD} e {mUSD}. É considerada de baixo risco. Movimentou nas ultimas 24 horas 2332 transações.',
  }
];

const Banner = (props) => {
  const pressAction = (url, params) => {
    if (url) {
      NavigationService.navigate(url, params);
    }
  };

  return (
    <View style={[styles.container, styles.boxShadow]}>
      <TouchableOpacity onPress={() => pressAction('FinancialAssetDetail', props)}>
        <Text category="h6" style={styles.name}>
          {props.title}
        </Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.lastMonthYield} category="c2">
            {`Rentabilidade(30dias): ${props.lastMonthsRentability}%`}
          </Text>
          <Text category="c2" style={styles.apr}>{`APR: ${props.apr}%`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const InvestmentBanner = (props) => {
  return (
    <View style={{flex: 1, paddingTop: 16, paddingLeft: 16}}>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={true}>
        {data.map((banner, index) => {
          return (
            <Banner key={index}{...banner}/>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  boxShadow: generateBoxShadow(
    0,
    0,
    'rgba(0, 0, 0, 0.25)',
    0.25,
    3,
    10,
    'rgba(0, 0, 0, 0.25)',
  ),
});

export default InvestmentBanner;

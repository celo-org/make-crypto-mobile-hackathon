//Importações Externas
import {Layout, Tab, TabBar, TabView} from '@ui-kitten/components';
import React, {Fragment, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {FinancialAssetsBanner} from '../../components/Banners/FinancialAssetsBanner';
//Importações Internas
import {CustomHeader} from '../../shared/customHeader';

export const FinancialAssetsListScreen = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const data = [
    {
      risk: 'Low',
      type: 'Stable Coins',
      title: 'mcUSD - mcEUR',
      origin: 'Pools do Ubeswap',
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
      risk: 'Low',
      type: 'Stable Coins',
      title: 'mcUSD - mcEUR',
      origin: 'Pools do Ubeswap',
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
      risk: 'Low',
      type: 'Stable Coins',
      title: 'mcUSD - mcEUR',
      origin: 'Pools do Ubeswap',
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
      risk: 'Low',
      type: 'Stable Coins',
      title: 'mcUSD - mcEUR',
      origin: 'Pools do Ubeswap',
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
      risk: 'Low',
      type: 'Stable Coins',
      title: 'mcUSD - mcEUR',
      origin: 'Pools do Ubeswap',
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
      risk: 'Low',
      type: 'Stable Coins',
      title: 'mcUSD - mcEUR',
      origin: 'Pools do Ubeswap',
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
  ];
  const data2 = [
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
  ];

  return (
    <SafeAreaView>
      <CustomHeader title="Lista de Ativos" />
      <ScrollView>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          <Tab title="Pools">
            <Layout>
              {data.map((pool) => (
                <FinancialAssetsBanner key={data.indexOf(pool)} {...pool} />
              ))}
            </Layout>
          </Tab>
          <Tab title="Ações Sintéticas">
            <Layout>
              {data2.map((sintetic) => (
                <FinancialAssetsBanner
                  key={data.indexOf(sintetic)}
                  {...sintetic}
                />
              ))}
            </Layout>
          </Tab>
        </TabView>
      </ScrollView>
    </SafeAreaView>
  );
};

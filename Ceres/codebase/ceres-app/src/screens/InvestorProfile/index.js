//Importações Externas
import React from 'react';

import {Layout, useTheme} from '@ui-kitten/components';

import {Dimensions, ScrollView} from 'react-native';

//Importações Internas

import NavSaldo from '../../components/NavSaldo';

import {InvestorProfileBanner} from '../../components/Banners/InvestorProfileBanner';
import { Achievements } from './Achievements';

const vh = Dimensions.get('window').height * 0.01;

const data = [
  {name: 'Zezinho das Neves', gains: 5003.39},
  {name: 'Bebe Melão', gains: 5001.39},
  {name: 'Flash Gordon', gains: 5000.39},
  {name: 'Flash Gordon1', gains: 5000.39},
  {name: 'Flash Gordon2', gains: 5000.39},
  {name: 'Flash Gordon3', gains: 5000.39},
  {name: 'Flash Gordon4', gains: 5000.39},
  {name: 'Flash Gordon5', gains: 5000.39},
  {name: 'Flash Gordon6', gains: 5000.39},
  {name: 'Flash Gordon7', gains: 5000.39},
  {name: 'Flash Gordon8', gains: 5000.39},
  {name: 'Flash Gordon9', gains: 5000.39},
  {name: 'Flash Gordon10', gains: 5000.39},
];

const userData = {name: 'Programador', gains: -500.52, ranking: 2000};

export const InvestorProfileScreen = (props) => {
  const theme = useTheme();

  return (
    <ScrollView>
      <Layout>
        <NavSaldo />
        <InvestorProfileBanner />
        <Achievements />
      </Layout>
    </ScrollView>
  );
};

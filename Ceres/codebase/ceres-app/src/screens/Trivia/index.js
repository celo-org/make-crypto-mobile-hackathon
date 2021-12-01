//Importações Externas
import React from 'react';

import {Layout} from '@ui-kitten/components';

import {ScrollView} from 'react-native';

//Importações Internas

import NavSaldo from '../../components/NavSaldo';

import {TriviaBanners} from '../../components/Banners/TriviaBanners';
import {ProgressBarTagBanner} from '../../components/Banners/ProgressBarTagBanner';
import { RankingScreen } from '../Ranking';
import { SafeAreaView } from 'react-native-safe-area-context';

const banner = {
  title: 'Nova Trivia',
  totalValue: 3000.195,
  investedValue: 1500,
};

export const TriviaScreen = (props) => {
  return (
    <SafeAreaView> 
      <NavSaldo />
      <ScrollView>
        <Layout> 
          <TriviaBanners />
          <ProgressBarTagBanner {...banner} />
          <RankingScreen/>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

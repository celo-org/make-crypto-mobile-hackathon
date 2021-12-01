//Exportações Externas
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Button, Layout} from '@ui-kitten/components';

//Importações Internas

import HeaderTitle from '../../../components/headertitle';
import * as NavigationService from '../../../navigation/NavigationService'; 
import PortfolioHeader from '../../../components/Headers/PortfolioHeader';
import {PortfolioInfoBanner} from '../../../components/Banners/PortfolioInfoBanner';
 
const data = [
  {
    title: 'Magic Internet Money',
    pctg: 40.12,
    risk: 'Low',
    type: 'Stable Coins',
  },
  {
    title: 'Magic Internet Meme',
    pctg: 60.12,
    risk: 'High',
    type: 'Meme Coins',
  },
];

const PortfolioScreen = () => {
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: 'white'}}>
      <PortfolioHeader />
      <ScrollView>
        <Layout style = {{display: 'flex'}}>
          <HeaderTitle title={'Portfolio'} />
          {data.map((investment) => (
            <PortfolioInfoBanner {...investment} />
          ))}
        </Layout>
      </ScrollView>
      
      <Layout style = {{position: 'absolute', bottom: 0, padding: 16, width: '100%'}}>
        <Button onPress = {() => NavigationService.navigate('FinancialAssetsList')}>Adicionar Ativos</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default PortfolioScreen;

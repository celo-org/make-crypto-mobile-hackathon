//Importações Externas
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Layout, useTheme} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StatusBar, Platform, Dimensions} from 'react-native';
import AnimatedPullToRefresh from 'react-native-animated-pull-to-refresh'; 

//Importações Internas
import MainBanner from '../../components/mainBanner'; 
import SafeAreaView from 'react-native-safe-area-view';
import HeaderTitle from '../../components/headertitle'; 
import {updateFeed, updateFinished} from '../../store/actions/control'; 
import NavSaldo from '../../components/NavSaldo';
import IndicadorSaldo from '../../components/IndicadorSaldo'; 
import Bezier from '../../components/Graphs/Bezier';
import InvestmentBanner from '../../components/Banners/InvestmentBanner'; 
const wallet = require('../../assets/animations/wallet.json');

const vh = Dimensions.get('window').height * 0.01;

export const Homescreen = (props) => {
  const theme = useTheme();

  const [refreshing, setRefreshing] = React.useState(false);
 
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
   
    dispatch(updateFeed());
    wait(500).then(() => {
      setRefreshing(false);
      dispatch(updateFinished());
    });
  });

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFeed());
  }, []);

  return (
    <Layout>
      <StatusBar
        backgroundColor={theme['color-primary-600']}
        barStyle="light-content"
      />
      {Platform.OS == 'ios' && (
        <SafeAreaView
          style={{flex: 0, backgroundColor: theme['color-primary-500']}}
        />
      )}
      <NavSaldo />
      <AnimatedPullToRefresh
        isRefreshing={refreshing}
        onRefresh={onRefresh}
        pullHeight={10 * vh}
        backgroundColor={theme.white}
        renderElement={
          <ScrollView style={{backgroundColor: 'white', paddingBottom: 128}}>
            <IndicadorSaldo />
            <Bezier />
            <HeaderTitle title={'Destaques'} /> 
            <InvestmentBanner />
            <MainBanner /> 
          </ScrollView>
        }
        duration={1000}
        pullAnimationSource={wallet}
        startRefreshAnimationSource={wallet}
        refreshAnimationSource={wallet}
        endRefreshAnimationSource={wallet}
      />
    </Layout>
  );
};

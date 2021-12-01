//Exportações Externas
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Divider, Icon, TopNavigationAction} from '@ui-kitten/components';

//Importações Internas
import Servicos from './servicos';
import NavSaldo from '../../components/NavSaldo';
import MainBanner from '../../components/mainBanner';
import HeaderTitle from '../../components/headertitle';
import IndicadorSaldo from '../../components/IndicadorSaldo';
import PointsCard from '../homescreen/pointsCard';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const ServicosScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <NavSaldo variante="carteira" />
      <ScrollView>
        <IndicadorSaldo variante="carteira" />
        <Divider />
        <View style={{padding: 16}}>
          <PointsCard />
        </View>
        {/* <MainBanner/> */}
        <HeaderTitle title={'Serviços'} />
        <Servicos />

        {/* <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Carteira</Text>
      </Layout> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServicosScreen;

//Importações Externas
import React, { Fragment, useEffect, useState } from 'react';
import { Animated, SafeAreaView, Platform, ScrollView, View } from 'react-native';
import { Layout, Spinner, Text, useTheme,  } from '@ui-kitten/components';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
//Importações Internas
import { LocalizationContext } from '../../locales';
import { ThemeContext } from '../../../theme-context'; 
import { generalStyle } from '../../shared/generalStyle';
import { CustomHeader } from '../../shared/customHeader'; 
import HeaderWallet from '../homescreen/headerwallet'; 
import HeaderParallax from '../../components/headerParallax';
import HeaderTitle from '../../components/headertitle'
import Registro from './registro'
import getTransactions from '../../api/getTransactions'
import {Toast}  from '../../components/PopUp'
import { NoRegister } from '../../components/noregister';
 

const RenderContent = () => {

  const theme = useTheme()

  const [dataExtrato, setDataExtrato] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getTransactions().then(response =>{
      // console.log('Transactionms '  +JSON.stringify(response.data))
      console.log(JSON.stringify(response.data))
      let filteredData = null;
      filteredData = response.data.filter(ocorrencia => ocorrencia.credit_source == "WALLET" || ocorrencia.credit_source == 'CONVERSION' || (ocorrencia.credit_source == 'TASK' && ocorrencia.valor_BRL != null))
      setDataExtrato(filteredData)
      setLoading(false)
    }).catch(error =>{
      setLoading(false)
      setError(true)
      Toast.show({
        title: 'Tivemos um erro :(',
        text: `Tivemos um erro ao buscar seu extrato`,
        color: theme['color-danger-default']
      })
    })
    
   }, []);

  
  return (
    <View> 
      {/* <HeaderTitle title = 'Extrato '/> */}
      <Layout style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 16,}}> 
        {loading ? 
          <View style = {{marginTop: 64}}>
            <Spinner status = 'info' size='giant'/>
          </View>
        :  
        error?
        <View style = {{}}>
          <Text>Erro ao buscar extrato</Text>
        </View>
        : 
        dataExtrato.length > 0 ?  
          dataExtrato.map( (data, index) =>{ 
            console.log(`Index: ${index} - ${JSON.stringify(data.withdraw)}`)
            return( 
              <Registro key = {data.id} index = {index} tipo = {data.type} titulo = {data.credit_source} valor_cUSD = {data.value} withdraw = {data.withdraw} points = {data.points} data = {data.created}/>
              )
          })
          :
          <NoRegister subtitle = {'Você ainda não realizou transações'}/>
          } 
        
      </Layout>
    </View>
  );
};
 
const Extrato = ( props ) => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme(); 
  
  const [scrollY] = useState(new Animated.Value(0))

  let bgImage = require('../../assets/images/privacy_bg.jpg')

   

  return (
    <Fragment>
      { Platform.OS == 'ios' &&
      <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
      }
    <SafeAreaView
      style={{
      flex: 1,
      backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
      }}>
        {/* <StatusBar barStyle="light-content" /> */}
        {/* <ReactNativeParallaxHeader
          headerMinHeight={56}
          headerMaxHeight={220}
          extraScrollHeight={50}
          navbarColor= {theme['color-primary-default']}
          backgroundImage={require('../../assets/images/terms_bg.jpg')}
          renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Extrato'} subtitle = {'teddf'}/>}
          renderContent={() => <RenderContent/>}
        /> */}
        <HeaderParallax  title = {'Extrato'} bg = {bgImage} scrollY = {scrollY} content = {<RenderContent/>}/>
        {/* <ScrollView style = {{flex: 1}}onScroll = {e => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}>
          <RenderContent/>
        </ScrollView> */}
    </SafeAreaView>
    </Fragment>
  );
};

export default Extrato;

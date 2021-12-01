//Importações Externas
import {
  Button,
  Card,
  Layout,
  Modal,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, { Fragment, useContext, useState} from "react";
import { useSelector } from 'react-redux';
import { Animated, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Clipboard, ImageBackground, Share, ToastAndroid } from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

//Importações Internas
import {LocalizationContext} from '../locales';
import {ThemeContext} from '../../theme-context';
// import { TopNavigationHeader } from '../shared/topNavigation'
import { generalStyle } from '../shared/generalStyle';
import { CustomHeader } from '../shared/customHeader';
import { TopNavigationHeader } from '../shared/topNavigation'
import { recompensaIndicação } from '../shared/constants';
import HeaderParallax from '../components/headerParallax';


const onShare = async (codigo) => {
  try {
    await Share.share({
      title: 'React Native Share',
      message:
        'Entre para comunidade Ceres e ganhe recompensas por desempenhar atividades no seu celular. Faça uma grana extra ao se cadastrar com o código ' + codigo + ', você já ganha 0.05 cUSD. Acesse https://www.lovecrypto.net/#available-app',
    });
  } catch (error) {
    
  }
};

export const ShareApp = (props) => {

  //Tradução
  // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  //initializeAppLanguage(); //  

  const state = useSelector(state => state);
 
  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
 
  const [visible, setVisible] = React.useState(false);

  const CopyToClipboard = () => {
    Clipboard.setString( state.userState.recommendation_code)
    ToastAndroid.showWithGravityAndOffset(
      'Seu código de indicação foi copiado para área de transferencia',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      100,
    );
    return null;
  };
  const theme = useTheme(); 

  const RenderContent = () => {
    return (
      <>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style = {{maxHeight: 600,}} header={Header}>
          <ScrollView>
            <Layout style = {{flex: 1, paddingTop: 8,   width: '70%'}}>
              <Layout style = {styles.listItem}>
                <Layout style = {{marginRight: 16, height: 30, width: 30, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                  <Text category = 'h6' status = 'control' >1</Text>
                </Layout>
                <Text style = {{marginTop: 4}}>{'Compartilhe seu código'}</Text>
              </Layout>
              <Layout style = {styles.listItem}>
                <Layout style = {{marginRight: 16, height: 30, width: 30, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                  <Text category = 'h6' status = 'control' >2</Text>
                </Layout>
                <Text>{'Seu amigo adiciona o seu código no momento do cadastro no app'}</Text>
              </Layout>
              <Layout style = {styles.listItem}>
                <Layout style = {{marginRight: 16, height: 30, width: 30, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                  <Text category = 'h6' status = 'control' >3</Text>
                </Layout>
                <Text>{'Ele e você recebem um bonus por usa o código de indicação'}</Text>
              </Layout>
              <Layout style = {styles.listItem}>
                <Layout style = {{marginRight: 16, height: 30, width: 30, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                  <Text category = 'h6' status = 'control' >4</Text>
                </Layout>
                <Text>{'Indique quantos amigos quiser!'}</Text>
              </Layout>
            </Layout>  
            <Text style = {{marginTop: 48}}>
              {'Bonus de indicação:'}
            </Text>
            <Layout style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
              <Text category = 's1'>{'Você'}</Text>
              <Text category = 's1' status = 'success'>{`${recompensaIndicação} Pontos`}</Text>
            </Layout>
            <Layout style = {{display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
              <Text category = 's1'>{'Indicado'}</Text>
              <Text category = 's1' status = 'success'>{`${recompensaIndicação} Pontos`}</Text>
            </Layout>
            <Button status = 'success' style = {{margin: 4, marginTop: 48,}} onPress={()=> onShare()}>{'Compartilhar'}</Button>
          </ScrollView>        
        </Card>
      </Modal>
        
    
      <Layout style = { styles.card}>
        <Layout style = {{ width: '100%', backgroundColor: 'transparent', alignItems: 'center',    }}>
          <Text style = {{textAlign: 'center'}}>{`Ganhe ${recompensaIndicação} Pontos E Seu Amigo Até ${recompensaIndicação} Pontos Ao Indicar O Ceres`}</Text>
          <Button style = {{borderRadius: 32, marginTop: 32, borderStyle: 'dashed'}} status = 'success'  appearance = 'outline'  onPress={() =>  CopyToClipboard()}>{'Seu código é :'} {state.userState.recommendation_code} </Button>
          <Layout style={{marginTop: 32}}>
            <Button status = 'success' style = {{margin: 4}} onPress={()=> onShare(state.userState.recommendation_code)}>{'Compartilhar'}</Button>
            <Button status = 'primary'  appearance = 'ghost' style = {{margin: 4}} onPress = {()=> setVisible(true)}>{'Saiba Mais'}</Button>
          </Layout>
        </Layout>
      </Layout>
          
     
      </>
    )}

  const Header = (props) => (
    <Layout {...props}>
      {/* <CustomHeader navigation = {props.navigation} title = {'Compartilhe e Ganhe'} subtitle = {'teddf'}/> */}
      <ImageBackground source={require('../assets/images/share-card-header.jpg')} style={styles.cardBackgroundImg}></ImageBackground>
    </Layout>
  );
    
  const [scrollY] = useState(new Animated.Value(0))
  
 
  // console.log(changingHeight)

  let changingOpacity = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [0, 0.1, 99],
    extrapolate: 'clamp'
})

let bgImage = require('../assets/images/share_bg.jpg')

console.log(changingOpacity)
  return(
    <Fragment>
      { Platform.OS == 'ios' &&
        <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-2500']} }/>
      }
      <SafeAreaView
        style={{
        flex: 1,
        backgroundColor: currentTheme === 'light' ? '#fff' : '#222B45',
        }}> 
        <HeaderParallax  title = {'Compartilhe o APP'} bg = {bgImage} scrollY = {scrollY}/>
        <ScrollView 
          // scrollEventThrottle={16}
         
          onScroll = {e => {
            scrollY.setValue(e.nativeEvent.contentOffset.y)
          }} > 
          <RenderContent/>
  
        </ScrollView>
          {/* <ReactNativeParallaxHeader
            headerMinHeight={56}
            headerMaxHeight={220}
            extraScrollHeight={20}
            headerMinHeight={80}
            navbarColor= {theme['color-primary-default']}
            title = {'red'}
            // backgroundImage={require('../assets/images/share_bg.jpg')}
            alwaysShowNavBar={false}
            renderNavBar={() => <TopNavigationHeader navigation = {props.navigation} title = {'Compartilhe e Ganhe'} subtitle = {'teddf'}/>}
            renderContent={renderContent}
          /> */} 
      </SafeAreaView>
    </Fragment>
  )
};
   


const styles = StyleSheet.create({
    card: {
      // shadowColor: "#000", 
      // shadowOffset: {	width: 0,	height: 7,},
      // shadowOpacity: 0.41,
      // shadowRadius: 9.11,
      // elevation: 14, 
      // padding: 32, 
      marginTop: 32,
      margin: 16,
      borderRadius: 10, 
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    listItem:{
      display: 'flex', 
      flexDirection: 'row',
      marginTop: 8 
    },  
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    currency:{
      paddingTop: 6,
    },
    info:{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',    
    },
    content:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'transparent',    
      width: '100%',     
      paddingHorizontal: 48,
      marginVertical: 16,
    },
  
    backgroundImg:{
      alignItems: 'center',
      justifyContent: 'center',   
      width: '100%',
      height: 250,
    },
    cardBackgroundImg:{
      alignItems: 'center',
      justifyContent: 'center',   
      width: '100%',
      height: null,
      resizeMode: 'cover'
    },
  });
  
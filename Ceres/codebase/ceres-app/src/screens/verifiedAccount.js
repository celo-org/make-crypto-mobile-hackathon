//Importações Externas
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { Animated, SafeAreaView, Platform, StatusBar, StyleSheet, ScrollView,  View,  TouchableWithoutFeedback, TouchableOpacity, ImageBackground} from 'react-native';
import { Layout, useTheme, Text } from '@ui-kitten/components';
import { getKYC } from '../api/getKYC'; 
//Importações Internas
import { ThemeContext } from '../../theme-context'; 
import { generalStyle } from '../shared/generalStyle';
import { CustomHeader } from '../shared/customHeader';
import { InfoParagraph } from '../components/infoParagraph'; 
import { Toast }  from '../components/PopUp';
import { VerificationStatus } from '../components/verificationStatus';
import HeaderParallax from '../components/headerParallax';
import { showToast } from '../shared/showToast';
import * as NavigationService from '../navigation/NavigationService'; 
import { setDocumentsVerified } from '../store/actions/user';
export const VerifiedAccountScreen = ( props ) => {

  const theme = useTheme(); 

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  
  const dispatch = useDispatch()

  
  const user = useSelector( state => state.userState);


  const Card = ({type}) =>{

    let target = null;
    let background = null;
    let title = null;

    switch(type){
      case 'phone':
        title = 'Telefone';
        target = 'ValidatePhone';
        background = require('../assets/images/phoneBG.png')
        break;
      case 'documents':
        title = 'Documentos';
        target = 'VerifyIdentity';
        background = require('../assets/images/documentsBG.png')
        break;
      case 'email':
        title = 'Email';
        target = 'ValidateEmail';
        background = require('../assets/images/emailBG.png')
        break;
      default:
        title = 'Telefone';
        target = 'Profile';
        background = require('../assets/images/emailBG.png')
        break; 
    }
 
    return(
      <TouchableOpacity  onPress = {() => props.navigation.navigate(target)}> 
        <ImageBackground source={background}  style = {styles.card}>
          <Text category= 's1' status='control' style = {{marginTop: 42, marginLeft: 24}}>Confirme</Text>
          <Text category= 'h4' status='control' style = {{marginLeft: 24}}>{title}</Text>
        </ImageBackground> 
      </TouchableOpacity>
    )
  }
 
  const RenderContent = () => {
    return (
      <Layout style={{justifyContent: 'center', padding: 24,}}>
        <Text style = {generalStyle.paragraph}>
          Para ter acesso a todos os recursos do APP, tal como saques e conversões, é necessário realizar algumas verificações de segurança:
        </Text>
          <VerificationStatus style = {{marginTop: 8, marginBottom: 8}} navigation = {props.navigation}/>
        {!user.phoneVerified &&
          <Fragment> 
            <InfoParagraph content = {'É Necessário confirmar seu numero de telefone'} style = {{marginTop: 16}}/>  
            <Card type = {'phone'}/>
          </Fragment>
        }
        {!user.emailVerified &&
          <Fragment>
            <InfoParagraph content = {'Também necessario confirmar seu email'} style = {{marginTop: 16}}/>   
            <Card type = {'email'}/>
          </Fragment>
        }
        {!user.documentsVerified &&
          <Fragment>
            <InfoParagraph content = {'Além de confirmar sua identidade com ducumentos'} style = {{marginTop: 16}}/>   
            <Card type = {'documents'}/>
          </Fragment>
        }
      </Layout>
    );
  };

  
  const [scrollY] = useState(new Animated.Value(0))

  let bgImage = require('../assets/images/privacy_bg.jpg')

  useEffect(() => {

    getKYC().then(response =>{ 
      console.log('KYC: ' + JSON.stringify(response.data))
      if(response.data.has_submited){
        if(response.data.data.status == 'VALID'){
          dispatch(setDocumentsVerified())
        }
      }
      // setLoading(false)
      // console.log(JSON.stringify(response.data))
      // setSubmited(response.data.has_submited)
      // if(statusAnalysis.status  == 'VALID'){
      //   dispatch(setDocumentsVerified())
      // }

    })

    if(user.emailVerified && user.phoneVerified && user.documentsVerified){
      Toast.show({
        title: 'Documentos verificados',
        text: `Você acaba de concluir todos os passos de verificação!`,
        color: theme['color-info-default']
      })
      NavigationService.navigate('Home')
    }
  })

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
          <HeaderParallax  title = {'Confirmar identidade'} bg = {bgImage} scrollY = {scrollY}/>
          <ScrollView 
          // scrollEventThrottle={16}
         
          onScroll = {e => {
            scrollY.setValue(e.nativeEvent.contentOffset.y)
          }} > 
            <RenderContent/>
          </ScrollView>
          
          {/* <StatusBar barStyle="light-content" /> */}
          {/* <ReactNativeParallaxHeader
            headerMinHeight={56}
            headerMaxHeight={220}
            extraScrollHeight={20} 
            navbarColor= {theme['color-primary-default']}
            backgroundImage={require('../assets/images/verifiedAccount_bg.png')}
            renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Status de Verificação'} subtitle = {'teddf'}/>}
            renderContent={renderContent}
          /> */}
      </SafeAreaView>
    </Fragment>
  );
};
 
const styles = StyleSheet.create({
  infoParagraph:{
    // borderLeft: '1px solid black'
    borderLeftWidth: 2,
    borderColor: '#0783FF', 
    paddingLeft: 16,
    marginLeft: 8,
    marginBottom: 24,
    paddingBottom: 0,
    // borderBottomColor:'red',
    // borderBottomWidth: 3, 
  },
  document: {
    padding: 24,
    marginTop: 16, 
    width: '100%',
    height: 200,
    backgroundColor: 'grey'
  },
  backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  card: {
    width: '100%',
    height: 120, 
    // backgroundColor: '',
    marginBottom: 32,
    borderRadius: 10,
    overflow: 'hidden',
    // margin:16,

  }
});
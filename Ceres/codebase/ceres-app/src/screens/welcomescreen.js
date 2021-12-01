//Importações Externas
import { 
  Image, 
  Linking, 
  StatusBar,
  SafeAreaView,
  ImageBackground, 
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import React, { useContext } from 'react'; 
import AppIntroSlider from 'react-native-app-intro-slider';
import { Layout, Button, Text, useTheme} from '@ui-kitten/components'; 

//Importações Internas
// import {LocalizationContext} from '../locales';
import { clickInfoEvent } from '../shared/analyticsLog';
 
export const WelcomeScreen = ({navigation}) => {
 
  const login = async () => {
    navigation.navigate('Login')
  };

  const signup = async () => {
    navigation.navigate('Referal')
  };
  
  const moreAbout = () => {
    Linking.openURL('https://www.lovecrypto.net/').catch(err => console.error("Couldn't load page", err));
    clickInfoEvent('more about', 'welcome screen')
  };

  const theme = useTheme()
 


  _renderItem = ({ item }) => {
    return (
      <View style = {{alignItems: 'center'}}>
        <View style = {{backgroundColor: theme['color-primary-default'], width: '100%', height: 240, paddingHorizontal: 24, paddingVertical: 48}}>
          <TouchableWithoutFeedback onPress={() => moreAbout()}>
            <Image source={item.logo} style = {styles.logoImg}/>
          </TouchableWithoutFeedback>
        </View>
        <View style = {{padding: 24, top: -284}}>
          <Image source={item.image} style = {{width: 360, height: 360, marginBottom: 24}}/>
          <Text category='h5' style={{textAlign: 'center', fontWeight: 'bold', color: theme['color-primary-900'] }}>{item.title}</Text>
        </View>
      {/* {...item.type == 'cover' ?2
        <ImageBackground source={item.image} style={styles.backgroundImg} >
          <TouchableWithoutFeedback onPress={() => moreAbout()}>
            <Image source={item.logo} style = {styles.logoImg}/>
          </TouchableWithoutFeedback>
          <Text style={styles.firstSlide}>{item.title}</Text>
        </ImageBackground> :
        <ImageBackground source={item.image} style={styles.backgroundImg} > 
          <Text category='h6' style={{textAlign: 'center', fontWeight: 'bold', color: item.color}}>{item.title}</Text>
          <Text  category='p1' style={{textAlign: 'center', marginTop: 16}}>{item.text}</Text>  
        </ImageBackground>
      } */}
      </View>
    );
  }

  const slides = [
    {
      key: 'one',
      type : 'cover',
      title: 'Start multiplying\nyour money',
      logo: require('../assets/images/logo_white.png'),
      image: require('../assets/images/welcome/Foto1.png'), 
    },
    {
      key: 'two',
      type : 'commom',
      title: 'worry about what\nreally matters',
      image: require('../assets/images/welcome/Foto2.png'),
   
    },
    {
      key: 'three',
      type : 'commom',
      title: 'Relax and reap\nthe gains', 
      image: require('../assets/images/welcome/Foto3.png'), 
    }, 
  ];
   
  return(
    <SafeAreaView
      style={{
      flex: 1,
      backgroundColor:'white'
      }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={theme['color-primary-default']}/>
      <AppIntroSlider renderItem={_renderItem} data={slides} showSkipButton = {false} showPrevButton = {false} showNextButton = {false} showDoneButton = {false} activeDotStyle = {{backgroundColor: '#005CFF'}} dotStyle = {{backgroundColor: 'rgba(0,92,255, 0.08)'}}/>  
      <Layout style = {styles.buttonGroup}>
        <Button style = {styles.button} size='large' status='primary' appearance='filled' onPress={() => signup()}>{'Cadastro'}</Button>
        <Button style = {styles.button} size='large' status='primary' appearance='outline' onPress={() => login()} >{'Entrar'}</Button>
      </Layout>
    </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
  buttonGroup: {
    position: 'relative',
    display: 'flex', 
    bottom: 12,
    width: '100%',
    padding: 24,
    backgroundColor: 'transparent',
  },
  button:{
    margin: 6
  },
  logoImg:{
    width: 96,
    height: 24,
    marginTop: 8,
    marginLeft: 12,
  },
  backgroundImg:{
    flex: 1,
    width: null,
    height: null, 
    paddingHorizontal: 24,
    paddingTop: 48,   
  },
  slide: {
    flex: 1,
    textAlign: 'center',
    padding: 48,   
    backgroundColor: 'transparent',
      
  },
  firstSlide: {
    fontWeight: 'bold', 
    fontSize: 40, 
    marginTop: 32, 
    marginLeft: 12,
    color: '#005CFF'
  }
});
//Importações Externas
import React, { Fragment, useState } from 'react';
import { Layout, useTheme } from '@ui-kitten/components';
import { Animated, SafeAreaView, ScrollView, StyleSheet }  from 'react-native'; 

//Importações Internas 
import { ThemeContext } from '../../theme-context';   
import { AddAccountBank } from '../components/addAccountBank/'; 
import { AddAccountCrypto } from '../components/addAccountCrypto'; 
import { CustomHeader } from '../shared/customHeader';
 
 
export const AddAccountScreen = (props) => {
 
  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme; 
  const theme = useTheme(); 
  const type = props.route.params.type;
  const variant = props.route.params.variant;
  
  

  const [scrollY] = useState(new Animated.Value(0))

  let bgImage = type == 'crypto' ? require('../assets/images/crypto_bg.jpg') : require('../assets/images/fiat_bg.jpg')


 
  return(
    <Fragment>
    { Platform.OS == 'ios' &&
    <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
    }
      <SafeAreaView
      style={{
      flex: 1,
      height: '100%',
      backgroundColor: currentTheme === 'light' ? 'white' : '#222B45',
      }}> 
         <CustomHeader  title = {type == 'crypto' ? 'Saque em Crypto' : 'Saque em Reais' }/>
         <ScrollView  
            onScroll = {e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y)
            }}> 
              { type == 'crypto' ? 
                <AddAccountCrypto navigation = {props.navigation} variant = {variant}/> :
                <AddAccountBank navigation = {props.navigation} variant = {variant}/>
              }
          </ScrollView> 
      </SafeAreaView>
    </Fragment>
  )
};
 

const styles = StyleSheet.create({
    card: {
      shadowColor: "#000", 
      shadowOffset: {	width: 0,	height: 7,},
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 14, 
      padding: 32, 
      margin: 16,
      borderRadius: 10, 
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    buttonGroup: {
      position: 'absolute',
      alignItems: 'center',
      bottom: 0,
      width: '100%',
      padding: 16,
      backgroundColor: 'transparent',
    },
  });
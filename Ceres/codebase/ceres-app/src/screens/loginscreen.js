//Importações Externas
import React, { useEffect } from 'react';
import { useTheme } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView, ScrollView , StatusBar} from 'react-native';

import { useDispatch } from 'react-redux';

//Importações Internas
import { AuthForm } from '../components/AuthForm';
import { LovecryptoLogo } from '../components/lovecryptoLogo';

import { loginFailure, } from '../store/actions/auth';
 
export const LoginScreen = ( props ) => {

  const theme = useTheme();
  const dispatch = useDispatch();
   
  useEffect(() => {
    dispatch(loginFailure(null))
  })

  return(
    <SafeAreaView
    style={{ 
      flex: 1,
      backgroundColor: theme['color-primary-default'],
    }}>
    <StatusBar
      barStyle={'light-content'}
      backgroundColor={theme['color-primary-default']}/> 
    <ScrollView >
      <LovecryptoLogo/>
      <Animatable.View  animation="fadeIn"  duration = {2000} >
        <AuthForm navigation = {props.navigation}/>
      </Animatable.View>
    </ScrollView>
    </SafeAreaView>
  )
};
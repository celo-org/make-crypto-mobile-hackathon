//Importações Externas
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView, ScrollView , StatusBar} from 'react-native';

//Importações Internas
import { AuthForm } from '../components/AuthForm';
import { signUpFailure, } from '../store/actions/auth';
import { LovecryptoLogo } from '../components/lovecryptoLogo';

export const SignupScreen = ( props ) => {
 
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signUpFailure(null))
  })
 
  return(
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: theme['color-primary-default'],
      }}>
         <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme['color-primary-default']}/>
      <ScrollView >
        <LovecryptoLogo/>
        <Animatable.View  animation="fadeIn"  duration = {2000} >
          <AuthForm isSignup navigation = {props.navigation}/>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  )
};

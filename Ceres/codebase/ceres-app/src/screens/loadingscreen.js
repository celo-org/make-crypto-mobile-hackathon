//Importações Externas
import React from 'react';
import { StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import { Spinner, Layout } from '@ui-kitten/components'
import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginFailure, signUpFailure, loginSuccess, } from '../store/actions/auth';
 
export const LoadingScreen = (props) => { 
  
  // const dispatch = useDispatch();

  // if(auth().currentUser == null){
  //   dispatch(loginFailure('ERRO DESCONHECIDO'))
  // }  

  return( 
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar
        barStyle={ 'dark-content'}
        backgroundColor={ '#fff'}/>
      <Spinner size = 'giant' status='primary'/>
    </Layout>
  );
}
 

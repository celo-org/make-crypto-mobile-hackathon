//Importações Externas
import {
  Text,   
  Button,
  Layout, 
  useTheme,
} from '@ui-kitten/components'; 
import LottieView from  "lottie-react-native";
import auth from '@react-native-firebase/auth';
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect, Fragment,} from "react";

//Importações Internas 
import { InfoBox } from '../../components/infoBox';  
import { Toast } from '../../components/PopUp'
import { emailConfirmation } from '../../api/emailConfirmation';
import { requestPhoneConfirmation } from '../../api/phoneConfirmation';  

import { setEmailVerified} from '../../store/actions/user';
import { format } from 'prettier';
export const ValidateEmail = (props) => { 
  
   
  const user = useSelector(state => state.userState);
  const [requestSent, setRequestSent] = useState(false);
  const theme  = useTheme()

  const timeSpam = 60
  const [counter, setCounter] = useState(timeSpam); 
  const [startCounter, setStartCounter] = useState(true)
   
  const dispatch = useDispatch();
 
  useEffect(() => {
    setRequestSent(false)
    if(auth().currentUser != null){
      if(auth().currentUser.emailVerified){
        dispatch(setEmailVerified())
      }else{
        emailConfirmation().then(() => {
          setRequestSent(true)
          Toast.show({
            title: 'Email enviado',
            text: `Email de verificação enviado para sua caixa de entrada, cheque também a caixa de SPAM do email ${user.email}`,
            color: theme['color-info-default'] })
        }).catch(error =>{
          console.log('EMAIL ' + JSON.stringify(error))
          // setRequestSent(false)
          Toast.show({
            title: 'Tivemos um erro',
            text: error.message,
            color: theme['color-danger-default'] })
        })
      }
    }
    }, []);

  const requestNewCode = () => {
    setCounter(timeSpam) 
    setStartCounter(true) 
    emailConfirmation().then(() => { 
      setRequestSent(true)
      Toast.show({
        title: 'Email enviado',
        text: `Email de verificação enviado para sua caixa de entrada, cheque também a caixa de SPAM do email ${user.email}`,
        color: theme['color-info-default'] })
    }).catch(error =>{
      setRequestSent(false)
      Toast.show({
        title: 'Tivemos um erro',
        text: error.message,
        color: theme['color-danger-default'] })
    })


  }

  setTimeout(() =>  {
    if(startCounter && counter > 0){
      setCounter(counter - 1)
    } 
  }, 1000) 

  return ( 
    <Layout style = {styles.container}> 
      <InfoBox title = 'Email: ' subtitle = {user.email}/>
      {!user.emailVerified ? 
        <Fragment> 
          <View style = {{marginTop: 24, marginBottom: 24}}>
            <Text category = 's1' style = {{textAlign: 'center', marginTop: 16, marginBottom: 16}}>{requestSent ? 'Enviamos um código de confirmação via EMAIL' : 'Estamos enviando um email de confirmação'}</Text>   
          </View> 
          <LottieView
            source={require("../../assets/animations/emailSent.json")}
            loop
            autoPlay
            style = {{width: 150, alignSelf: 'center', top: -10}} 
            /> 
            <Button appearance = 'ghost' disabled={ counter > 0}  onPress = {requestNewCode}>
              {`Solicitar novo código ${counter > 0 ? '(' + counter + ')': ''}`}
            </Button>  
        </Fragment>:
        <Fragment> 
          <View style = {{marginTop: 24, marginBottom: 24}}>
            <Text category = 's1' style = {{textAlign: 'center', marginTop: 16, marginBottom: 16}}>{'Seu email está confirmado'}</Text>   
          </View> 
          <LottieView
            source={require("../../assets/animations/emailConfirmed.json")}
            loop
            autoPlay
            style = {{width: 200, alignSelf: 'center', top: -10}} 
            /> 
            {/* <Button appearance = 'ghost' onPress = {props.navigation.navigate('Home')}>
            Voltar
          </Button>   */}
        </Fragment>
      }
     
    </Layout> 
  );
}
 
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    flex: 1, 
  }, 
});
    
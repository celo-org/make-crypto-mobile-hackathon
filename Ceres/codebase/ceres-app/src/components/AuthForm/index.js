//Importações Externas
import React from "react";
import { StyleSheet, View } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { Layout, Text, Button } from '@ui-kitten/components'

//Importações Internas
import { Login } from './emailAuth/login';
import { SocialAuth } from './SocialAuth';
import { Signup } from "./emailAuth/signup";

//Reune todas as formas de Login/Signup
export const AuthForm = (props) => {

  const isSignup = props.isSignup; 
  
  return (
    <Layout style={styles.container}>
      <View>
        <Text  category='h3' status='primary'>
          {isSignup ? "Cadastro" : "Login"}
        </Text>
        <Text category='s1' appearance = 's1' style = {{marginBottom: 16}}>
          {isSignup ? "Entre para a comunidade Ceres" : "Acesse sua conta"}
        </Text>
      </View>
        {
        isSignup ? <Signup navigation = {props.navigation}/> : <Login navigation = {props.navigation}/>
        }
        <SocialAuth/>
       
      <View style = {{padding: 24, alignItems: 'center'}}>
        {isSignup ? 
        <Button appearance='ghost' onPress = {() =>  props.navigation.navigate('Login')} status='primary'>Já tem conta? Entre</Button>
        :
        <Button appearance='ghost' onPress = {() =>  props.navigation.navigate('Referal')} status='primary'>Não tem Conta? Crie</Button> 
        }
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingHorizontal: 32,
    paddingTop: 24,
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
  },
});
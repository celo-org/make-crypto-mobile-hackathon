import React from 'react';
import { StyleSheet, SafeAreaView, Image} from 'react-native'
import { Text, Layout, Button, useTheme} from '@ui-kitten/components'

import { RecoverPassword } from '../components/recoverpassword';
import { LovecryptoLogo } from '../components/lovecryptoLogo'
import { ScrollView } from 'react-native-gesture-handler';

export const ForgotPasswordScreen = ({ navigation}) => {
  
  const theme = useTheme();
  
  const goToLogin = async () => {
    navigation.navigate('Login')
  };
 
  return(
    <SafeAreaView
      style={{
        height: '100%', 
        backgroundColor: theme['color-primary-default']
      }}>
        <ScrollView style = {{height:'100%', backgroundColor: 'white'}}> 
          <LovecryptoLogo/>
          <Layout style = {{width: '100%', height: 120, backgroundColor: theme['color-primary-default']}}/>
          <Layout style = {{ top: -120, marginBottom: -120, backgroundColor: 'transparent'}}>
            <Text  style = {{ left:  16}} status  = 'control' category = 'h4'>Recuperar Senha</Text>
            <Layout style = { styles.card}>
              <RecoverPassword navigation = {navigation}/>
            </Layout>
          </Layout>
          
        </ScrollView>
        <Layout style = {styles.buttonGroup}>
            <Button style = {{width: '100%'}}  size='large' status='primary' appearance='outline' onPress={() => goToLogin()} >Voltar para login</Button>
          </Layout>
    </SafeAreaView>
  )
}
 
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
    bottom: 48,
    width: '100%',
    padding: 48,
    backgroundColor: 'transparent',
  },  
});
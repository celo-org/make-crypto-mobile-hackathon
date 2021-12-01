//Importações Externas
import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Text, Layout, Button, useTheme} from '@ui-kitten/components'

//Importações internas
import { HeroHeader } from '../components/heroHeader';
import { setReferalCode } from '../store/actions/auth';
import { ReferalCode } from '../components/referalCode'; 
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
 
export const ReferalScreen = ({ navigation}) => { 

  const dispatch = useDispatch() 
  const theme = useTheme();

  const signup = async () => {
    dispatch(setReferalCode(null))
    navigation.navigate('Signup')
  };
  
  return(
    <SafeAreaView  style = {{ flex: 1, backgroundColor: theme['color-primary-default'], }}>
      <ScrollView
        style={{
          height: '100%',
          backgroundColor: 'white'
        }}> 
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={theme['color-primary-default']}/>
        <HeroHeader title = 'Código de indicação' subtitle = 'Ao usar um código você já começa ganhando'/> 
        <Animatable.View  animation="fadeIn" duration = {1000} >
          <Layout style = {{padding: 24, borderRadius: 10, }}>
            <ReferalCode navigation = {navigation}/>
          </Layout>
          <Layout style = {styles.buttonGroup}>
            <Text appearance = 'hint' style = {{marginBottom: 8}}>Não tem código de indicação?</Text>
            <Button size='large' status='primary' appearance='ghost' onPress={() => signup()} >Continue sem código</Button>
          </Layout>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    bottom: 0,
    padding: 24,
    marginTop: 48,
    width: '100%',
    alignItems: 'center', 
    backgroundColor: 'transparent',
  },
});
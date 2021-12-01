//Importações Externas
import React, { useContext } from 'react';
import { Text, Layout } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, StatusBar }  from 'react-native';


//Importações Internas 
// import { LocalizationContext } from '../locales';
import {ThemeContext} from '../../theme-context';  
import { TopNavigationHeader } from '../shared/topNavigation'
import { CustomHeader } from '../shared/customHeader';

export const HelpScreen = (props) => {
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
 
    //Tradução
    // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    //initializeAppLanguage(); //

    return(
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}> 
            <CustomHeader navigation = {props.navigation}  title = { 'Fale conosco'}/>
            <Layout style = {{ flex: 1,   padding: 16, textAlign: 'center' }}>
                <Text>{'Teve algum problema?'}</Text>
                <Text>{'Envie email para hi@lovecrypto.net'}</Text>
            </Layout>
        </SafeAreaView>
    )
};
 


const styles = StyleSheet.create({
    buttonCase:{
      width: '100%',
      padding: 4,
      padding: 50,
      paddingHorizontal: 48,
    },
  });
//Importações Externas
import React, { useContext } from 'react';
import { Layout, Button } from '@ui-kitten/components';
 
//Importações Internas
// import { LocalizationContext } from '../locales';

//Serve como titulo de seção pelo app
export const HelpFooter = props => {

    //Tradução
    // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    //initializeAppLanguage(); //

    return (
        
        <Layout style = {{flex: 1, padding: 48, alignItems: 'center', width: '100%'}}>
            <Button appearance='outline' status = 'info' style = {{width: '80%'}} onPress={() =>  props.navigation.navigate('Help')}>{'Fale conosco'}</Button>
        </Layout>
      
    );
}
 

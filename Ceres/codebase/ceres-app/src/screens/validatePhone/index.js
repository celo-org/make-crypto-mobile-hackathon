//Importações Externas
import React from 'react';
import { useTheme, Layout } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet,}  from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
 
//Importações Internas 
import { ThemeContext } from '../../../theme-context';  
import { CustomHeader } from '../../shared/customHeader';
import { ValidatePhone } from './validatePhone';

const RenderContent = (props) => {
    return (
        <Layout style = { styles.card}> 
            <ValidatePhone navigation = {props.navigation}/> 
        </Layout>
    )
}

export const ValidatePhoneScreen = (props) => {
  
    const theme = useTheme();
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;

    return(
        
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
        }}> 
            <ReactNativeParallaxHeader
                headerMinHeight={56}
                headerMaxHeight={220}
                extraScrollHeight={20}
                navbarColor= {theme['color-primary-default']}
                backgroundImage={require('../../assets/images/phoneConfirm.png')}
                renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Confirmar Telefone'}/>}
                renderContent={() => <RenderContent navigation = {props.navigation} />}
                />
    
        </SafeAreaView>
    )
};
  
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 24, 
        borderRadius: 10, 
        justifyContent: 'space-around',
        alignItems: 'center',
        top: -10,
        marginBottom: -10,
    },
    input:{
        marginTop: 16,
    }
  });
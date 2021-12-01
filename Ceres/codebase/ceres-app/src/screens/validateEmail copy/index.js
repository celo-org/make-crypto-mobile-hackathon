//Importações Externas
import React, { useContext } from 'react';
import { useTheme, Layout } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet,}  from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
 
//Importações Internas 
import { ThemeContext } from '../../../theme-context';  
import { CustomHeader } from '../../shared/customHeader';
// import { ValidatePhone } from '../../components/validatePhone';
import { ValidateEmail } from './validateEmail';
const RenderContent = (props) => {
    return (
        <Layout style = { styles.card}> 
            <ValidateEmail navigation = {props.navigation}/> 
        </Layout>
    )
}

export const ValidateEmailScreen = (props) => {
  
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
    const theme = useTheme();

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
                backgroundImage={require('../../assets/images/emailConfirmation_BG.jpg')}
                renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Confirmar Email'}/>}
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
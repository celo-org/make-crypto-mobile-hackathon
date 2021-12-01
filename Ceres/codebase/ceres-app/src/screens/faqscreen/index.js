//Importações Externas
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar }  from 'react-native';

//Importações Internas
import FAQ from './faq' 
import { ThemeContext} from '../../../theme-context';
import { HelpFooter } from '../../components/helpFooter'
import { TopNavigationHeader } from '../../shared/topNavigation'
import { CustomHeader } from '../../shared/customHeader';

const FaqScreen = (props) => {
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
 
    return(
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}>
            <StatusBar barStyle="light-content" />
            <CustomHeader navigation = {props.navigation}  title = 'FAQ'/>
            <ScrollView>
                <FAQ/>
                <HelpFooter navigation = {props.navigation}/>
            </ScrollView>
        </SafeAreaView>
    )
};

export default FaqScreen;
 


const styles = StyleSheet.create({
    buttonCase:{
      width: '100%',
      padding: 4,
      padding: 50,
      paddingHorizontal: 48,
    },
  });
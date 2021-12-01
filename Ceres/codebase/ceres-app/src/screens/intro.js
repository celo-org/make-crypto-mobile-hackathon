import { SafeAreaView, ScrollView, StyleSheet, }  from 'react-native';
import { Icon, Text, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';

import { FAQ } from '../components/faq'
import { HelpFooter } from '../components/helpFooter'
import React from 'react';
import {ThemeContext} from '../../theme-context';
import { TopNavigationHeader } from '../shared/topNavigation'
import { SectionBanner } from '../components/sectionbanner';
import AppIntro from 'react-native-app-intro';

export const IntroScreen = (props) => {
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
 
    return(
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}>
            <TopNavigationHeader navigation = {props.navigation}  title = 'Ajuda'/>
           
            <Layout style = {{ flex: 1,   padding: 16, textAlign: 'center' }}>
                <Text>Teve Algum Problema?</Text>
                <Text>Envie email para hi@lovecrypto.com</Text>
            </Layout>
       
        </SafeAreaView>
    )
};
 

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
      padding: 15,
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
  });
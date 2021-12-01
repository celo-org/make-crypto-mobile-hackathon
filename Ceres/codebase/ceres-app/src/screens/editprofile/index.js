//Importações Externas
import React, { Fragment, useContext } from 'react';
import {ThemeContext} from '../../../theme-context';
import { SafeAreaView, Platform, StatusBar }  from 'react-native';
import { Layout, useTheme } from '@ui-kitten/components';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

//Importações Internas
// import { LocalizationContext } from '../locales';
import { CustomHeader } from '../../shared/customHeader';
import { generalStyle } from '../../shared/generalStyle';
import { EditProfilePhoto } from './editProfilePhoto';
import { EditProfileComponent } from './editprofilecomponent'
import { ScrollView } from 'react-native-gesture-handler';
import { CampoPerfil } from './campoPerfil';
// import { HeaderTitle } from '@react-navigation/stack';
  

import HeaderTitle from '../../components/headertitle';

export const EditProfileScreen = (props) => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme();

  //Tradução
  // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  //initializeAppLanguage(); //
 
  return(
    <Fragment>
      { Platform.OS == 'ios' &&
      <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
      }
      <SafeAreaView
        style={{
        flex: 1,
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
        }}>
          <CustomHeader navigation = {props.navigation} title = {'Editar Perfil'}/>
          <ScrollView>
            <EditProfilePhoto/>
            <HeaderTitle title = 'Meus dados'/>
            <EditProfileComponent navigation = {props.navigation}/>
          </ScrollView>
        {/* <ReactNativeParallaxHeader
          headerMinHeight={56}
          headerMaxHeight={250}
          extraScrollHeight={50}
          alwaysShowTitle={false}
          navbarColor= {theme['color-primary-500']}
          backgroundColor = {theme['color-primary-500']}
          title = { <EditProfilePhoto />}
          renderNavBar={ () =>  <CustomHeader navigation = {props.navigation} title = {'Editar Perfil'} subtitle = {'teddf'}/>}
          renderContent={() => <RenderContent navigation = {props.navigation}/>}
        /> */}
      </SafeAreaView>
    </Fragment>
  )
};
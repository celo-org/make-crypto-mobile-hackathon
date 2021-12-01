//Importações Externas
import React, { Fragment } from 'react';
import { SafeAreaView , Platform, StatusBar, ScrollView} from 'react-native';
import { useTheme, Layout,} from '@ui-kitten/components';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

//Importações Internas
import { ThemeContext } from '../../theme-context';
import { ProfileMenu } from '../components/profilemenu';
import { ProfileHeader } from '../components/profileHeader';
import { ProfileFooter } from '../components/profileFooter';
import { LovecryptoLogo } from '../components/lovecryptoLogo';
import { LovecryptoLogoHeader } from '../components/lovecryptoLogoHeader';
  
export const ProfileScreen =  props  => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme();
  
  const RenderContent = () => {
    return(
      <Layout>
        <ProfileMenu navigation = { props.navigation }/>
        <ProfileFooter/>
      </Layout>
    )
  }
 
  return(
    <SafeAreaView style = {{flex: 1, backgroundColor: theme['color-primary-600']}}>
      <StatusBar backgroundColor = {theme['color-primary-600']} barStyle="light-content" />
      { Platform.OS == 'ios' &&
      <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
      }
      {/* <SafeAreaView
        style={{
        flex: 1,
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
        }}> 
        <ReactNativeParallaxHeader
          headerMinHeight={70}
          headerMaxHeight={250}
          extraScrollHeight={50}
          alwaysShowTitle={false}
          navbarColor= {theme['color-primary-500']}
          backgroundColor = {theme['color-primary-500']}
          title = { <ProfileHeader navigation = { props.navigation }/>}
          renderNavBar={ () => <LovecryptoLogo size = 'small'/>}
          renderContent={renderContent}
        />
      </SafeAreaView> */}
      <ScrollView>
        <LovecryptoLogoHeader navigation = {props.navigation}/>
        <ProfileHeader navigation = {props.navigation} />
        <RenderContent/>
      </ScrollView>
    </SafeAreaView>
  )
};
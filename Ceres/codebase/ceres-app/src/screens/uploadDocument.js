//Importações Externas
import React, { Fragment } from 'react';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { TouchableNativeFeedback, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import { Layout, useTheme, Text } from '@ui-kitten/components';
 
//Importações Internas
import { ThemeContext } from '../../theme-context'; 
import { generalStyle } from '../shared/generalStyle';
import { CustomHeader } from '../shared/customHeader'; 
 
export const UploadDocumentScreen = ( props ) => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme(); 

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const renderContent = () => {
    return (
      <Layout style={{justifyContent: 'center', alignItems: 'center', padding: 32}}>
        {/* <Text style = {generalStyle.paragraph}>
          Para ter acesso aos recursos de saque, a Receita Federal exije uma verificação de identidade. O processo de identificação consiste em:
        </Text>
        <Text category = 's2' style = {[generalStyle.paragraph, styles.infoParagraph]}>
          Adicionar fotos do documento de identificação (RG, Passaporte ou CNH), frente e verso
        </Text> 
        <TouchableNativeFeedback>
          <Layout style = {styles.document}>

          </Layout>
        </TouchableNativeFeedback> */}
        <Text>Upload Document</Text>
       
      </Layout>
    );
  };

  return (
    <Fragment>
      { Platform.OS == 'ios' &&
      <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
      }
      <SafeAreaView
        style={{
        flex: 1,
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
        }}>
          <StatusBar barStyle="light-content" />
          <ReactNativeParallaxHeader
            headerMinHeight={56}
            headerMaxHeight={220}
            extraScrollHeight={20}
            navbarColor= {theme['color-primary-default']}
            backgroundImage={require('../assets/images/privacy_bg.jpg')}
            renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Subir documento'} subtitle = {'teddf'}/>}
            renderContent={renderContent}
          />
      </SafeAreaView>
    </Fragment>
  );
};


const styles = StyleSheet.create({
  infoParagraph:{
    // borderLeft: '1px solid black'
    borderLeftWidth: 2,
    borderColor: '#0783FF', 
    paddingLeft: 16,
    marginTop: 32,
    marginLeft: 8,
    marginBottom: 24,
    paddingBottom: 0,
    // borderBottomColor:'red',
    // borderBottomWidth: 3, 
  },
  document: {
    padding: 24,
    marginTop: 16,
    marginBottom: 24, 
    width: '100%',
    height: 200,
    backgroundColor: 'grey'
  },
  backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
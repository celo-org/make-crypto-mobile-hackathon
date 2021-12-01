//Importações Exernas
import React from 'react';
// import {useTranslation} from 'react-i18next';
import { SafeAreaView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Layout, ListItem, Text, Toggle, Divider, Avatar } from '@ui-kitten/components';

//Importações Internas
import { showToast } from '../shared/showToast';
import { ThemeContext } from '../../theme-context'; 
import { CustomHeader } from '../shared/customHeader';
import { toggleAppNotifications, toggleEmailNotifications, toggleDarkMode } from '../store/actions/config';
  
Icon.loadFont()

export const SettingsScreen = (props) => {
  
  const [LaguageVisible, setLanguageVisible] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState('No items selected');
  
  const onUsersPress = ({ index }) => {
    setSelectedTitle('Users');
    setLanguageVisible(false);
  };

  const onOrdersPress = ({ index }) => {
    setSelectedTitle('Orders');
    setLanguageVisible(false);
  };

  const onTransactionsPress = ({ index }) => {
    setSelectedTitle('Transactions');
    setLanguageVisible(false);
  };

  const onSettingsPress = ({ index }) => {
    setSelectedTitle('Settings');
    setLanguageVisible(false);
  };

  const renderToggleButton = () => (
    <ListItem title={translations['settings.language']} accessoryRight = {() => <Text >{state.configState.language}</Text>} onPress = { () =>  setLanguageVisible(true)}/>
     
  );

  const handleSelectLang = (lang) => {
   
    // setAppLanguage(lang);
    // dispatch(setLanguage(languageNames[lang]))
    // setLanguageVisible(false)
  }
   
  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
   
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const renderItemAccessoryEmail = (props) => (
    <Toggle
      checked={state.configState.email}
      onChange={emailToggle}
    />
  );

  const renderItemAccessoryApp = (props) => (
    <Toggle
      checked={state.configState.notifications}
      onChange={appToggle}
    />
  );

  const renderItemAccessoryDarkMode = (props) => (
    <Toggle
      checked={state.configState.darkMode}
      onChange={darkToggle}
      disabled={true} 
    />
  );

  function darkToggle(props){
    dispatch(toggleDarkMode(!state.configState.darkMode))
    // themeContext.toggleTheme()
  }

  function appToggle(){
    dispatch(toggleAppNotifications(!state.configState.notifications))
  }

  function emailToggle(){
    dispatch(toggleEmailNotifications(!state.configState.email))
  }

  const Subtitle = (props) => (
    <Layout style = {{padding: 16, paddingBottom: 4, flexDirection: 'row'}}>
      <Icon fill='#222B45' size = {13} style = {{ marginRight: 6, marginTop: 2}} name={props.icon}/>
      <Text category = 'c1'>{props.title}</Text>
    </Layout>
  );

  const flagIMG = (src ) => (
    // <Icon {...props} src={src}/>
    <Avatar size='tiny' shape='round' source={src}/>
  );
 
  return(
    <SafeAreaView
      style={{
      flex: 1,
      backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
      }}>
      <StatusBar barStyle="light-content" />
      <CustomHeader navigation = {props.navigation}  title = {'Configurações'}  />
      <ScrollView>
        <Layout style = {{ flex: 1,}}>
          <Subtitle title = {'Alertas'} icon = 'bell-outline'/>
          <ListItem title={'No APP'} accessoryRight = {renderItemAccessoryApp}/> 
          <ListItem title={'Email'} accessoryRight = {renderItemAccessoryEmail}/> 
          <Divider/>
          <Subtitle title = {'Opções de Localização'} icon = 'web'/>
          <ListItem title={'Moeda'} accessoryRight = {() => <Text appearance='hint'>{state.configState.currency}</Text>} onPress = { () => showToast('Opção indisponível')}/>
          {/* <SelectLanguage/> */}
         

          
          <Divider/>
          <Subtitle title = {'Visual'} icon = 'white-balance-sunny'/>
          <ListItem title={'Modo escuro'} accessoryRight = {renderItemAccessoryDarkMode} onPress = { () => showToast('Opção indisponível')}/>  
          <Divider/>
          { state.authState.provider == 'EMAIL' &&
          <Subtitle title = {'Segurança'} icon = 'lock-outline'/> 
          }
          { state.authState.provider == 'EMAIL' &&
          <ListItem title={'Alterar senha'} onPress = {() => props.navigation.navigate('ChangePassword')}/>
          }
        </Layout>      
      </ScrollView>
    </SafeAreaView>
  )
};
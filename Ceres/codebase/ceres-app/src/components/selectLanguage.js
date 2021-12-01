//Importações Externas
import React, { useContext } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, StatusBar, FlatListm, View } from 'react-native';
import { Layout, ListItem, Text, Toggle, Divider, Icon, MenuItem, OverflowMenu, Avatar } from '@ui-kitten/components';

//Importações Internas 
// import { LocalizationContext } from '../locales';
// import { toggleAppNotifications, toggleEmailNotifications, toggleDarkMode, setLanguage } from '../store/actions/config';
// import { flags, languageNames } from '../shared/flags';
const SelectLanguage = (props) => {
  
  const flagIMG = (src ) => (
    // <Icon {...props} src={src}/>
    <Avatar size='tiny' shape='round' source={src}/>
  ); 
  const [LaguageVisible, setLanguageVisible] = React.useState(false);
  const renderToggleButton = () => (
    <ListItem title={'Lingua'}  accessoryRight = {() => <Text >{state.configState.language}</Text>} onPress = { () =>  setLanguageVisible(true)}/>
     
  );
  //Tradução
  // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  //initializeAppLanguage(); //

  // const {
  //   translations,
  //   appLanguage,
  //   setAppLanguage,
  //   initializeAppLanguage,
  // } = useContext(LocalizationContext); // 1
  //initializeAppLanguage(); // 2
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  
  const handleSelectLang = (lang) => {
   
    // setAppLanguage(lang);
    dispatch(setLanguage(languageNames[lang]))
    setLanguageVisible(false)
  }

  return (
    <View>
       {/* <OverflowMenu
          visible={LaguageVisible}
          anchor={renderToggleButton}
          placement = 'bottom end'
          onBackdropPress={() => setLanguageVisible(false)}> 
          {translations.getAvailableLanguages().map((currentLang, i) => (  
            <MenuItem
              key={i}
              title = {languageNames[currentLang]} //{currentLang}
              accessoryLeft={() => flagIMG(flags[currentLang])}
              bottomDivider
              checkmark={appLanguage === currentLang}
              onPress={() => {
                // setAppLanguage(currentLang);
                handleSelectLang(currentLang)
              }}
            />
           ))}
        </OverflowMenu> */}
    </View>
  );
}

export default SelectLanguage;
 
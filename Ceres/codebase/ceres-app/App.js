//Importações Externas
import {LogBox} from 'react-native';
import * as eva from '@eva-design/eva';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import {ThemeContext} from './theme-context';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light, dark} from '@eva-design/eva';
import messaging from '@react-native-firebase/messaging';
import {default as customTheme} from './custom-theme.json';
import {PersistGate} from 'redux-persist/integration/react';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {AppNavigator} from './src/navigation/navigation.component';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
// import { Root, Popup, Toast } from 'popup-ui'
//Importações Internas
// import {CheckVersion} from './src/components/checkVersion';
import {store, persistor} from './src/store';
// import { LocalizationProvider } from './src/locales';
import {Provider as PaperProvider} from 'react-native-paper';
import {Root} from './src/components/PopUp/';
import paperTheme from './src/shared/paper-theme';
const themes = {light, dark};

console.disableYellowBox = true;

const StarterApp = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [theme, setTheme] = React.useState('light');

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    LogBox.ignoreLogs(['Warning: ...']);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <AnimatedSplash
      isLoaded={isLoaded}
      logoImage={require("./src/assets/images/icon.png")}
      backgroundColor={"#fff"}
      logoHeight={96}
      logoWidth={96}
    > 
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {/* <LocalizationProvider> */}
              <PaperProvider theme={paperTheme}>
                <ApplicationProvider
                  {...eva}
                  mapping={mapping}
                  theme={{...eva[theme], ...customTheme}}>
                  {/* <CheckVersion /> */}
                  <Root>
                    <AppNavigator />
                  </Root>
                </ApplicationProvider>
              </PaperProvider>
              {/* </LocalizationProvider> */}
            </PersistGate>
          </Provider>
        </ThemeContext.Provider>
      </React.Fragment>
    </AnimatedSplash>
  );
};

AppRegistry.registerComponent('StarterApp', () => StarterApp);

export default StarterApp;

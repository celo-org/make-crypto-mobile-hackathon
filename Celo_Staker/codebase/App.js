import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
} from "native-base";
import './global'
import NativeBaseIcon from "./components/NativeBaseIcon";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import {theme} from "./constants/Theme"
import Rootnavigation from './navigation/Rootnavigation'
import 'react-native-gesture-handler';
import { AuthenticatedUserProvider } from './navigation/AuthenticatedUserProvider';


const hey = 12
// extend the theme
//export const theme = theme;


export default function App() {
  console.log(hey)
  

  let [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-LightItalic':require('./assets/fonts/Roboto-LightItalic.ttf'),
    'Roboto-Italic':require('./assets/fonts/Roboto-Italic.ttf'),
    'Roboto-MediumItalic':require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Bold':require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic':require('./assets/fonts/Roboto-BoldItalic.ttf'),
   

  });

  
  
  return (
<AuthenticatedUserProvider>
    <NativeBaseProvider theme= {theme}>
    <Rootnavigation></Rootnavigation>
    </NativeBaseProvider>
  </AuthenticatedUserProvider>
  );
  
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

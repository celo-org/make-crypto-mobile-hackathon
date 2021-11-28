import "node-libs-react-native/globals";
import React from "react";
import "./global";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";
import { DMSans_700Bold, DMSans_400Regular } from "@expo-google-fonts/dm-sans";

import globalStore from "./src/redux/GlobalStore";
import Screens from "./src/screens";
import { Magic } from "@magic-sdk/react-native";
import { LogBox } from "react-native";
import ContractMethods from "./src/utils/celo-integration/ContractMethods";
LogBox.ignoreLogs([
  "Warning: The provided value 'moz",
  "Warning: The provided value 'ms-stream",
]);

const store = createStore(globalStore);
const magic = new Magic("pk_live_5B2A9951805695BB", {
  network: {
    rpcUrl: "https://alfajores-forno.celo-testnet.org",
  },
});

const loadAppSession = async () => {
  try {
    let user = await AsyncStorage.getItem("user");
    let data = JSON.parse(user);
    let action = { type: "INIT", value: { ...data, magic: magic } };
    //console.log(data)
    store.dispatch(action);
    return true;
  } catch (err) {
    console.log(err);
    return true;
  }
};

const App = () => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    DMSans_700Bold,
    DMSans_400Regular,
  });

  let [isReady, setReady] = React.useState(false);
  if (!isReady || !fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadAppSession}
        onFinish={() => setReady(true)}
        onError={console.warn}
        autoHideSplash={true}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
      </Provider>
    );
  }
};

export default App;

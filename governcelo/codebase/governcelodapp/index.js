import 'node-libs-react-native/globals';
import { registerRootComponent, scheme } from 'expo';
const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");
const { withWalletConnect } = require("@walletconnect/react-native-dapp");

import App from './App';
import { Platform } from "react-native";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(
	withWalletConnect(App, {
		clientMeta: {
			name: "Governcelo",
			description: "Governance on Celo"
		},
		redirectUrl: Platform.OS === "web" ? window.location.origin : 'https://',
		storageOptions: { asyncStorage: AsyncStorage }
	}));

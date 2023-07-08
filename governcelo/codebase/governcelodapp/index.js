import "./global";
import App from "./App";
import { registerRootComponent, scheme } from "expo";
const {
    default: AsyncStorage,
} = require("@react-native-async-storage/async-storage");

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

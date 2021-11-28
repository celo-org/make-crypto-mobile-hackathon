import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/Home";
import CustomDrawer from "./CustomDrawer";
import HelpScreen from "../screens/Help/HelpScreen";
import CardInfo from "../screens/Governance/CardInfo";
import SettingsScreen from "../screens/Settings/SettingsScreen";

import PinDoNotMatch from "../screens/Settings/PinDoNotMatch";
import AccountAddress from "../screens/Settings/AccountAddress";
import RecoveryPhrase from "../screens/Settings/RecoveryPhrase";
import PinSuccessScreen from "../screens/Settings/PinSuccessScreen";
import ResetAccountScreen from "../screens/Settings/ResetAccountScreen";
import SelectCurrencyScreen from "../screens/Settings/SelectCurrencyScreen";

import AddFunds from "../screens/PerformRequest/AddFunds";
import ConfirmFunds from "../screens/PerformRequest/ConfirmFunds";
import ConfirmRequest from "../screens/PerformRequest/ConfirmRequest";
import SelectOperation from "../screens/PerformRequest/SelectOperation";
import SelectPaymentMethod from "../screens/PerformRequest/SelectPaymentMethod";

import AcceptRequest from "../screens/FulfillRequest/AcceptRequest";
import ConfirmPayment from "../screens/FulfillRequest/ConfirmPayment";

import ContactScreen from "../screens/Help/ContactScreen";
import ContactSupportScreen from "../screens/Help/ContactSupportScreen";

import Join from "../screens/Governance/Join";

import Rate from "./Rate";
import Success from "./Success";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="RecoveryPhrase" component={RecoveryPhrase} />
      <Stack.Screen name="PinDoNotMatch" component={PinDoNotMatch} />
      <Stack.Screen name="Account Address" component={AccountAddress} />
      <Stack.Screen name="ResetAccount" component={ResetAccountScreen} />
      <Stack.Screen name="Select Operation" component={SelectOperation} />
      <Stack.Screen
        name="Select Payment Method"
        component={SelectPaymentMethod}
      />
      <Stack.Screen name="Add Funds" component={AddFunds} />
      <Stack.Screen name="Confirm Funds" component={ConfirmFunds} />
      <Stack.Screen name="Confirm Request" component={ConfirmRequest} />
      <Stack.Screen name="Accept Request" component={AcceptRequest} />
      <Stack.Screen name="Confirm Payment" component={ConfirmPayment} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Rate" component={Rate} />
      <Stack.Screen name="Join" component={Join} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="SelectCurrency" component={SelectCurrencyScreen} />
      <Stack.Screen name="Support" component={ContactSupportScreen} />
      <Stack.Screen name="PinSuccess" component={PinSuccessScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        options={{ swipeEnabled: false }}
        name="Stack"
        component={StackNav}
      />
      <Drawer.Screen name="Governance" component={CardInfo} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="HelpScreen" component={HelpScreen} />
    </Drawer.Navigator>
  );
}

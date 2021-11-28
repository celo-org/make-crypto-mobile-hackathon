import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Rewards from "./Rewards";
import Home from "./Home";
import Profile from "./Profile";
import Icon from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

const screenOptions = (route: any, color: any) => {
  let iconName: string;

  switch (route.name) {
    case "Home":
      iconName = "home";
      break;
    case "Rewards":
      iconName = "appstore-o";
      break;
    case "Profile":
      iconName = "folder1";
      break;
    default:
      break;
  }

  return <Icon name={iconName!} color={color} size={24} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        tabBarStyle: { paddingBottom: 10, height: 60 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Rewards" component={Rewards} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

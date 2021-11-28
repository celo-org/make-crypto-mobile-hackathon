import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View, Text } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

import Home from '@nft/screens/Home';
import Favorites from '@nft/screens/Favorites';
import Create from '@nft/screens/CreateNFT';
import Wallet from '@nft/screens/Wallet';
import Profile from '@nft/screens/Profile';
import { colors, dimensions, fontsFamily, fontsSize } from '@nft/styles';

import HomeSvg from '../../assets/home.svg';
import HomeFocusedSvg from '../../assets/home-focused.svg';
import HeartSvg from '../../assets/heart-menu.svg';
import HeartFocusedSvg from '../../assets/heart-focused.svg';
import PlusSvg from '../../assets/plus-menu.svg';
import PlusFocusedSvg from '../../assets/plus-focused.svg';
import ProfileSvg from '../../assets/profile.svg';
import ProfileFocusedSvg from '../../assets/profile-focused.svg';
import WalletSvg from '../../assets/wallet.svg';
import WalletFocusedSvg from '../../assets/wallet-focused.svg';
import { AlignTypes, RoutesNames } from '@nft/utils/enum';
import StackTabs from './stackTabs.routes';

const bottomTabsRoutes = (): JSX.Element => {
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          flex: 1,
          alignItems: AlignTypes.CENTER,
          height: dimensions.height60,
          position: 'absolute',
          bottom:
            Platform.OS === 'ios' ? dimensions.spacingInlineXl30 : dimensions.spacingStackXxl16,
          left: dimensions.spacingStackXxl16,
          right: dimensions.spacingStackXxl16,
          borderRadius: dimensions.spacingInlineXl30,
          paddingBottom: Platform.OS === 'ios' ? dimensions.spacingStackQuarck4 : 0,
          ...styles.shadow,
        },

        tabBarActiveTintColor: colors.light.neutralColor2,
      }}>
      <Screen
        component={StackTabs}
        name={'Home'}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuContainer}>
              {focused ? <HomeFocusedSvg /> : <HomeSvg />}

              <Text style={focused ? styles.menuLabelFocused : styles.menuLabel}>Home</Text>
            </View>
          ),
        }}
      />
      <Screen
        component={Favorites}
        name={'Favorites'}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuContainer}>
              {focused ? <HeartFocusedSvg /> : <HeartSvg />}

              <Text style={focused ? styles.menuLabelFocused : styles.menuLabel}>Favorites</Text>
            </View>
          ),
        }}
      />
      <Screen
        component={Create}
        name={RoutesNames.CREATE}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuContainer}>
              {focused ? <PlusFocusedSvg /> : <PlusSvg />}

              <Text style={focused ? styles.menuLabelFocused : styles.menuLabel}>Create</Text>
            </View>
          ),
        }}
      />
      <Screen
        component={Wallet}
        name={'Wallet'}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuContainer}>
              {focused ? <WalletFocusedSvg /> : <WalletSvg />}

              <Text style={focused ? styles.menuLabelFocused : styles.menuLabel}>Wallet</Text>
            </View>
          ),
        }}
      />
      <Screen
        component={Profile}
        name={'Profile'}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuContainer}>
              {focused ? <ProfileFocusedSvg /> : <ProfileSvg />}

              <Text style={focused ? styles.menuLabelFocused : styles.menuLabel}>Profile</Text>
            </View>
          ),
        }}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.light.neutralColor4,
    shadowOffset: {
      width: 0,
      height: dimensions.spacingStackLg10,
    },
    shadowOpacity: 0.25,
    shadowRadius: dimensions.spacingInlineQuarck5,
    elevation: dimensions.spacingInlineQuarck5,
  },
  menuContainer: {
    alignItems: AlignTypes.CENTER,
    justifyContent: AlignTypes.CENTER,
    top: dimensions.spacingInlineThin2,
  },
  menuLabel: {
    fontSize: fontsSize.xs12,
    fontFamily: fontsFamily.montserrat.medium500,
    color: colors.light.neutralColor8,
    paddingTop: dimensions.spacingStackQuarck4,
  },
  menuLabelFocused: {
    fontSize: fontsSize.xs12,
    fontFamily: fontsFamily.montserrat.semiBold600,
    color: colors.light.neutralColor3,
    paddingTop: dimensions.spacingStackQuarck4,
  },
});

export default bottomTabsRoutes;

// register all screens of the app (including internal ones)
import {Navigation} from 'react-native-navigation';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../state';
import {Provider as PaperProvider} from 'react-native-paper';
import '../api/axios';
import {LoginScreen, LoginScreenId} from './login';
import {DiscoveryScreen, DiscoveryScreenId} from './discovery';
import {HomeScreen, HomeScreenId} from './home';
import {RegisterScreen, RegisterScreenId} from './register';
import {MarketScreen, MarketScreenId} from './market';
import { OnBoardingScreen, OnBoardingScreenId } from "./onBoarding";
import { MyProfileScreen, MyProfileScreenId } from "./myProfile";
import { CreateStep1Screen, CreateStep1ScreenId } from "./create/step1";
import { CreateStep2Screen, CreateStep2ScreenId } from "./create/step2";
import { CreateStep3Screen, CreateStep3ScreenId } from "./create/step3";
import { WalletTutorialScreen, WalletTutorialScreenId } from "./walletTutorial";
import { SettingsScreen, SettingsScreenId } from "./settings";
import { StatusBar } from "react-native";
import { SearchScreen, SearchScreenId } from "./search";
import { CreateStep4Screen, CreateStep4ScreenId } from "./create/step4";
import { NftDetailScreen, NftDetailScreenId } from "./nftDetail";

export function registerScreens() {
  // Navigation.registerComponent(DrawerScreenId, () => createApp(DrawerScreen));

  // Onboarding
  Navigation.registerComponent(OnBoardingScreenId, () => createApp(OnBoardingScreen));
  Navigation.registerComponent(MyProfileScreenId, () => createApp(MyProfileScreen));
  Navigation.registerComponent(LoginScreenId, () => createApp(LoginScreen));
  Navigation.registerComponent(RegisterScreenId, () =>
    createApp(RegisterScreen),
  );
  Navigation.registerComponent(DiscoveryScreenId, () =>
    createApp(DiscoveryScreen),
  );
  Navigation.registerComponent(HomeScreenId, () => createApp(HomeScreen));
  Navigation.registerComponent(MarketScreenId, () => createApp(MarketScreen));
  Navigation.registerComponent(CreateStep1ScreenId, () => createApp(CreateStep1Screen));
  Navigation.registerComponent(CreateStep2ScreenId, () => createApp(CreateStep2Screen));
  Navigation.registerComponent(CreateStep3ScreenId, () => createApp(CreateStep3Screen));
  Navigation.registerComponent(CreateStep4ScreenId, () => createApp(CreateStep4Screen));
  Navigation.registerComponent(WalletTutorialScreenId, () => createApp(WalletTutorialScreen));
  Navigation.registerComponent(SettingsScreenId, () => createApp(SettingsScreen));
  Navigation.registerComponent(SearchScreenId, () => createApp(SearchScreen));
  Navigation.registerComponent(NftDetailScreenId, () => createApp(NftDetailScreen));
}

export const createApp = (Component, ...props) => {
  return class App extends React.Component {
    constructor(props) {
      super(props);
      Navigation.events().bindComponent(this);
      // store.dispatch(setStoreUpdateOverlayVisibility(false));
    }

    componentDidMount() {
      this.bottomTabEventListener =
        Navigation.events().registerBottomTabSelectedListener(
          async ({selectedTabIndex, unselectedTabIndex}) => {
            if (selectedTabIndex === unselectedTabIndex) {
              try {
                await Navigation.popToRoot(this.props.componentId);
              } catch (e) {}
            }
          },
        );
    }

    componentWillUnmount() {
      this.bottomTabEventListener.remove();
    }

    render() {
      return (
        <Provider store={store}>
          <PaperProvider>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
            <Component
              {...{
                ...this.props,
                ...props,
              }}
            />
          </PaperProvider>
        </Provider>
      );
    }
  };
};

//////////
// OVERLAY
//////////
// export const showPickerOverlay = async (props) => {
//   Navigation.showOverlay({
//     component: {
//       id: 'BoxPicker',
//       name: PickerBoxScreenId,
//       options: {
//         overlay: {
//           interceptTouchOutside: false,
//         },
//       },
//       passProps: {
//         ...props
//       }
//     },
//   });
// }
// export const hideConfirmApiOverlay = async () => {
//   Navigation.dismissOverlay(PickerBoxScreenId);
// }

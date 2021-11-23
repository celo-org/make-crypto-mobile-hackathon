import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';
import {setCustomText} from 'react-native-global-props';
import {PRIMARY_COLOR} from './src/constants';
import t from './src/i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DiscoveryScreenDef, DiscoveryScreenId} from './src/screens/discovery';
import {MarketScreenId} from './src/screens/market';
import {OnBoardingScreenId} from './src/screens/onBoarding';
import {SettingsScreenId} from './src/screens/settings';
import {SearchScreenId} from './src/screens/search';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    layout: {orientation: ['portrait']},
    animations: {
      push: {
        waitForRender: true,
        content: {
          alpha: {
            from: 0,
            to: 1,
            duration: 200,
            startDelay: 0,
            interpolation: 'accelerate',
          },
        },
      },
      pop: {
        waitForRender: true,
        content: {
          alpha: {
            from: 1,
            to: 0,
            duration: 200,
            startDelay: 0,
            interpolation: 'accelerate',
          },
        },
      },
    },
  });
  goToDiscoveryScreens();
});

export const goToDiscoveryScreens = async () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'stack',
        children: [DiscoveryScreenDef()],
        options: {
          topBar: {
            visible: false,
            height: 0,
          },
        },
      },
    },
  });
};

export const startTabBasedAppRoot = async () => {
  const stacks = await setStacks();

  Navigation.setRoot({
    root: {
      bottomTabs: {
        // currentTabIndex: promotionId ? 1 : 0,
        id: 'tabs',
        animate: false,
        overrideBackPress: true,
        options: {
          bottomTabs: {
            titleDisplayMode: 'alwaysShow',
            backgroundColor: 'black',
          },
        },
        children: stacks,
      },
    },
  });
};
const iconColor = 'grey';
const iconSelectedColor = PRIMARY_COLOR;

const setStacks = async () => {
  const marketAsync = Fontisto.getImageSource('shopping-store', 30, iconColor);
  const marketSelectedAsync = Fontisto.getImageSource(
    'shopping-store',
    30,
    iconSelectedColor,
  );
  const profileAsync = MaterialCommunityIcons.getImageSource(
    'account-settings',
    30,
    iconColor,
  );
  const profileSelectedAsync = MaterialCommunityIcons.getImageSource(
    'account-settings',
    30,
    iconSelectedColor,
  );
  const searchIconAsync = FontAwesome.getImageSource('search', 30, iconColor);
  const searchIconSelectedAsync = FontAwesome.getImageSource(
    'search',
    30,
    iconSelectedColor,
  );
  const settingsIconAsync = MaterialIcons.getImageSource(
    'settings',
    30,
    iconColor,
  );
  const settingsIconSelectedAsync = MaterialIcons.getImageSource(
    'settings',
    30,
    iconSelectedColor,
  );
  const icons = await Promise.all([
    marketAsync,
    marketSelectedAsync,
    profileAsync,
    profileSelectedAsync,
    searchIconAsync,
    searchIconSelectedAsync,
    settingsIconAsync,
    settingsIconSelectedAsync,
  ]);

  return [
    {
      stack: baseStack(icons[0], icons[1], 'marketStack', MarketScreenId),
    },
    {
      stack: baseStack(icons[2], icons[3], 'userStack', OnBoardingScreenId),
    },
    {
      stack: baseStack(icons[4], icons[5], 'settingsStack', SearchScreenId),
    },
    {
      stack: baseStack(icons[6], icons[7], 'settingsStack', SettingsScreenId),
    },
  ];
};

const baseStack = (icon, iconSelected, StackId, screenId) => {
  return {
    id: StackId,
    children: [
      {
        component: {
          name: screenId,
        },
      },
    ],
    options: {
      statusBar: {
        drawBehind: true,
        backgroundColor: 'transparent',
        translucent: true,
        setHidden: false,
        visible: false,
      },
      topBar: {
        visible: false,
        height: 0,
      },
      bottomTab: {
        fontSize: 10,
        // text: t('home'),
        icon: icon,
        selectedIcon: iconSelected,
        // icon: require('../../assets/tabIcon/tab1.png'),
        // selectedIcon: require('../../assets/tabIcon/tab1sel.png'),
      },
    },
  };
};

const customTextProps = {
  style: {
    // fontFamily: JTENERGY,
    color: PRIMARY_COLOR,
  },
};

setCustomText(customTextProps);

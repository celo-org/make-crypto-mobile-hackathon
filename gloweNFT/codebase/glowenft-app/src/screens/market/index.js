import { Layout } from "react-native-navigation";

import MarketScreen from './screen'

const MarketScreenId = 'MarketScreen';

const MarketScreenDef = (passProps): Layout => ({
  component: {
    passProps,
    name: MarketScreenId,
    options: {
      statusBar: {
        drawBehind: true,
        backgroundColor: 'transparent',
        translucent: true,
        setHidden: false,
        visible: false,
      }
    }
  },
});

export { MarketScreenDef, MarketScreenId, MarketScreen };

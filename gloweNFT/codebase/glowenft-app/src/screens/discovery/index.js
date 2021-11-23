import DiscoveryScreen from './screen'

const DiscoveryScreenId = 'DiscoveryScreen';

const DiscoveryScreenDef = (passProps) => ({
  component: {
    passProps,
    name: DiscoveryScreenId,
    options: {
      statusBar: {
        drawBehind: true,
        backgroundColor: 'transparent',
        translucent: false,
        setHidden: false,
      }
    }
  },
});

export {
  DiscoveryScreenDef,
  DiscoveryScreenId,
  DiscoveryScreen,
};

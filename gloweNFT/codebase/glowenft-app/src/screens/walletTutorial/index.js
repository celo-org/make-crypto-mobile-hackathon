import WalletTutorialScreen from './screen'

const WalletTutorialScreenId = 'WalletTutorialScreen';

const WalletTutorialScreenDef = (passProps) => ({
  component: {
    passProps,
    name: WalletTutorialScreenId,
    options: {
      statusBar: {
        drawBehind: true,
        backgroundColor: 'transparent',
        translucent: true,
        setHidden: false,
      }
    }
  },
});

export {
  WalletTutorialScreenDef,
  WalletTutorialScreenId,
  WalletTutorialScreen,
};

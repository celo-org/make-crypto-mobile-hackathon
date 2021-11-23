import HomeScreen from './screen'

const HomeScreenId = 'HomeScreen';

const HomeScreenDef = (passProps) => ({
  component: {
    passProps,
    name: HomeScreenId,
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
  HomeScreenDef,
  HomeScreenId,
  HomeScreen,
};

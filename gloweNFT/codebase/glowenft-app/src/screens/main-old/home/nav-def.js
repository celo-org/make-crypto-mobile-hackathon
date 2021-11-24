// @flow

const HomeScreenId = 'HomeScreen';

const HomeScreenDef = passProps => ({
  component: {
    name: HomeScreenId,
    options: {
      topBar: {
        visible: false
      }
    },
    passProps
  }
});

export { HomeScreenId, HomeScreenDef };

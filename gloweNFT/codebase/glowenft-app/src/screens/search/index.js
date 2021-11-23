import SearchScreen from './screen'

const SearchScreenId = 'SearchScreen';

const SearchScreenDef = (passProps) => ({
  component: {
    passProps,
    name: SearchScreenId,
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
  SearchScreenDef,
  SearchScreenId,
  SearchScreen,
};

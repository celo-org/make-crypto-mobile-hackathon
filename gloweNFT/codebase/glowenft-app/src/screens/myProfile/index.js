import MyProfileScreen from './screen'

const MyProfileScreenId = 'MyProfileScreen';

const MyProfileScreenDef = (passProps) => ({
  component: {
    passProps,
    name: MyProfileScreenId,
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

export { MyProfileScreenDef, MyProfileScreenId, MyProfileScreen };

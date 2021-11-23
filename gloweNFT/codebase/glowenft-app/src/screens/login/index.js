import LoginScreen from './screen'

const LoginScreenId = 'LoginScreen';

const LoginScreenDef = (passProps) => ({
  component: {
    passProps,
    name: LoginScreenId,
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

export { LoginScreenDef, LoginScreenId, LoginScreen };

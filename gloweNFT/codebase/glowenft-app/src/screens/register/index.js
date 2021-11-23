import RegisterScreen from './screen'

const RegisterScreenId = 'RegisterScreen';

const RegisterScreenDef = (passProps) => ({
  component: {
    passProps,
    name: RegisterScreenId,
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

export { RegisterScreenDef, RegisterScreenId, RegisterScreen };

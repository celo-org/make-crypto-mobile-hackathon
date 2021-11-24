import CreateStep1Screen from './screen'

const CreateStep1ScreenId = 'CreateStep1Screen';

const CreateStep1ScreenDef = (passProps) => ({
  component: {
    passProps,
    name: CreateStep1ScreenId,
    options: {
      statusBar: {
        drawBehind: true,
        backgroundColor: 'transparent',
        translucent: false,
        setHidden: false,
      },
    }
  },
});

export { CreateStep1ScreenDef, CreateStep1ScreenId, CreateStep1Screen };

import CreateStep2Screen from './screen'

const CreateStep2ScreenId = 'CreateStep2Screen';

const CreateStep2ScreenDef = (passProps) => ({
  component: {
    passProps,
    name: CreateStep2ScreenId,
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

export { CreateStep2ScreenDef, CreateStep2ScreenId, CreateStep2Screen };

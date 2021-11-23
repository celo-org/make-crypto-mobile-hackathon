import CreateStep4Screen from './screen'

const CreateStep4ScreenId = 'CreateStep4Screen';

const CreateStep4ScreenDef = (passProps) => ({
  component: {
    passProps,
    name: CreateStep4ScreenId,
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

export { CreateStep4ScreenDef, CreateStep4ScreenId, CreateStep4Screen };

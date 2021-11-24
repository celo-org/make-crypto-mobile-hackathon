import CreateStep3Screen from './screen'

const CreateStep3ScreenId = 'CreateStep3Screen';

const CreateStep3ScreenDef = (passProps) => ({
  component: {
    passProps,
    name: CreateStep3ScreenId,
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

export { CreateStep3ScreenDef, CreateStep3ScreenId, CreateStep3Screen };

import SettingsScreen from './screen'

const SettingsScreenId = 'SettingsScreen';

const SettingsScreenDef = (passProps) => ({
  component: {
    passProps,
    name: SettingsScreenId,
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
  SettingsScreenDef,
  SettingsScreenId,
  SettingsScreen,
};

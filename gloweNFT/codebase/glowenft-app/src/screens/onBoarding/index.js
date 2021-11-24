import OnBoardingScreen from './screen'

const OnBoardingScreenId = 'OnBoardingScreen';

const OnBoardingScreenDef = (passProps) => ({
  component: {
    passProps,
    name: OnBoardingScreenId,
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

export { OnBoardingScreenDef, OnBoardingScreenId, OnBoardingScreen };

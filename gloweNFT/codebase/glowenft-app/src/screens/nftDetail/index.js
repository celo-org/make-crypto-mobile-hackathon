import NftDetailScreen from './screen'

const NftDetailScreenId = 'NftDetailScreen';

const NftDetailScreenDef = (passProps) => ({
  component: {
    passProps,
    name: NftDetailScreenId,
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

export { NftDetailScreenDef, NftDetailScreenId, NftDetailScreen };

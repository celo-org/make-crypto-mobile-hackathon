const { getDefaultConfig } = require('metro-config');
const crypto = require.resolve('crypto-browserify')
const url = require.resolve('url/')
// module.exports = {
//   resolver: {
//     extraNodeModules: {
//       crypto,
//       url,
//       fs: require.resolve('expo-file-system'),
//       http: require.resolve('stream-http'),
//       https: require.resolve('https-browserify'),
//       net: require.resolve('react-native-tcp'),
//       os: require.resolve('os-browserify/browser.js'),
//       path: require.resolve('path-browserify'),
//       stream: require.resolve('readable-stream'),
//     }
//   }
// }

module.exports = (async () => {
  const {
    resolver: {
      sourceExts,
      assetExts
    },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],

      extraNodeModules: {
        crypto,
        url,
        fs: require.resolve('expo-file-system'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        net: require.resolve('react-native-tcp'),
        os: require.resolve('os-browserify/browser.js'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('readable-stream'),
      }
    },
  };
})();

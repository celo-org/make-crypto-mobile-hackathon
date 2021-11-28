const { getDefaultConfig } = require("metro-config");
const defaultConfig = getDefaultConfig.getDefaultValues(__dirname);

const crypto = require.resolve("crypto-browserify");
const url = require.resolve("url/");

module.exports = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, "pem"],
    extraNodeModules: {
      crypto,
      url,
      fs: require.resolve("expo-file-system"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      net: require.resolve("react-native-tcp"),
      os: require.resolve("os-browserify/browser.js"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("readable-stream"),
    },
  },
};

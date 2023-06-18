// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const crypto = require.resolve("crypto-browserify");

const config = getDefaultConfig(__dirname);

module.exports = {
    ...config,
    resolver: {
        extraNodeModules: {
            crypto,
            stream: require.resolve("readable-stream")
        }
    }
}

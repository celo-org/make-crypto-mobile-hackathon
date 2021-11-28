module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin',
      [
        'module-resolver', {
          "alias": {
            "@nft": "./src",
            "@nft/components": "./src/components",
            "@nft/services": "./src/services",
            "@nft/styles": "./src/styles",
            "@nft/screens": "./src/screens",
            "@nft/utils": "./src/utils",
          }
        }]]
  };
};

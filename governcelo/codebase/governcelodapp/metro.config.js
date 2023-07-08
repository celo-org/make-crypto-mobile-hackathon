// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const url = require.resolve("url/");

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules")
];

module.exports = {
    ...config,
    resolver: {
        extraNodeModules: {
            url,
            fs: require.resolve("expo-file-system"),
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            os: require.resolve("os-browserify/browser.js"),
            path: require.resolve("path-browserify"),
            stream: require.resolve("readable-stream"),
            vm: require.resolve("vm-browserify"),
            querystring: require.resolve("query-string")
        },
    },
};

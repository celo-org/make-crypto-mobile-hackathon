import { Platform } from "react-native";

export interface Global {
  btoa: any
  atob: any
  self: any
  Buffer: any
  process: any
  location: any
  BigInt: any
}

declare var global: Global
if (typeof global.self === 'undefined') {
  global.self = global
}

if (Platform.OS !== "web"){
  require("react-native-get-random-values");
}

global.btoa = global.btoa || require('base-64').encode;
global.atob = global.atob || require('base-64').decode;

global.Buffer = require('buffer').Buffer;
global.process = require('process');
global.BigInt = require('big-integer');
global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';
global.process.version = 'v9.40';

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
  protocol: 'https',
};


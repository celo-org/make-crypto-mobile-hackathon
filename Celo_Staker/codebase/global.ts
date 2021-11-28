// included as part of the Celo dappkit setup
// https://docs.celo.org/celo-sdk/dappkit/setup

export interface Global {
    btoa: any
    self: any
    Buffer: any
    process: any
    location: any
  }
  
  declare var global: Global
  if (typeof global.self === 'undefined') {
    global.self = global
  }
  if (typeof btoa === 'undefined') {
    global.btoa = function(str) {
      return new Buffer(str, 'binary').toString('base64')
    }
  }
  
  global.Buffer = require('buffer').Buffer
  global.process = require('process')
  global.location = {
    protocol: 'https'
  }
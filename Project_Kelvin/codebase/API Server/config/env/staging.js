var PRODUCTION_CONFIG = require('./production');

module.exports = Object.assign({}, PRODUCTION_CONFIG, {

  datastores: Object.assign({}, PRODUCTION_CONFIG.datastores, {
    default: Object.assign({}, PRODUCTION_CONFIG.datastores.default, {
    })
  }),

  sockets: Object.assign({}, PRODUCTION_CONFIG.sockets, {

    onlyAllowOrigins: [
      'http://localhost:1337',
    ],
  }),

  session: Object.assign({}, PRODUCTION_CONFIG.session, {
  }),

  custom: Object.assign({}, PRODUCTION_CONFIG.custom, {
    baseUrl: 'https://staging.example.com',
    internalEmailAddress: 'support+staging@example.com',
  })

});

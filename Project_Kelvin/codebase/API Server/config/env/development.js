module.exports = {
  datastores: {
    default: {
      adapter: 'sails-mysql',
      url: 'mysql://root:jellynightfatherwheel@localhost:3306/kelvin',
    },
  },
  models: {
    migrate: 'safe',
    // cascadeOnDestroy: false,
  },
  blueprints: {
    shortcuts: false,
  },
  security: {
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },
  },
  session: {
    // adapter: '@sailshq/connect-redis',
    // url: 'redis://user:password@localhost:6379/databasenumber',
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },
  },
  log: {
    level: 'debug'
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    trustProxy: false,
  },
  // port: 80,
  // ssl: undefined,
  custom: {
    // baseUrl: 'https://example.com',
    // internalEmailAddress: 'support@example.com',
    // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
    // stripeSecret: 'sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm',
  },
};

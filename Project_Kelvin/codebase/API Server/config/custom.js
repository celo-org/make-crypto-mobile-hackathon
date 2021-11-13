module.exports.custom = {
  baseUrl: 'http://localhost:1337',
  platformCopyrightYear: '2021',
  passwordResetTokenTTL: 24*60*60*1000,// 24 hours
  emailProofTokenTTL:    24*60*60*1000,// 24 hours

  rememberMeCookieMaxAge: 30*24*60*60*1000, // 30 days

  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',

  // The sender that all outgoing emails will appear to come from.
  fromEmailAddress: 'noreply@example.com',
  fromName: 'The NEW_APP_NAME Team',

  internalEmailAddress: 'support+development@example.com',

  verifyEmailAddresses: false,


  // stripePublishableKey: 'pk_test_Zzd814nldl91104qor5911gjald',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
};

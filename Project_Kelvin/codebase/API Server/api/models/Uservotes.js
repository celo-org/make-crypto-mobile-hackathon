/**
 * Uservotes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	  user: {type: 'string'},
      sourceName: {type: 'string'},
      votedFor: {type: 'string'},
      targetTransaction: {type: 'string'},
      votecount: {type: 'float'},
	  createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true },
      updatedAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true },
  },

};


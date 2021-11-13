module.exports = {

  attributes: {
    firstName: { type: 'string', required: true, },
    lastName: { type: 'string', required: true, },
    gender: { type: 'string', required: true, },
    createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true },
  },

};


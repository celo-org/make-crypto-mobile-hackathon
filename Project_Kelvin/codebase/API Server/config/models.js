module.exports.models = {
  schema: true,
  migrate: 'safe',
  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
    id: { type: 'number', autoIncrement: true, },
  },
  dataEncryptionKeys: {
    default: 'cHMHxIW+6/k4QZu72M34xf+VVufpQEt3GNvm/hBjg64='
  },
  cascadeOnDestroy: true
};

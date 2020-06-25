const postGet = require('./postGet');
const data = require('../data/providers-query.json');

const fields = ['businessName', 'uiDisplayName', 'npi'];

// postGet
module.exports = mock =>
  postGet(mock)(
    /\/api\/internal\/v1\/providers\??.*/,
    'providers',
    fields,
    data
  );

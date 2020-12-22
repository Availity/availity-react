const postGet = require('./postGet');
const data = require('../data/providers-query.json');

const fields = ['businessName', 'uiDisplayName', 'npi'];

// postGet
export default (mock) =>
  postGet(mock)(
    /\/api\/internal\/v1\/providers\??.*/,
    'providers',
    fields,
    data
  );

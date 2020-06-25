const postGet = require('./postGet');
const data = require('../data/organizations-query.json');

const fields = ['customerId', 'name', 'dbaName'];

// postGet
module.exports = mock =>
  postGet(mock)(
    /\/api\/sdk\/platform\/v1\/organizations\??.*/,
    'organizations',
    fields,
    data
  );

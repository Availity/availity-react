import postGet from './postGet';
import data from '../data/organizations-query.json';

const fields = ['customerId', 'name', 'dbaName'];

// postGet
export default postGet(
  /\/api\/sdk\/platform\/v1\/organizations\??.*/,
  'organizations',
  fields,
  data
);

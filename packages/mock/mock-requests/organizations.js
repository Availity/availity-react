import postGet from './postGet';
import data from '../data/organizations-query.json';

const fields = ['customerId', 'name', 'dbaName'];

// postGet
export default (mock) => postGet(mock)(/\/api\/sdk\/platform\/v1\/organizations\??.*/, 'organizations', fields, data);

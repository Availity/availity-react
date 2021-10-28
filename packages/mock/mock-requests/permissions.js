import postGet from './postGet';
import data from '../data/permissions.json';

const fields = ['permissionId'];

// postGet
export default (mock) => postGet(mock)(/\/api\/sdk\/platform\/v1\/permissions\??.*/, 'permissions', fields, data);

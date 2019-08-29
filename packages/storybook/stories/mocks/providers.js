import postGet from './postGet';
import data from '../data/providers-query.json';

const fields = ['businessName', 'uiDisplayName', 'npi'];

// postGet
export default postGet(
  /\/api\/internal\/v1\/providers\??.*/,
  'providers',
  fields,
  data
);

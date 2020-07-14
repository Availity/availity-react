import { useQuery } from 'react-query';
import { avPermissionsApi } from '@availity/api-axios';

const fetchPermissions = async (_, config) =>
  avPermissionsApi.getPermissions(config);
export default config => useQuery(['permissions', config], fetchPermissions);

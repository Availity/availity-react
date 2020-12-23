import { useQuery } from 'react-query';
import { avPermissionsApi } from '@availity/api-axios';

const fetchPermissions = async (config) =>
  avPermissionsApi.getPermissions(config);

export default function usePermissions(config, options) {
  return useQuery(
    ['permissions', config],
    () => fetchPermissions(config),
    options
  );
}

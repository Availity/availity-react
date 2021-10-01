import { useQuery } from 'react-query';
import { checkPermissions } from './util';

const useAuthorize = (permissions, { organizationId, customerId, region = true, resources } = {}, options) => {
  const { data: authorized = false, isLoading } = useQuery(
    ['authorized', permissions, region, resources, organizationId, customerId],
    () => checkPermissions(permissions, region, resources, organizationId, customerId),
    { enabled: !!permissions, ...options }
  );

  return { authorized, isLoading };
};

export default useAuthorize;

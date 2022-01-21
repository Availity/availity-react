import { useQuery } from 'react-query';

import { checkPermissions } from './api';
import type { QueryOptions, RequestedPermissions, RequestedResources } from './types';

type Parameters = {
  organizationId?: string;
  customerId?: string;
  region?: boolean | string;
  resources?: RequestedResources;
};

type Result = { authorized: boolean; isLoading: boolean };

const useAuthorize = (
  permissions: RequestedPermissions,
  parameters: Parameters = {},
  options?: QueryOptions
): Result => {
  const { organizationId, customerId, region = true, resources } = parameters;

  const { data: authorized = false, isLoading } = useQuery(
    ['authorized', permissions, region, resources, organizationId, customerId],
    () => checkPermissions(permissions, region, resources, organizationId, customerId),
    { enabled: permissions.length > 0, ...options }
  );

  return { authorized, isLoading };
};

export default useAuthorize;

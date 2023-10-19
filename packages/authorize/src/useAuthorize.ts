import { useQuery, useQueryClient } from '@tanstack/react-query';

import { checkPermissions, getRegion } from './api';
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
  const queryClient = useQueryClient();

  const { organizationId, customerId, region = true, resources } = parameters;

  const { data: authorized = false, isLoading } = useQuery(
    ['useAuthorize', permissions, region, resources, organizationId, customerId],
    async () => {
      const currentRegion = await queryClient.fetchQuery(['region'], () => getRegion(region));

      return checkPermissions(permissions, currentRegion, resources, organizationId, customerId);
    },
    { enabled: permissions.length > 0, ...options }
  );

  return { authorized, isLoading };
};

export default useAuthorize;

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { checkPermissions, getRegion } from './api';
import { Options, Parameters, Permissions } from './types';

export type UseAuthorizeProps = Permissions & Parameters & Options;

const useAuthorize = (
  permissions: UseAuthorizeProps['permissions'],
  parameters: UseAuthorizeProps['parameters'] = {},
  options?: UseAuthorizeProps['queryOptions']
): { authorized: boolean; isLoading: boolean } => {
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

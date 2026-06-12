import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { avPermissionsApi } from '@availity/api-axios';
import { AriesHookBase } from './types';

export interface PermissionsResponse extends AriesHookBase {
  data: AriesHookBase['data'] & {
    permissions: {
      id: string;
      description: string;
      links: { self: { href: string } };
    }[];
  };
}

const fetchPermissions = async (config: string | string[]) =>
  avPermissionsApi.getPermissions(config) as unknown as PermissionsResponse;

export default function usePermissions(
  config: string | string[],
  options?: Omit<UseQueryOptions<PermissionsResponse, unknown>, 'queryKey' | 'queryFn'>
): UseQueryResult<PermissionsResponse, unknown> {
  return useQuery({ queryKey: ['permissions', config], queryFn: () => fetchPermissions(config), ...options });
}

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { avPermissionsApi, PermissionsResponse as ApiPermissionsResponse } from '@availity/api-axios';

/** @deprecated Use `PermissionsResponse` from `@availity/api-axios` instead */
export type PermissionsResponse = ApiPermissionsResponse;

const fetchPermissions = async (config: string | string[]) =>
  avPermissionsApi.getPermissions(config) as unknown as PermissionsResponse;

export default function usePermissions(
  config: string | string[],
  options?: Omit<UseQueryOptions<PermissionsResponse, unknown>, 'queryKey' | 'queryFn'>
): UseQueryResult<PermissionsResponse, unknown> {
  return useQuery({ queryKey: ['permissions', config], queryFn: () => fetchPermissions(config), ...options });
}

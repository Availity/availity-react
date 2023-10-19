import { AxiosRequestConfig } from 'axios';
import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AriesHookBase } from './aries';

export interface PermissionsBase {
  data: {
    permissions: {
      id: string;
      description: string;
      links: { self: { href: string } };
    }[];
  };
}

type Permissions = AriesHookBase & PermissionsBase;

declare function usePermissions(
  config: AxiosRequestConfig,
  options?: UseQueryOptions<Permissions, unknown>
): UseQueryResult<Permissions, unknown>;

export default usePermissions;

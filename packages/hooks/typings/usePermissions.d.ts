import { AxiosRequestConfig } from 'axios';
import { QueryConfig, QueryResult } from 'react-query';
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
  options?: QueryConfig<Permissions, unknown>
): QueryResult<Permissions, unknown>;

export default usePermissions;

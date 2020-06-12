import { AriesHookBase } from './aries';
import { AxiosRequestConfig } from 'axios';
import { QueryResult } from 'react-query';

export interface PermissionsBase {
  data: {
    permissions: Array<{
      id: string;
      description: string;
      links: { self: { href: string } };
    }>;
  };
}

type Permissions = AriesHookBase & PermissionsBase;

declare function usePermissions(): QueryResult<Permissions>;
export default usePermissions;

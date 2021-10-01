import { QueryOptions } from 'react-query';
import { Permission, Resource } from './Authorize';

export interface AuthorizeOpts {
  organizationId?: string;
  customerId?: string;
  region?: boolean | string;
  resources?: string | number | Resource[];
}

declare function useAuthorize(
  permissions: string | number | Permission[],
  options?: AuthorizeOpts,
  queryOptions?: QueryOptions<boolean>
): { authorized: boolean; isLoading: boolean };

export default useAuthorize;

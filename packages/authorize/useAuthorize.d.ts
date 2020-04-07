import { Permission, Resource } from './Authorize';

export interface AuthorizeOpts {
  organizationId?: string;
  customerId?: string;
  region?: boolean | string;
  resources?: string | number | Resource[];
}

declare function useAuthorize(
  permissions: string | number | Permission[],
  options?: AuthorizeOpts
): [boolean, boolean, string];

export default useAuthorize;

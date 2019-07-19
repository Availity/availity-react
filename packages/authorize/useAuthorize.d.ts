export interface AuthorizeOpts {
  organizationId?: string;
  customerId?: string;
  region?: boolean | string;
}

declare function useAuthorize(
  permissions: string | Array<String>,
  options?: AuthorizeOpts
): [boolean,boolean];

export default useAuthorize;

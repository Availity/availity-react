import React from 'react';
import type { ReactNode } from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import useAuthorize from './useAuthorize';
import type { QueryOptions, RequestedPermissions, RequestedResources } from './types';

export type AuthorizeProps = {
  permissions: RequestedPermissions;
  resources?: RequestedResources;
  region?: boolean | string;
  loader?: boolean | ReactNode;
  organizationId?: string;
  customerId?: string;
  unauthorized?: ReactNode;
  children?: ReactNode;
  negate?: boolean;
  queryOptions?: QueryOptions;
};

const Authorize = ({
  permissions,
  resources,
  customerId,
  organizationId,
  region = true,
  loader,
  negate,
  children = null,
  unauthorized = null,
  queryOptions,
}: AuthorizeProps): JSX.Element | null => {
  const { authorized, isLoading } = useAuthorize(
    permissions,
    {
      customerId,
      organizationId,
      region,
      resources,
    },
    queryOptions
  );

  if (isLoading) {
    if (loader) return loader === true ? <BlockUi blocking /> : <>{loader}</>;
    return null;
  }

  // show children when authorized or negate is exclusively true
  if ((authorized || negate) && !(authorized && negate)) {
    return <>{children}</>;
  }

  return <>{unauthorized}</>;
};

export default Authorize;

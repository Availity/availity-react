import React from 'react';
import type { ReactNode } from 'react';
import BlockUi from '@availity/block-ui';

import useAuthorize, { UseAuthorizeProps } from './useAuthorize';

export type AuthorizeProps = {
  /** The content that renders when the user does have the permissions required. */
  children?: ReactNode;
  /** When true, BlockUi is used when loading the permissions. When a node, that node is rendered instead of BlockUi when loading the permissions. When false, nothing is rendered when loading the permissions. Default: true. */
  loader?: boolean | ReactNode;
  /** Negate the authorization. If the user does have the permissions specified, they are considered "unauthorized" (shown the unauthorized prop content). If the user does not have the permissions specified, they are considered "authorized" (shown the children prop content) */
  negate?: boolean;
  /** The content that renders when the user does not have the permissions required. */
  unauthorized?: ReactNode;
} & Pick<UseAuthorizeProps, 'permissions' | 'queryOptions'> &
  UseAuthorizeProps['parameters'];

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

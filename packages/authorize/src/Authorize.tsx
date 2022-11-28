import React from 'react';
import type { ReactNode } from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import useAuthorize from './useAuthorize';
import type { QueryOptions, RequestedPermissions, RequestedResources } from './types';

export type AuthorizeProps = {
  /** Can either be a string, eg: "1234", a number, eg: 1234, or an array, which can contain permission ID strings/numbers as well as other arrays which contain permission ID strings/numbers, eg: ['1234', '2345', ['3456', '4567'], ['5678', '6789']]. The items in a nested array indicate permission IDs that must all be granted to the user to be considered authorized - they act as "AND". The items in the top of the array act as "OR" - if any are granted, the user is considered authorized. The example ['1234', '2345', ['3456', '4567'], ['5678', '6789']] is similar to '1234' OR '2345' OR ('3456' && '4567') OR ('5678' && '6789'). */
  permissions: RequestedPermissions;
  /** When present, the permission is validated to ensure it contains the resource(s). Can either be a string, eg: "12345", a number, eg: 12345, or an array, which can contain resource ID strings/numbers as well as other arrays which contain resource ID strings/numbers, eg: ['12345', '23456', ['34567', '45678'], ['56789', '67890']]. The items in a nested array indicate resource IDs that must all be granted to the user to be considered authorized - they act as "AND". The items in the top of the array act as "OR" - if any are granted, the user is considered authorized. The example ['12345', '23456', ['34567', '45678'], ['56789', '67890']] is similar to '12345' OR '23456' OR ('34567' && '45678') OR ('56789' && '67890'). */
  resources?: RequestedResources;
  /** When a string, the permission is validated to ensure it is assigned in the provided region. When true, the permission is validated to ensure it is assigned in the current region. Default: true. */
  region?: boolean | string;
  /** When true, BlockUi is used when loading the permissions. When a node, that node is rendered instead of BlockUi when loading the permissions. When false, nothing is rendered when loading the permissions. Default: true. */
  loader?: boolean | ReactNode;
  /** When present, the permission is validated to ensure it is assigned to the organization. */
  organizationId?: string;
  /** When present, the permission is validated to ensure it is assigned to the customer. */
  customerId?: string;
  /* The content that renders when the user does not have the permissions required. */
  unauthorized?: ReactNode;
  /** The content that renders when the user does have the permissions required. */
  children?: ReactNode;
  /** Negate the authorization. If the user does have the permissions specified, they are considered "unauthorized" (shown the unauthorized prop content). If the user does not have the permissions specified, they are considered "authorized" (shown the children prop content) */
  negate?: boolean;
  queryOptions?: QueryOptions;
};

const Authorize = ({
  permissions,
  resources,
  customerId,
  organizationId,
  region = true,
  loader = true,
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

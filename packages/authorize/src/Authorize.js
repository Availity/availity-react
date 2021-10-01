import React from 'react';
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import useAuthorize from './useAuthorize';

const Authorize = ({
  permissions,
  resources,
  customerId,
  organizationId,
  region,
  loader,
  negate,
  children,
  unauthorized,
  queryOptions,
}) => {
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
    if (loader) return loader === true ? <BlockUi blocking /> : loader;
    return null;
  }

  // show children when authorized or negate is exclusively true
  if ((authorized || negate) && !(authorized && negate)) {
    return children;
  }

  return unauthorized;
};

Authorize.propTypes = {
  permissions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        PropTypes.string,
        PropTypes.number,
      ])
    ),
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  resources: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        PropTypes.string,
        PropTypes.number,
      ])
    ),
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.node,
  customerId: PropTypes.string,
  loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  negate: PropTypes.bool,
  organizationId: PropTypes.string,
  queryOptions: PropTypes.object,
  region: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  unauthorized: PropTypes.node,
};

Authorize.defaultProps = {
  region: true,
  unauthorized: null,
  children: null,
};

export default Authorize;

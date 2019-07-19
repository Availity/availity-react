import React from 'react';
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import useAuthorize from './useAuthorize';

const Authorize = ({
  permissions,
  customerId,
  organizationId,
  region,
  loader,
  negate,
  children,
  unauthorized,
}) => {
  const [authorized, loading] = useAuthorize(permissions,{
    customerId,
    organizationId,
    region,
  });

  if (loading) {
    if (loader) return loader === true ? <BlockUi blocking /> : loader;
    return null;
  }
  const showChildren = authorized ^ negate; // eslint-disable-line no-bitwise
  if (showChildren) {
    return children;
  }

  return unauthorized;
};

Authorize.propTypes = {
  permissions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        ),
        PropTypes.string,
        PropTypes.number,
      ])
    ),
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  region: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  organizationId: PropTypes.string,
  customerId: PropTypes.string,
  unauthorized: PropTypes.node,
  children: PropTypes.node,
  negate: PropTypes.bool,
};

Authorize.defaultProps = {
  region: true,
  unauthorized: null,
  children: null,
};

export default Authorize;

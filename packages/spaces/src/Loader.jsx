import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export const skeletonPropType = PropTypes.shape({
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

const Loader = ({ skeletonProps = { height: '100%' }, ...rest }) => (
  <span {...rest}>
    <Skeleton {...skeletonProps} />
  </span>
);
Loader.propTypes = {
  skeletonProps: skeletonPropType,
};

export default Loader;

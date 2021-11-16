import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const skeletonPropType = PropTypes.shape({
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

const Loader = ({ skeletonProps, ...rest }) => (
  <span {...rest}>
    <Skeleton {...skeletonProps} />
  </span>
);
Loader.propTypes = {
  skeletonProps: skeletonPropType,
};
Loader.defaultProps = {
  skeletonProps: {
    height: '100%',
  },
};

export default Loader;

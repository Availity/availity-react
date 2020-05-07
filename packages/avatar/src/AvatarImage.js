import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Img from 'react-image';
import { useAvatarContext } from './Avatar';

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

const AvatarImage = ({ skeletonProps, ...props }) => {
  const { avatar, loading } = useAvatarContext() || {};

  if (loading) {
    return (
      <Loader
        data-testid="avatar-img-loader"
        skeletonProps={skeletonProps}
        {...props}
      />
    );
  }

  return (
    <Img
      data-testid="avatar-img"
      src={avatar}
      alt="Avatar"
      loader={
        <Loader
          data-testid="avatar-img"
          skeletonProps={skeletonProps}
          {...props}
        />
      }
      {...props}
    />
  );
};

AvatarImage.propTypes = {
  skeletonProps: skeletonPropType,
};

export default AvatarImage;

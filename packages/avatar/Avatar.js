import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Img } from 'react-image';
import { useEffectAsync } from '@availity/hooks';
import { avSettingsApi } from '@availity/api-axios';
import get from 'lodash.get';

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

const Avatar = ({ fallback, skeletonProps, ...props }) => {
  const [avatar, setAvatar] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffectAsync(async () => {
    setLoading(true);
    const resp = await avSettingsApi.getApplication('AVATAR');

    const avi = get(resp, 'data.settings[0].avatar', fallback);

    setAvatar(avi);
    setLoading(false);
  }, []);

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

Avatar.propTypes = {
  fallback: PropTypes.string,
  skeletonProps: skeletonPropType,
};

Avatar.defaultProps = {
  fallback: '/public/apps/my-profile/images/Avatars-00.png',
};

export default Avatar;

import React, { useState } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import { Img } from 'react-image';
import { useEffectAsync } from '@availity/hooks';
import { avSettingsApi } from '@availity/api-axios';

const Loader = ({ skeletonProps = { height: '100%' }, ...rest }: { skeletonProps?: SkeletonProps }) => (
  <span {...rest}>
    <Skeleton {...skeletonProps} />
  </span>
);

async function getAvatar(): Promise<string> {
  try {
    const resp = await avSettingsApi.getApplication('AVATAR');

    return resp?.data?.settings?.[0]?.avatar;
  } catch {
    return '';
  }
}

type AvatarProps = {
  fallback?: string;
  skeletonProps?: SkeletonProps;
};

const Avatar = ({
  fallback = '/public/apps/my-profile/images/Avatars-00.png',
  skeletonProps,
  // TODO: get rid of spreading and add props to typedef
  ...props
}: AvatarProps): JSX.Element => {
  const [avatar, setAvatar] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffectAsync(async () => {
    setLoading(true);

    const resp = await getAvatar();
    setAvatar(resp || fallback);

    setLoading(false);
  }, []);

  if (loading) {
    return <Loader data-testid="avatar-img-loader" skeletonProps={skeletonProps} {...props} />;
  }

  return (
    <Img
      data-testid="avatar-img"
      src={avatar}
      alt="Avatar"
      loader={<Loader data-testid="avatar-img" skeletonProps={skeletonProps} {...props} />}
      {...props}
    />
  );
};

export default Avatar;

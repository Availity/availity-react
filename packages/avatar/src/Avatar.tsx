import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import { Img, ImgProps } from 'react-image';
import { avSettingsApi } from '@availity/api-axios';

type LoaderProps = {
  skeletonProps?: SkeletonProps;
} & JSX.IntrinsicElements['span'];

const Loader = ({ skeletonProps = { height: '100%' }, ...props }: LoaderProps) => (
  <span {...props}>
    <Skeleton {...skeletonProps} />
  </span>
);

const fetchAvatar = async (fallback: string) => {
  try {
    const resp = await avSettingsApi.getApplication('AVATAR');

    return resp.data.settings?.[0]?.avatar || fallback;
  } catch {
    return fallback;
  }
};

const useFetchAvatar = (fallback: string) => {
  const [avatar, setAvatar] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAvatar = async () => {
      setLoading(true);

      const resp = await fetchAvatar(fallback);
      setAvatar(resp);

      setLoading(false);
    };

    getAvatar();
  }, [fallback]);

  return { avatar, loading };
};

type AvatarProps = {
  fallback?: string;
  skeletonProps?: SkeletonProps;
} & Partial<ImgProps>;

const Avatar = ({
  fallback = '/public/apps/my-profile/images/Avatars-00.png',
  skeletonProps,
  ...props
}: AvatarProps): JSX.Element => {
  const { avatar, loading } = useFetchAvatar(fallback);

  if (loading) {
    return <Loader data-testid="loader" skeletonProps={skeletonProps} {...props} />;
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

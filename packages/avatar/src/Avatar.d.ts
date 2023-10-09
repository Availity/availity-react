import type { ImgProps } from 'react-image';

export type SkeletonType = {
  width?: string | number;
  height?: string | number;
};

export type AvatarProps = {
  fallback?: string;
  skeletonProps?: SkeletonType;
  src?: string;
} & Omit<ImgProps, 'src'>;

declare const Avatar: React.FC<AvatarProps>;

export default Avatar;

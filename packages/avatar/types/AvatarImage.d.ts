type SkeletonType = {
  width?: string | number;
  height?: string | number;
};

export interface AvatarImageProps {
  skeletonProps?: SkeletonType;
}

declare const AvatarImage: React.FunctionComponent<AvatarImageProps>;

export default AvatarImage;

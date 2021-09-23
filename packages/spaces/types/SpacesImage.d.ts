type SkeletonType = {
  width?: string | number;
  height?: string | number;
};

export interface SpacesImageProps {
  spaceId?: string;
  payerId?: string;
  imageType: string;
  skeletonProps?: SkeletonType;
}

declare const SpacesImage: React.FC<SpacesImageProps>;

export default SpacesImage;

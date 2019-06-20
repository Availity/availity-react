type SkeletonType = {
    width?: string;
    height?: string;
};

export interface SpacesImageProps {
    spaceId?: string;
    payerId?: string;
    imageType: string;
    skeletonProps?: SkeletonType; 
}

declare const SpacesImage: React.FunctionComponent<SpacesImageProps>;

export default SpacesImage;

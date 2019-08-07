type SkeletonType = {
    width?: string | number;
    height?: string | number;
};

export interface AvatarProps {
    fallback?: string;
    skeletonProps?: SkeletonType; 
}

declare const Avatar: React.FunctionComponent<AvatarProps>;

export default Avatar;

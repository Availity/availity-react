export interface AvatarContext {
  loading: boolean;
  avatar?: string;
}

export interface AvatarProps {
  children?:
    | React.ReactNode
    | ((avatarContext: AvatarContext) => React.ReactNode);
  fallback?: string;
}

declare function useAvatarContext(): AvatarContext;

declare const Avatar: React.FunctionComponent<AvatarProps>;

export { useAvatarContext };

export default Avatar;

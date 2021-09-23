export interface AppIconProps {
  tag?: React.ReactElement | string;
  color?: string;
  size?: string;
  branded?: boolean;
  className?: string;
  src?: string;
  alt?: string;
}

declare const AppIcon: React.FC<AppIconProps>;

export default AppIcon;

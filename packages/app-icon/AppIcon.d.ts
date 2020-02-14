export interface AppIconProps extends React.HTMLAttributes<HTMLElement> {
  [key: string]: any;
  tag?: React.ReactType | string;
  color?: string;
  size?: string;
  branded?: boolean;
  className?: string;
  src?: string;
  alt?: string;
  children?: React.ReactType;
}

declare const AppIcon: React.FunctionComponent<AppIconProps>;

export default AppIcon;

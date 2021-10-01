export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  size?: string;
}

declare const Icon: React.FC<IconProps>;

export default Icon;

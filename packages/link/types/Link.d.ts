export interface AvLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  target?: string;
  tag?: React.ReactType | string;
  onClick?: (event: React.SyntheticEvent<HTMLAnchorElement>, url: string) => void;
  href: string;
  loadApp?: boolean;
  rel?: string;
}

declare const AvLink: React.FC<AvLinkProps>;

export default AvLink;

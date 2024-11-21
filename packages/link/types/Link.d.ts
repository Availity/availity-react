export interface AvLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  loadApp?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLAnchorElement>, url: string) => void;
  rel?: string;
  tag?: React.ReactType | string;
  target?: string;
}

declare const AvLink: React.FC<AvLinkProps>;

export default AvLink;

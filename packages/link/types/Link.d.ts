export interface AvLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  target?: string;
  tag?: React.ReactType | string;
  onClick?: (event: React.SyntheticEvent<HTMLAnchorElement>, url: string) => void;
  href: string;
  loadApp?: boolean;
  rel?: string;
}

declare const AvLink: React.FC<AvLinkProps>;

declare function getUrl(url: string, loadApp: boolean, absolute: boolean): string;

declare function getTarget(target: string): string;

export { getUrl, getTarget };

export default AvLink;

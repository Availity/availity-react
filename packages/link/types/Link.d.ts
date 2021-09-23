import * as React from 'react';

export interface AvLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag?: React.ReactType | string;
  loadApp?: boolean;
}

declare const AvLink: React.FC<AvLinkProps>;

export default AvLink;

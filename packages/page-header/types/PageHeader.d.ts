type CrumbType = {
  name?: string;
  url?: string;
};

export interface RightContentProps extends React.HTMLAttributes<HTMLElement> {
  payerLogo?: React.ReactNode;
  feedback?: React.ReactNode;
}

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  appName: string;
  spaceName?: string;
  spaceId?: string;
  appAbbr?: string;
  iconColor?: string;
  branded?: boolean;
  payerId?: string;
  component?: React.ReactNode;
  feedback?: boolean;
  feedbackProps?: any;
  logo?: boolean;
  linkTag?: React.ComponentType<React.HTMLAttributes<HTMLAnchorElement>> | string;
  titleProps?: React.HTMLAttributes<HTMLDivElement>;
  renderRightContent?: React.FC<RightContentProps>;
  crumbs?: CrumbType[] | React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  clientId?: string;
  homeUrl?: string;
  showCrumbs?: boolean;
  spacesVariables?: Record<string, unknown>;
}

declare const PageHeader: React.FC<PageHeaderProps>;

export default PageHeader;

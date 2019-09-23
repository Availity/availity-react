type CrumbType = {
  name?: string;
  url?: string;
};

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  appName: string;
  spaceName?: string;
  spaceId?: string;
  appAbbr?: string;
  iconColor?: string;
  branded?: boolean;
  payerId?: string;
  component?: React.ReactType;
  feedback?: boolean;
  feedbackProps?: any;
  titleProps?: React.HTMLAttributes<HTMLDivElement>;
  children?: React.ReactType;
  crumbs?: Array<CrumbType> | React.ReactType;
  iconSrc?: string;
  iconAlt?: string;
  clientId?: string;
  homeUrl?: string;
}

declare const PageHeader: React.FunctionComponent<PageHeaderProps>;

export default PageHeader;

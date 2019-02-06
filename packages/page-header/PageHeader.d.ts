type CrumbType = {
    name?: string;
    url?: string;
};

export interface PageHeaderProps {
    appName: string;
    spaceName?: string;
    spaceId?: string;
    appAbbr?: string;
    iconColor?: string;
    branded?: boolean;
    payerId?: string;
    component?: React.ReactType;
    feedback?: boolean;
    children?: Node;
    crumbs?: Array<CrumbType>;
}

declare const PageHeader: React.FunctionComponent<PageHeaderProps>;

export default PageHeader;

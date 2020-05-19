import { BreadcrumbProps as RsBreadcrumbsProps } from 'reactstrap';

type Crumb = {
    name: string;
    url: string;
}


export interface BreadcrumbsProps extends RsBreadcrumbsProps {
    crumbs?: Crumb[];
    active: string;
    emptyState?: string;
    linkTag?: React.ComponentType<React.HTMLAttributes<HTMLAnchorElement>> | string;
    homeUrl?: string;
}

declare const Breadcrumbs: React.StatelessComponent<BreadcrumbsProps>;

export default Breadcrumbs;
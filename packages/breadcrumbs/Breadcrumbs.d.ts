type Crumb = {
    name: string;
    url: string;
}


export interface BreadcrumbsProps {
    crumbs?: Array<Crumb>;
    active: string;
    emptyState?: string;
    linkTag?: React.ComponentType<React.HTMLAttributes<HTMLAnchorElement>> | string;
    homeUrl?: string;
}

declare const Breadcrumbs: React.StatelessComponent<BreadcrumbsProps>;

export default Breadcrumbs;
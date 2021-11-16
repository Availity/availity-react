import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbProps } from 'reactstrap';

type Crumb = {
  name: string;
  url: string;
};

type Props = {
  active: string;
  children?: React.ReactNode;
  crumbs?: Crumb[];
  emptyState?: string;
  homeUrl?: string;
  linkTag?: React.ElementType;
} & BreadcrumbProps;

const Breadcrumbs = ({
  crumbs,
  active,
  emptyState = '...',
  children,
  linkTag: LinkTag = 'a',
  homeUrl = '/public/apps/dashboard',
  ...props
}: Props): JSX.Element => {
  const renderCrumb = ({ name, url }: Crumb) => {
    let item = <span>{emptyState}</span>;

    if (name && url) {
      item = (
        <LinkTag aria-label={name} href={url}>
          {name}
        </LinkTag>
      );
    }

    return <BreadcrumbItem key={name + url}>{item}</BreadcrumbItem>;
  };

  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>
        <LinkTag aria-label="Home" href={homeUrl}>
          Home
        </LinkTag>
      </BreadcrumbItem>
      {crumbs?.map((crumb) => renderCrumb(crumb)) || null}
      {children}
      <BreadcrumbItem active>{active || emptyState}</BreadcrumbItem>
    </Breadcrumb>
  );
};

export default Breadcrumbs;

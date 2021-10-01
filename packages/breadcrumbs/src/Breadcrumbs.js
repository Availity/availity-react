import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Breadcrumbs = ({ crumbs, active, emptyState, children, linkTag: LinkTag, homeUrl, ...rest }) => {
  const renderBreadCrumb = (crumb) => {
    // default breadcrumbitem render
    let breadCrumbItemChildren = <span>{emptyState}</span>;
    // render static links
    if (crumb.name && crumb.url) {
      breadCrumbItemChildren = (
        <LinkTag aria-label={crumb.name} href={crumb.url}>
          {crumb.name}
        </LinkTag>
      );
    }
    return <BreadcrumbItem key={crumb.name + crumb.url}>{breadCrumbItemChildren}</BreadcrumbItem>;
  };

  return (
    <Breadcrumb {...rest}>
      <BreadcrumbItem>
        <LinkTag aria-label="Home" href={homeUrl}>
          Home
        </LinkTag>
      </BreadcrumbItem>
      {crumbs && crumbs.length > 0 && crumbs.map((crumb) => renderBreadCrumb(crumb))}
      {children}
      <BreadcrumbItem active>{active || emptyState}</BreadcrumbItem>
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  linkTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  active: PropTypes.string.isRequired,
  emptyState: PropTypes.string,
  children: PropTypes.node,
  homeUrl: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  emptyState: '…',
  homeUrl: '/public/apps/dashboard',
  linkTag: 'a',
};

export default Breadcrumbs;

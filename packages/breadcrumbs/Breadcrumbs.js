import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Breadcrumbs = ({ crumbs, active, emptyState, children, ...rest }) => {
  const renderBreadCrumb = crumb => {
    // default breadcrumbitem render
    let breadCrumbItemChildren = <span>{emptyState}</span>;
    // render static links
    if (crumb.name && crumb.url) {
      breadCrumbItemChildren = (
        <a aria-label={crumb.name} href={crumb.url}>
          {crumb.name}
        </a>
      );
    }
    return (
      <BreadcrumbItem key={crumb.name + crumb.url}>
        {breadCrumbItemChildren}
      </BreadcrumbItem>
    );
  };

  return (
    <Breadcrumb {...rest}>
      <BreadcrumbItem>
        <a aria-label="Home" href="/public/apps/dashboard">
          Home
        </a>
      </BreadcrumbItem>
      {crumbs && crumbs.length > 0 && crumbs.map(renderBreadCrumb)}
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
  active: PropTypes.string.isRequired,
  emptyState: PropTypes.string,
  children: PropTypes.node,
};

Breadcrumbs.defaultProps = {
  emptyState: '…',
};

export default Breadcrumbs;

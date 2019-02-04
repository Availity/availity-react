import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Breadcrumbs = ({ crumbs, active, emptyState, ...props }) => (
  <Breadcrumb {...props}>
    <BreadcrumbItem>
      <a href="/public/apps/dashboard">Home</a>
    </BreadcrumbItem>

    {crumbs &&
      crumbs.length > 0 &&
      crumbs.map(crumb => (
        <BreadcrumbItem key={crumb.name + crumb.url}>
          {crumb.name && crumb.url ? (
            <a href={crumb.url}>{crumb.name}</a>
          ) : (
            <span>{emptyState}</span>
          )}
        </BreadcrumbItem>
      ))}

    <BreadcrumbItem active>{active || emptyState}</BreadcrumbItem>
  </Breadcrumb>
);

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  active: PropTypes.string.isRequired,
  emptyState: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  emptyState: '…',
};

export default Breadcrumbs;

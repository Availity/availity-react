import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Breadcrumbs = ({ crumbs, active, emptyState, children, linkTag: LinkTag, homeUrl, ...rest }) => {
  const renderBreadCrumb = (crumb) => {
    // default breadcrumb item render
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
  /** The name of the active page (the page the user is currently on). */
  active: PropTypes.string.isRequired,
  /** The ancestor pages. Objects in array contain `name` (String) and `url` (String) properties. */
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  /** Custom link tag for the links. */
  linkTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** The value to display when the active page or an ancestor does not have a value. */
  emptyState: PropTypes.string,
  /** The children must be a reactstrap `BreadcrumbItem` components. */
  children: PropTypes.node,
  /** Url for the Home route. */
  homeUrl: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  emptyState: '…',
  homeUrl: '/public/apps/dashboard',
  linkTag: 'a',
};

export default Breadcrumbs;

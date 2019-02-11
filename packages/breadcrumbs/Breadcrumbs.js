import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Breadcrumbs extends React.Component {
  renderBreadCrumb = crumb => {
    // default breadcrumbitem render
    let breadCrumbItemChildren = <span>{this.props.emptyState}</span>;
    // render static links
    if (crumb.name && crumb.url) {
      breadCrumbItemChildren = <a href={crumb.url}>{crumb.name}</a>;
    }
    return (
      <BreadcrumbItem key={crumb.name + crumb.url}>
        {breadCrumbItemChildren}
      </BreadcrumbItem>
    );
  };

  render() {
    const { crumbs, active, emptyState } = this.props;

    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/public/apps/dashboard">Home</a>
        </BreadcrumbItem>
        {crumbs && crumbs.length > 0 && crumbs.map(this.renderBreadCrumb)}
        {this.props.children}
        <BreadcrumbItem active>{active || emptyState}</BreadcrumbItem>
      </Breadcrumb>
    );
  }
}

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  active: PropTypes.string.isRequired,
  emptyState: PropTypes.string,
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, child => {
      if (child.type !== BreadcrumbItem) {
        error = new Error(
          `${componentName} children should be of type BreadCrumbItem`
        );
      }
    });
    return error;
  },
};

Breadcrumbs.defaultProps = {
  emptyState: '…',
};

export default Breadcrumbs;

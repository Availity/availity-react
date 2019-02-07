import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Breadcrumbs extends React.Component {
  renderBreadCrumb = crumb => {
    // default breadcrumbitem render
    let breadCrumbItemChildren = <span>{this.props.emptyState}</span>;
    // render static link
    if (crumb.name && crumb.url) {
      breadCrumbItemChildren = <a href={crumb.url}>{crumb.name}</a>;
    }
    return (
      <BreadcrumbItem key={crumb.name + crumb.url}>
        {breadCrumbItemChildren}
      </BreadcrumbItem>
    );
  };

  renderProvidedLink = renderCustomCrumbContent => {
    if (
      !renderCustomCrumbContent ||
      typeof renderCustomCrumbContent !== 'function'
    ) {
      return null;
    }
    return <BreadcrumbItem>{renderCustomCrumbContent()}</BreadcrumbItem>;
  };

  render() {
    const { crumbs, active, emptyState } = this.props;

    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/public/apps/dashboard">Home</a>
        </BreadcrumbItem>
        {crumbs && crumbs.length > 0 && crumbs.map(this.renderBreadCrumb)}
        {this.renderProvidedLink(this.props.renderCustomCrumbContent)}
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
  renderCustomCrumbContent: PropTypes.func,
};

Breadcrumbs.defaultProps = {
  emptyState: '…',
};

export default Breadcrumbs;

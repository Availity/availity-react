import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '@availity/breadcrumbs';
import AppIcon from '@availity/app-icon';
import Feedback from '@availity/feedback';
import PayerLogo from '@availity/payer-logo';

const PageHeader = ({
  payerId,
  spaceName,
  spaceId,
  children,
  appName,
  appAbbr,
  iconColor,
  branded,
  crumbs,
  CustomBreadCrumbs = null,
  feedback,
  component,
  tag: Tag,
  ...props
}) => {
  if (spaceId || spaceName) {
    crumbs = [
      { name: spaceName, url: spaceId && `/web/spaces/spaces/#/${spaceId}` },
    ];
  }
  return (
    <React.Fragment>
      <div className="d-flex align-items-start">
        {crumbs ? (
          <Breadcrumbs crumbs={crumbs} active={appName || children} />
        ) : (
          CustomBreadCrumbs
        )}
        {component}
      </div>
      <Tag className="page-header page-header-brand" {...props}>
        <div className="page-header-title">
          {!payerId && appAbbr && (
            <AppIcon color={iconColor} branded={branded} title={appName}>
              {appAbbr}
            </AppIcon>
          )}{' '}
          {children || appName}
        </div>
        {!payerId && feedback && (
          <Feedback
            appName={appName}
            className="float-md-right d-inline-block"
          />
        )}
        {payerId && (
          <PayerLogo
            spaceId={spaceId}
            payerId={payerId}
            className="float-md-right d-inline-block"
          />
        )}
      </Tag>
    </React.Fragment>
  );
};

PageHeader.propTypes = {
  appName: PropTypes.string.isRequired,
  spaceName: PropTypes.string,
  spaceId: PropTypes.string,
  appAbbr: PropTypes.string,
  iconColor: PropTypes.string,
  branded: PropTypes.bool,
  payerId: PropTypes.string,
  component: PropTypes.element,
  feedback: PropTypes.bool,
  children: PropTypes.node,
  CustomBreadCrumbs: (props, propName) => {
    if (!props.CustomBreadCrumbs) {
      return null;
    }
    let error = null;
    if (props.CustomBreadCrumbs.type !== Breadcrumbs) {
      error = new Error(`${propName} should be of type Breadcrumbs`);
    }
    return error;
  },
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

PageHeader.defaultProps = {
  tag: 'h1',
};

export default PageHeader;

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
  crumbs: ogCrumbs,
  feedback,
  component,
  ...props
}) => {
  let crumbs = ogCrumbs;
  if (spaceId || spaceName) {
    crumbs = [
      { name: spaceName, url: spaceId && `/web/spaces/spaces/#/${spaceId}` },
    ];
  }
  return (
    <React.Fragment>
      <div className="d-flex align-items-start">
        <Breadcrumbs crumbs={crumbs} active={appName || children} /> {component}
      </div>
      <h1 className="h4 page-header page-header-brand" {...props}>
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
      </h1>
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
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default PageHeader;

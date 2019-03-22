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
  feedback,
  component,
  tag: Tag,
  clientId,
  iconSrc,
  iconAlt,
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
        {React.isValidElement(crumbs) ? (
          crumbs
        ) : (
          <Breadcrumbs crumbs={crumbs} active={appName || children} />
        )}
        {component}
      </div>
      <Tag className="page-header page-header-brand" {...props}>
        <div className="page-header-title">
          {!payerId && appAbbr && (
            <AppIcon
              color={iconColor}
              branded={branded}
              title={appName}
              src={iconSrc}
              alt={iconAlt}
            >
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
            clientId={clientId}
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
  crumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    PropTypes.node,
  ]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  clientId: PropTypes.string,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string,
};

PageHeader.defaultProps = {
  tag: 'h1',
};

export default PageHeader;

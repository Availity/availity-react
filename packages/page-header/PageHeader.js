import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '@availity/breadcrumbs';
import AppIcon from '@availity/app-icon';
import Feedback from '@availity/feedback';
import Spaces, { SpacesLogo, useSpace } from '@availity/spaces';

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
  feedbackProps,
  component,
  tag: Tag,
  clientId,
  iconSrc,
  iconAlt,
  homeUrl,
  ...props
}) => {
  const { space: spaceForSpaceID } = useSpace(spaceId);
  const { space: spaceForPayerID, loading: spaceForPayerIDLoading } = useSpace(
    payerId
  );

  const _space = spaceForSpaceID || spaceForPayerID;

  let payerLogo = null;
  if (payerId) {
    const logoAttrs = {
      spaceId,
      payerId,
      className: 'float-md-right d-inline-block',
      skeletonProps: {
        width: 180,
        height: '100%',
      },
    };
    payerLogo =
      spaceForPayerID || spaceForPayerIDLoading ? (
        <SpacesLogo {...logoAttrs} />
      ) : (
        <Spaces
          spaceIds={spaceId ? [spaceId] : undefined}
          payerIds={[payerId]}
          clientId={clientId}
        >
          <SpacesLogo {...logoAttrs} />
        </Spaces>
      );
  }

  const _spaceName = spaceName || (_space && _space.name);
  if (spaceId || spaceName) {
    crumbs = [
      { name: _spaceName, url: spaceId && `/web/spaces/spaces/#/${spaceId}` },
    ];
  }

  return (
    <React.Fragment>
      <div className="d-flex align-items-start">
        {React.isValidElement(crumbs) ? (
          crumbs
        ) : (
          <Breadcrumbs
            crumbs={crumbs}
            active={appName || children}
            homeUrl={homeUrl}
          />
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

        {payerLogo}

        {feedback && (
          <Feedback
            appName={appName}
            className={`float-md-right d-inline-block ${payerId ? 'mx-3' : ''}`}
            {...feedbackProps}
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
  feedbackProps: PropTypes.shape({ ...Feedback.propTypes }),
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
  homeUrl: PropTypes.string,
  clientId: PropTypes.string,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string,
};

PageHeader.defaultProps = {
  tag: 'h1',
  // SpaceId and payerId are defaulted to null to prevent `useSpace` from
  // returning a space we may not want
  spaceId: null,
  payerId: null,
  homeUrl: '/public/apps/dashboard',
};

export default PageHeader;

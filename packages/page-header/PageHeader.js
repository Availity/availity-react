import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Breadcrumbs from '@availity/breadcrumbs';
import AppIcon from '@availity/app-icon';
import Feedback from '@availity/feedback';
import Spaces, {
  SpacesLogo,
  useSpaces,
  useSpacesContext,
} from '@availity/spaces';

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
  feedback: showFeedback,
  feedbackProps,
  titleProps: { className: titleClassName, ...restTitleProps },
  renderRightContent: RenderRightContent,
  renderRightClassName,
  component,
  tag: Tag,
  clientId,
  iconSrc,
  iconAlt,
  homeUrl,
  linkTag,
  className,
  ...props
}) => {
  const [spaceForSpaceID, spaceForPayerID] = useSpaces(spaceId, payerId);
  const { loading: spacesIsLoading } = useSpacesContext() || {};

  const _space = spaceForSpaceID || spaceForPayerID;

  let payerLogo = null;
  if (payerId) {
    const logoAttrs = {
      spaceId,
      payerId,
      className: 'd-inline-flex',
      skeletonProps: {
        width: 180,
        height: '100%',
      },
    };
    payerLogo =
      spaceForPayerID || spacesIsLoading ? (
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
    const url =
      spaceForSpaceID && spaceForSpaceID.link && spaceForSpaceID.link.url
        ? spaceForSpaceID.link.url
        : `/web/spaces/spaces/#/${spaceId}`;
    crumbs = [{ name: _spaceName, url }];
  }

  const feedback = useMemo(
    () => (
      <Feedback
        appName={appName}
        className={`d-inline-flex flex-shrink-0 ${payerId ? 'mx-3' : ''}`}
        {...feedbackProps}
      />
    ),
    [appName, feedbackProps, payerId]
  );

  return (
    <>
      <div className="d-flex align-items-start">
        {React.isValidElement(crumbs) ? (
          crumbs
        ) : (
          <Breadcrumbs
            crumbs={crumbs}
            active={appName || children}
            homeUrl={homeUrl}
            linkTag={linkTag}
          />
        )}
        {component}
      </div>
      <div
        className={classNames(
          'page-header page-header-brand d-flex justify-content-between align-items-end',
          className
        )}
        data-testid="page-header"
        {...props}
      >
        <Tag
          className={classNames(
            'page-header-title page-header-left d-flex align-items-center mb-0',
            titleClassName
          )}
          data-testid="page-header-title"
          {...restTitleProps}
        >
          {!payerId && appAbbr && (
            <AppIcon
              className="mr-2"
              data-testid="page-header-app-icon"
              color={iconColor}
              branded={branded}
              title={appName}
              src={iconSrc}
              alt={iconAlt}
            >
              {appAbbr}
            </AppIcon>
          )}
          {children || <h1 className="mb-0">{appName}</h1>}
        </Tag>
        {!RenderRightContent ? (
          <div className="page-header-left d-flex flex-xs-wrap flex-md-nowrap flex-grow align-items-end justify-content-end">
            {showFeedback && feedback}
            {payerLogo}
          </div>
        ) : (
          <RenderRightContent
            className={renderRightClassName}
            payerLogo={payerLogo}
            feedback={feedback}
          />
        )}
      </div>
    </>
  );
};

PageHeader.propTypes = {
  className: PropTypes.string,
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
  titleProps: PropTypes.object,
  children: PropTypes.node,
  linkTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
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
  renderRightContent: PropTypes.func,
  renderRightClassName: PropTypes.string,
  homeUrl: PropTypes.string,
  clientId: PropTypes.string,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string,
};

PageHeader.defaultProps = {
  tag: 'div',
  // SpaceId and payerId are defaulted to null to prevent `useSpace` from
  // returning a space we may not want
  spaceId: null,
  payerId: null,
  homeUrl: '/public/apps/dashboard',
  titleProps: {},
  renderRightClassName:
    'page-header-left d-flex flex-xs-wrap flex-md-nowrap flex-grow align-items-end justify-content-end',
};

export default PageHeader;

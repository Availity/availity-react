import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Breadcrumbs from '@availity/breadcrumbs';
import AppIcon from '@availity/app-icon';
import Feedback from '@availity/feedback';
import Spaces, { SpacesLogo, useSpaces, useSpacesContext } from '@availity/spaces';
import '../styles.scss';

const PageHeader = ({
  payerId,
  logo,
  spaceName,
  spaceId,
  children,
  appName,
  appAbbr,
  iconColor,
  branded,
  showCrumbs,
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
  variables,
  ...props
}) => {
  const spaces = useSpaces(spaceId, payerId);

  let firstSpaceForPayerID;
  let firstSpaceForSpaceID;
  if (!spaceId && payerId && spaces[0]) {
    firstSpaceForPayerID = spaces[0];
  } else {
    firstSpaceForSpaceID = spaces[0];
    firstSpaceForPayerID = spaces[1];
  }
  const { loading: spacesIsLoading } = useSpacesContext() || {};

  const _space = firstSpaceForSpaceID || firstSpaceForPayerID;

  let payerLogo = null;
  if (payerId || logo) {
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
      firstSpaceForPayerID || (logo && firstSpaceForSpaceID) || spacesIsLoading ? (
        <SpacesLogo {...logoAttrs} />
      ) : (
        <Spaces
          spaceIds={spaceId ? [spaceId] : undefined}
          payerIds={payerId ? [payerId] : undefined}
          clientId={clientId}
          variables={variables}
        >
          <SpacesLogo {...logoAttrs} />
        </Spaces>
      );
  }

  const _spaceName = spaceName || (_space && _space.name);
  if ((spaceId || _spaceName) && !crumbs) {
    const url =
      firstSpaceForSpaceID && firstSpaceForSpaceID.link && firstSpaceForSpaceID.link.url
        ? firstSpaceForSpaceID.link.url
        : `/web/spc/spaces/#/${spaceId}`;
    crumbs = [{ name: _spaceName, url }];
  }

  const feedback = useMemo(() => <Feedback appName={appName} {...feedbackProps} />, [appName, feedbackProps]);

  return (
    <>
      <div className="page-header-above">
        {showCrumbs ? (
          <>
            {React.isValidElement(crumbs) ? (
              crumbs
            ) : (
              <Breadcrumbs crumbs={crumbs} active={appName || children} homeUrl={homeUrl} linkTag={linkTag} />
            )}
          </>
        ) : null}
        {component}
      </div>
      <div className={classNames('page-header', className)} data-testid="page-header" {...props}>
        <Tag
          className={classNames('page-header-title', titleClassName)}
          data-testid="page-header-title"
          {...restTitleProps}
        >
          {!payerId && appAbbr && (
            <AppIcon
              data-testid="page-header-app-icon"
              color={iconColor}
              branded={branded}
              title={appName}
              src={iconSrc}
              alt={iconAlt}
              aria-hidden
            >
              {appAbbr}
            </AppIcon>
          )}
          {children || <h1>{appName}</h1>}
        </Tag>
        {!RenderRightContent ? (
          <div className="page-header-right">
            {showFeedback && feedback}
            {payerLogo}
          </div>
        ) : (
          <RenderRightContent className={renderRightClassName} payerLogo={payerLogo} feedback={feedback} />
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
  showCrumbs: PropTypes.bool,
  crumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    PropTypes.node,
  ]),
  logo: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  renderRightContent: PropTypes.func,
  renderRightClassName: PropTypes.string,
  homeUrl: PropTypes.string,
  clientId: PropTypes.string,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string,
  variables: PropTypes.object,
};

PageHeader.defaultProps = {
  tag: 'div',
  // SpaceId and payerId are defaulted to null to prevent `useSpace` from
  // returning a space we may not want
  spaceId: null,
  payerId: null,
  homeUrl: '/public/apps/dashboard',
  titleProps: {},
  renderRightClassName: 'page-header-right',
  showCrumbs: true,
};

export default PageHeader;

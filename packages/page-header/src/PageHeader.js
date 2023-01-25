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
  /** Name of the application. */
  appName: PropTypes.string.isRequired,
  /** The name of the class. */
  className: PropTypes.string,
  /** Payer Space Name of the space in which this page is under. */
  spaceName: PropTypes.string,
  /** Payer Space ID of the space in which this page is under. */
  spaceId: PropTypes.string,
  /** If provided and payerId is not provided, the app icon will appear. */
  appAbbr: PropTypes.string,
  /** Potential values: "black", "blue", "green", "orange", "red". Only used if the app icon should appear. Default: "black". */
  iconColor: PropTypes.string,
  /** Triggers the app icon's "branded" styles. Only used if the app icon should appear. */
  branded: PropTypes.bool,
  /** The ID of the payer the application is for. If provided, the payer logo appears and not the app icon. */
  payerId: PropTypes.string,
  /** Allow rendering of an optional component in the top right of the header. */
  component: PropTypes.element,
  /** If true, the feedback loop button appears. */
  feedback: PropTypes.bool,
  /** See Feedback. Props to send to <Feedback /> component */
  feedbackProps: PropTypes.shape({ ...Feedback.propTypes }),
  /** Additional props passed to the page-header-title. */
  titleProps: PropTypes.object,
  /** This value appears at the h1 of the page. Overrides the appName to allow for custom elements (such as a "beta" tag). Default: ${appName}. */
  children: PropTypes.node,
  /** Custom link tag for the links. Default: <a> */
  linkTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Flag whether or not to show the breadcrumbs. Default: true */
  showCrumbs: PropTypes.bool,
  /** Array of Objects containing name (String) and url (String) properties. The ancestor pages which get passed to the Breadcrumbs component. See Breadcrumbs */
  crumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    PropTypes.node,
  ]),
  /** If true will fetch the payer logo using the spaceId or payerId. */
  logo: PropTypes.bool,
  /** The tag to render the page header as. Default: <h1>. */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Used to customize the contents of the right side of the page header where the feedback and payer logo get rendered. Accepts the rendered payerLogo and feedback as props */
  renderRightContent: PropTypes.func,
  /** Renders the name of the right side of the page header */
  renderRightClassName: PropTypes.string,
  /** Url for the Home route. Default: public/apps/dashboard. */
  homeUrl: PropTypes.string,
  /** Client ID to use in Spaces to fetch the payer's logo */
  clientId: PropTypes.string,
  /** Image source for <AppIcon /> to be used instead of appAbbr. */
  iconSrc: PropTypes.string,
  /** Required if iconSrc is used. Image alt property of <AppIcon /> */
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
  renderRightClassName: 'page-header-right',
  showCrumbs: true,
};

export default PageHeader;

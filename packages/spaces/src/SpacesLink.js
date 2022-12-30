import React, { useMemo, useCallback, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import truncate from 'lodash.truncate';
import ReactMarkdown from 'react-markdown';
import { FavoriteHeart } from '@availity/favorites';
import { Card, CardBody, Media, CardText, CardTitle, Badge, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import ListGroupItem from '@availity/list-group-item';
import dayjs from 'dayjs';
import AppIcon from '@availity/app-icon';
import Icon from '@availity/icon';
import { useSpacesContext } from './Spaces';
import { isFunction } from './helpers';
import useLink from './useLink';
import Loader, { skeletonPropType } from './Loader';
import '../styles.scss';

const getDisplayDate = (date) => dayjs(date).format('MM/DD/YYYY');

const getContainerTag = (propTag = 'div', linkStyle) =>
  ({
    card: Card,
    list: ListGroupItem,
  }[linkStyle] || propTag);

const getBodyTag = (propTag = 'div', linkStyle) =>
  ({
    card: CardBody,
    list: 'div',
  }[linkStyle] || propTag);

const getTitleTag = (propTag, linkStyle) =>
  propTag ||
  {
    card: CardTitle,
    list: ListGroupItemHeading,
  }[linkStyle] ||
  'div';

const getTextTag = (propTag = 'div', linkStyle) =>
  ({
    card: CardText,
    list: ListGroupItemText,
  }[linkStyle] || propTag);

const Link = ({
  spaceId,
  space: propSpace,
  className,
  children,
  appIcon: showAppIcon,
  favorite,
  icon,
  showNew,
  showDate,
  stacked,
  body,
  description: showDescription,
  tag: Tag,
  bodyTag: BodyTag,
  titleTag: TitleTag,
  textTag: TextTag,
  titleClassName,
  linkStyle,
  size,
  loading: propsLoading,
  clientId: propsClientId,
  maxDescriptionLength, // TODO: remove and replace with text-truncate css
  style,
  skeletonProps,
  linkAttributes,
  role,
  analytics,
  customBadgeText,
  customBadgeColor,
  idPrefix,
  ...rest
}) => {
  const { loading } = useSpacesContext() || {};
  const isLoading = loading || propsLoading;

  const [
    {
      id,
      name,
      shortName,
      type,
      metadata,
      description,
      activeDate,
      isNew,
      icons = {},
      images = {},
      colors = {},
      link,
      configurationId,
      isGhosted,
      ...restLink
    } = {},
    props = {},
  ] = useLink(propSpace || spaceId, {
    clientId: propsClientId,
    linkAttributes,
  });

  const showUrl = !isGhosted && link?.url;

  const getIconTitle = useCallback(() => {
    if (shortName) return shortName;

    // We have to pass `name` as `className` bc of how its stored in spaces
    if (icons.navigation)
      return <Icon className={icons.navigation} id={`${idPrefix}app-${icons.navigation}-icon-${configurationId}`} />;

    return <Icon name="desktop" id={`${idPrefix}app-desktop-icon-${configurationId}`} />;
  }, [icons.navigation, shortName, configurationId, idPrefix]);

  const appIcon = useMemo(() => {
    if (!showAppIcon) return null;

    return (
      <AppIcon
        className={classNames('d-table-cell align-middle mx-2', icons.navigation)}
        style={{
          top: showDescription && description && !stacked ? -5 : 0,
        }}
        size={size === undefined && stacked ? 'lg' : size}
        id={`${idPrefix}app-appIcon-${configurationId}`}
      >
        {getIconTitle()}
      </AppIcon>
    );
  }, [
    description,
    getIconTitle,
    icons.navigation,
    showAppIcon,
    showDescription,
    size,
    stacked,
    configurationId,
    idPrefix,
  ]);

  const favoriteIcon = useMemo(
    () =>
      configurationId &&
      favorite && (
        <span
          className={classNames('d-table-cell align-middle', {
            'pr-2': !showAppIcon,
          })}
        >
          <FavoriteHeart id={`${idPrefix}${configurationId}`} name={name} onChange={(_, e) => e.stopPropagation()} />
        </span>
      ),
    [favorite, configurationId, name, showAppIcon, idPrefix]
  );

  const dateInfo = useMemo(
    () =>
      (showNew || showDate) && (
        <div
          className={classNames({
            'text-center': stacked,
            'media media-right': !stacked,
          })}
        >
          {showNew && isNew && (
            <Badge
              className={classNames({
                'mr-2': showDate,
              })}
              id={`${idPrefix}app-new-badge-${configurationId}`}
            >
              New!
            </Badge>
          )}
          {showDate && (
            <small id={`${idPrefix}app-display-date-${configurationId}`}>{getDisplayDate(activeDate)}</small>
          )}
        </div>
      ),
    [activeDate, isNew, showDate, showNew, stacked, configurationId, idPrefix]
  );

  const customBadgeDisplay = useMemo(
    () =>
      customBadgeText && (
        <div
          className={classNames({
            'text-center': stacked,
            'media media-right': !stacked,
            'mr-2': linkStyle !== 'card' && (showDate || (showNew && isNew)),
          })}
        >
          <Badge color={customBadgeColor || 'info'} id={`${idPrefix}app-custom-badge-${customBadgeText}`}>
            {customBadgeText}
          </Badge>
        </div>
      ),
    [customBadgeColor, customBadgeText, showDate, showNew, stacked, linkStyle, isNew, idPrefix]
  );

  if (isLoading) {
    return <Loader id={`${idPrefix}app-${configurationId}-loading`} skeletonProps={skeletonProps} {...rest} />;
  }

  Tag = getContainerTag(Tag, linkStyle);
  BodyTag = getBodyTag(BodyTag, linkStyle);
  TitleTag = getTitleTag(TitleTag, linkStyle);
  TextTag = getTextTag(TextTag, linkStyle);

  const renderChildren = () =>
    isFunction(children)
      ? (() =>
          children({
            id,
            name,
            shortName,
            type,
            metadata,
            description,
            isNew,
            activeDate,
            icons,
            images,
            colors,
            ...analytics,
            ...restLink,
            ...props,
          }))()
      : cloneElement(children, {
          role: 'link',
          tabIndex: 0,
          style: { cursor: showUrl ? 'pointer' : 'not-allowed' },
          'aria-label': name,
          ...analytics,
          ...props,
        });

  return (
    <Tag
      title={name}
      className={classNames('spaces-hook-link', className, `spaces-${linkStyle}-link`, {
        'p-2': linkStyle === 'default',
      })}
      {...rest}
      style={{ ...style }}
      role={linkStyle === 'list' ? 'listitem' : role}
    >
      <BodyTag
        className={classNames('d-flex', `align-items-${!showDescription || stacked ? 'center' : 'start'}`, {
          'flex-column': stacked,
        })}
      >
        {!stacked && favoriteIcon}
        {appIcon}
        {icon && <Icon name={icons.navigation} />}
        {children
          ? renderChildren()
          : body && (
              <Media body id={`${idPrefix}${type}-${configurationId}`} className="text-dark">
                <TitleTag
                  id={`${idPrefix}app-title-${configurationId}`}
                  className={classNames(
                    {
                      'mb-0': !customBadgeDisplay && (!showDescription || !description),
                      'pt-3': stacked,
                      'text-center': stacked,
                    },
                    titleClassName
                  )}
                  tabIndex={0}
                  style={{
                    cursor: showUrl ? 'pointer' : 'not-allowed',
                  }}
                  {...analytics}
                  {...props}
                  role={showUrl ? 'link' : role}
                  aria-label={name}
                  aria-describedby={showNew && isNew ? `${idPrefix}app-new-badge-${configurationId}` : undefined}
                >
                  {name}
                </TitleTag>
                {stacked && dateInfo}
                {showDescription && description && (
                  <TextTag
                    tag="div"
                    className={classNames('mt-1', {
                      'text-center': stacked,
                    })}
                    id={`${idPrefix}app-description-${configurationId}`}
                  >
                    {/* TODO: just rendering text, do we need markdown component? */}
                    <ReactMarkdown className="Card-text">
                      {maxDescriptionLength && description.length > maxDescriptionLength
                        ? truncate(description, {
                            length: maxDescriptionLength,
                            separator: ' ',
                          })
                        : description}
                    </ReactMarkdown>
                  </TextTag>
                )}
                {linkStyle === 'card' && customBadgeDisplay}
              </Media>
            )}
        {linkStyle !== 'card' && customBadgeDisplay}
        {!stacked && dateInfo}
      </BodyTag>
    </Tag>
  );
};

Link.propTypes = {
  /** If no spaceId is provided, the first space in the spaces array is used.
   * Note: This is only to be used when the Spaces provider should only ever contain a single space. */
  spaceId: PropTypes.string,
  /** Use to directly pass a space to the component rather than have it fetched from the spaces API.
   * This component does not have to be a child of a SpacesProvider.
   * Note: If you are wanting to take advantage of the sso links you will additionally need to pass the clientId in. */
  space: PropTypes.object,
  /** Children can be a react child or render prop. */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  /** Tag to overwrite the root component rendered. */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Tag to overwrite the body component that renders the title, description and date values.
   * It defaults to CardBody or div depending on the value of the linkStyle prop. */
  bodyTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Tag to overwrite the title component. If linkStyle prop is set to "card", defaults to CardTitle.
   * If linkStyle is set to "list", defaults to ListGroupItemHeading. Otherwise, defaults to div. */
  titleTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Tag to overwrite the text component. If linkStyle prop is set to "card", defaults to CardText.
   * If linkStyle is set to "list", defaults to ListGroupItemText. Otherwise, defaults to div. */
  textTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  titleClassName: PropTypes.string,
  /** When true, utilizes the reactstrap Card component for styling. */
  card: PropTypes.bool,
  /** When true, renders an @availity/icon next to the title if present on the space. */
  icon: PropTypes.bool,
  /** When true, renders the Spaces description beneath the title. */
  description: PropTypes.bool,
  /** When passed in, provides predefined styles for the component. Possible values are card, and list. */
  linkStyle: PropTypes.string,
  /** When true, renders an app icon to the left of the title and formats depending on the space information given. */
  appIcon: PropTypes.bool,
  /** When true, renders the FavoriteHeart component to the left of the Component.
   * Note, this does require you to have wrapped your component somewhere in the Favorites Provider.
   * This also requires the peerDependency react-query. */
  favorite: PropTypes.bool,
  /** When true, renders the title, and allow for the description and date info to be added on. Default: true */
  body: PropTypes.bool,
  /** When true, renders the activeDate of the space. */
  showDate: PropTypes.bool,
  /** When true, renders a "New!" badge if the activeDate is less than 30 days old. */
  showNew: PropTypes.bool,
  /** Adjusts the icon size of the AppIcon if enabled. */
  size: PropTypes.string,
  /** When true, renders the component vertically. */
  stacked: PropTypes.bool,
  /** Optionally pass in your own loading state for the component if you are managing the state yourself. */
  loading: PropTypes.bool,
  /** Required when space is not provided, or space is provided and space contains an sso link. */
  clientId: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  /** Dimensions passed to loader to show while the image is loading. */
  skeletonProps: skeletonPropType,
  /** Allows the description length to be truncated. */
  maxDescriptionLength: PropTypes.number,
  /** Additional attributes you may want to tack onto the native-form when submitting a SAML sso.
   *  i.e. spaceId or sourceApplicationId */
  linkAttributes: PropTypes.object,
  /** Allows the role of the root component to be overwritten.
   * If linkStyle prop is set to "list", defaults to "listitem". */
  role: PropTypes.string,
  /** When Analytics props are passed inside the analytics props, they will be passed down to the click item.
   * For more information on Analytics props see: Autotrack Logged Events */
  analytics: PropTypes.object,
  customBadgeText: PropTypes.string,
  customBadgeColor: PropTypes.string,
  /** prefix for ids to prevent duplicates when the same config link is displayed on the page more than once */
  idPrefix: PropTypes.string,
};

Link.defaultProps = {
  linkStyle: 'default',
  body: true,
  idPrefix: '',
};

export default Link;

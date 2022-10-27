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
      return <Icon className={icons.navigation} id={`app-${icons.navigation}-icon-${configurationId}`} />;

    return <Icon name="desktop" id={`app-desktop-icon-${configurationId}`} />;
  }, [icons.navigation, shortName, configurationId]);

  const appIcon = useMemo(() => {
    if (!showAppIcon) return null;

    return (
      <AppIcon
        className={classNames('d-table-cell align-middle mx-2', icons.navigation)}
        style={{
          top: showDescription && description && !stacked ? -5 : 0,
        }}
        size={size === undefined && stacked ? 'lg' : size}
        id={`app-appIcon-${configurationId}`}
      >
        {getIconTitle()}
      </AppIcon>
    );
  }, [description, getIconTitle, icons.navigation, showAppIcon, showDescription, size, stacked, configurationId]);

  const favoriteIcon = useMemo(
    () =>
      configurationId &&
      favorite && (
        <span
          className={classNames('d-table-cell align-middle', {
            'pr-2': !showAppIcon,
          })}
        >
          <FavoriteHeart id={configurationId} name={name} onChange={(_, e) => e.stopPropagation()} />
        </span>
      ),
    [favorite, configurationId, name, showAppIcon]
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
              id={`app-new-badge-${configurationId}`}
            >
              New!
            </Badge>
          )}
          {showDate && <small id={`app-display-date-${configurationId}`}>{getDisplayDate(activeDate)}</small>}
        </div>
      ),
    [activeDate, isNew, showDate, showNew, stacked, configurationId]
  );

  const customBadgeDisplay = useMemo(
    () => (
      <div
        className={classNames({
          'text-center': stacked,
          'media media-right': !stacked,
        })}
      >
        <Badge
          color={customBadgeColor || 'info'}
          className={classNames({
            'ml-2': showDate || showNew,
          })}
          id={`app-custom-badge-${customBadgeText}`}
        >
          {customBadgeText}
        </Badge>
      </div>
    ),
    [customBadgeColor, customBadgeText, showDate, showNew, stacked]
  );

  if (isLoading) {
    return <Loader id={`app-${configurationId}-loading`} skeletonProps={skeletonProps} {...rest} />;
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
              <Media body id={`${type}-${configurationId}`} className="text-dark">
                <TitleTag
                  id={`app-title-${configurationId}`}
                  className={classNames(
                    {
                      'mb-0': !showDescription || !description,
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
                  aria-describedby={showNew && isNew ? `app-new-badge-${configurationId}` : undefined}
                >
                  {name}
                </TitleTag>
                {stacked && dateInfo}
                {stacked && customBadgeDisplay}
                {showDescription && description && (
                  <TextTag
                    tag="div"
                    className={classNames('mt-1', {
                      'text-center': stacked,
                    })}
                    id={`app-description-${configurationId}`}
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
              </Media>
            )}
        {!stacked && dateInfo}
        {!stacked && customBadgeDisplay}
      </BodyTag>
    </Tag>
  );
};

Link.propTypes = {
  spaceId: PropTypes.string,
  space: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  bodyTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  titleTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  textTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  titleClassName: PropTypes.string,
  card: PropTypes.bool,
  icon: PropTypes.bool,
  description: PropTypes.bool,
  linkStyle: PropTypes.string,
  appIcon: PropTypes.bool,
  favorite: PropTypes.bool,
  body: PropTypes.bool,
  showDate: PropTypes.bool,
  showNew: PropTypes.bool,
  size: PropTypes.string,
  stacked: PropTypes.bool,
  loading: PropTypes.bool,
  clientId: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  skeletonProps: skeletonPropType,
  maxDescriptionLength: PropTypes.number,
  linkAttributes: PropTypes.object,
  role: PropTypes.string,
  analytics: PropTypes.object,
  customBadgeText: PropTypes.string,
  customBadgeColor: PropTypes.string,
};

Link.defaultProps = {
  linkStyle: 'default',
  body: true,
};

export default Link;

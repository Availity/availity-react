import React, { useMemo, useCallback } from 'react';
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

const getTitleTag = (propTag = 'div', linkStyle) =>
  ({
    card: CardTitle,
    list: ListGroupItemHeading,
  }[linkStyle] || propTag);

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
  linkStyle,
  size,
  loading: propsLoading,
  clientId: propsClientId,
  maxDescriptionLength, // TODO: remove and replace with text-truncate css
  style,
  skeletonProps,
  linkAttributes,
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
      ...restLink
    } = {},
    props = {},
  ] = useLink(propSpace || spaceId, {
    clientId: propsClientId,
    linkAttributes,
  });

  const getIconTitle = useCallback(() => {
    if (shortName) return shortName;

    // We have to pass `name` as `className` bc of how its stored in spaces
    if (icons.navigation) return <Icon className={icons.navigation} />;

    return <Icon name="desktop" />;
  }, [icons.navigation, shortName]);

  const appIcon = useMemo(() => {
    if (!showAppIcon) return null;

    return (
      <AppIcon
        className={classNames('d-table-cell align-middle mx-2', icons.navigation)}
        style={{
          top: showDescription && description && !stacked ? -5 : 0,
        }}
        size={size === undefined && stacked ? 'lg' : size}
      >
        {getIconTitle()}
      </AppIcon>
    );
  }, [description, getIconTitle, icons.navigation, showAppIcon, showDescription, size, stacked]);

  const favoriteIcon = useMemo(
    () =>
      id &&
      favorite && (
        <span
          className={classNames('d-table-cell align-middle', {
            'pr-2': !showAppIcon,
          })}
        >
          <FavoriteHeart id={id} name={name} onChange={(_, e) => e.stopPropagation()} />
        </span>
      ),
    [favorite, id, name, showAppIcon]
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
              tabIndex={0}
              className={classNames({
                'mr-2': showDate,
              })}
            >
              New!
            </Badge>
          )}
          {showDate && <small>{getDisplayDate(activeDate)}</small>}
        </div>
      ),
    [activeDate, isNew, showDate, showNew, stacked]
  );

  if (isLoading) {
    return <Loader data-testid={`space-${linkStyle}-${id}-loading`} skeletonProps={skeletonProps} {...rest} />;
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
            ...restLink,
            ...props,
          }))()
      : children;

  return (
    <Tag
      title={name}
      className={classNames('spaces-hook-link', className, `spaces-${linkStyle}-link`, {
        'p-2': linkStyle === 'default',
      })}
      {...rest}
      style={{ ...style }}
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
              <Media body id={`${type}-${id}`} className="text-dark">
                <TitleTag
                  id={`app-title-${id}`}
                  tag="h4"
                  className={classNames('h5', {
                    'mb-0': !showDescription || !description,
                    'pt-3': stacked,
                    'text-center': stacked,
                  })}
                  tabIndex={0}
                  style={{
                    cursor: link?.url ? 'pointer' : 'not-allowed',
                  }}
                  {...props}
                  aria-label={name}
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
                  >
                    <ReactMarkdown
                      // TODO: just rendering text, do we need markdown component?
                      className="Card-text"
                      source={
                        maxDescriptionLength && description.length > maxDescriptionLength
                          ? truncate(description, {
                              length: maxDescriptionLength,
                              separator: ' ',
                            })
                          : description
                      }
                    />
                  </TextTag>
                )}
              </Media>
            )}
        {!stacked && dateInfo}
      </BodyTag>
    </Tag>
  );
};

Link.propTypes = {
  spaceId: PropTypes.string,
  space: PropTypes.object,
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  bodyTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  titleTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  textTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
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
};

Link.defaultProps = {
  linkStyle: 'default',
  body: true,
};

export default Link;

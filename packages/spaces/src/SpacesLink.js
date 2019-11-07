import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import clone from 'lodash.clone';
import take from 'lodash.take';
import truncate from 'lodash.truncate';
import words from 'lodash.words';
import ReactMarkdown from 'react-markdown';
import { FavoriteHeart } from '@availity/favorites';
import { Card, CardBody, Media, CardText, CardTitle, Badge } from 'reactstrap';
import ListGroupItem from '@availity/list-group-item';
import dayjs from 'dayjs';
import AppIcon from '@availity/app-icon';
import Icon from '@availity/icon';
import { useSpacesContext } from './Spaces';
import { isFunction } from './helpers';
import useLink from './useLink';
import IconTiles from './Tiles';
import Loader, { skeletonPropType } from './Loader';

export const generateShortName = name =>
  toString(
    take(words(name.replace(/[^A-Za-z0-9 ]/g, '')), 2).map(word =>
      truncate(word, { length: 1, omission: '' })
    )
  ).replace(/,/g, '');

const isNew = activeDate => dayjs().diff(activeDate, 'day') < 30;
const getDisplayDate = date => dayjs(date).format('MM/DD/YYYY');

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
  linkStyle,
  size,
  loading: propsLoading,
  clientId: propsClientId,
  maxDescriptionLength,
  style,
  skeletonProps,
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
      parents,
      metadata,
      description,
      activeDate,
      icons = {},
      images = {},
      colors = {},
      link,
      ...restLink
    } = {},
    props = {},
  ] = useLink(propSpace || spaceId, {
    clientId: propsClientId,
  });

  const getIconTitle = useCallback(() => {
    if (shortName) return shortName;

    // We have to pass `name` as `className` bc of how its stored in spaces
    if (icons.navigation) return <Icon className={icons.navigation} />;

    return <Icon name="desktop" />;
  }, [icons.navigation, shortName]);

  const appIcon = useMemo(() => {
    if (!showAppIcon) return null;

    if (parents && parents.length > 1) {
      return (
        <IconTiles
          parents={clone(parents)}
          stacked={stacked}
          className="mx-2"
        />
      );
    }

    if (parents && parents.length === 1) {
      return (
        <img
          className="align-baseline mx-2"
          style={{ maxWidth: 45 }}
          src={parents[0].images.tile}
          alt="tile"
        />
      );
    }

    return (
      <AppIcon
        className={classNames(
          'd-table-cell align-middle mx-2',
          icons.navigation
        )}
        style={{
          top: showDescription && description ? -5 : 0,
        }}
        size={size}
      >
        {getIconTitle()}
      </AppIcon>
    );
  }, [
    description,
    getIconTitle,
    icons.navigation,
    parents,
    showAppIcon,
    showDescription,
    size,
    stacked,
  ]);

  const favoriteIcon = useMemo(
    () =>
      id &&
      favorite && (
        <span className={classNames("d-table-cell align-middle",{
          'pr-2': !showAppIcon
        })}>
          <FavoriteHeart id={id} onChange={(_, e) => e.stopPropagation()} />
        </span>
      ),
    [favorite, id, showAppIcon]
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
          {showNew && isNew(activeDate) && <Badge tabIndex={0}>New!</Badge>}
          {showDate && <small>{getDisplayDate(activeDate)}</small>}
        </div>
      ),
    [activeDate, showDate, showNew, stacked]
  );

  if (isLoading)
    return (
      <Loader
        data-testid={`space-${linkStyle}-${spaceId}-loading`}
        skeletonProps={skeletonProps}
        {...rest}
      />
    );

  Tag = getContainerTag(Tag, linkStyle);
  BodyTag = getBodyTag(BodyTag, linkStyle);

  const renderChildren = () =>
    isFunction(children)
      ? (() =>
          children({
            id,
            name,
            shortName,
            type,
            parents,
            metadata,
            description,
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
      className={classNames(
        'spaces-hook-link',
        className,
        `spaces-${linkStyle}-link`,
        {
          'p-2': linkStyle === 'default',
        }
      )}
      tabIndex={0}
      style={{
        ...style,
        cursor: link.url ? 'pointer' : 'not-allowed',
      }}
      {...props}
      {...rest}
      aria-label={name}
    >
      <BodyTag
        className={classNames('d-flex',`align-items-${!showDescription || stacked ? 'center':'start'}`, {
          'flex-column': stacked,
        })}
      >
        {!stacked && favoriteIcon}
        {appIcon}
        {icon && <Icon name={icons.navigation} />}
        {children
          ? renderChildren()
          : body && (
              <Media body id={`application-${spaceId}`} className="text-dark">
                <CardTitle
                  id={`app-title-${spaceId}`}
                  tag="h4"
                  className={classNames('h5 mb-0', {
                    'mb-0': !showDescription,
                    'pt-3': stacked,
                  })}
                >
                  {name}
                </CardTitle>
                {stacked && dateInfo}
                {showDescription && description && (
                  <CardText className="mt-1">
                    <ReactMarkdown
                      className="Card-text"
                      source={
                        maxDescriptionLength &&
                        description.length > maxDescriptionLength
                          ? truncate(description, {
                              length: maxDescriptionLength,
                              separator: ' ',
                            })
                          : description
                      }
                    />
                  </CardText>
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
};

Link.defaultProps = {
  linkStyle: 'default',
  body: true,
};

export default Link;

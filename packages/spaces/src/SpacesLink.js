import React from 'react';
import PropTypes from 'prop-types';
import nativeForm from '@availity/native-form';
import { FavoriteHeart } from '@availity/favorites';
import { Card, CardBody, Media, CardText, CardTitle, Badge } from 'reactstrap';
import dayjs from 'dayjs';
import AppIcon from '@availity/app-icon';
import Icon from '@availity/icon';
import { useSpaces, useSpacesContext } from './Spaces';
import { updateUrl, updateTopApps, isFunction } from './helpers';
import { useModal } from './modals/ModalProvider';
import Tiles from './Tiles';

// export const generateShortName = name =>
//   toString(
//     map(take(words(name.replace(/[^A-Za-z0-9 ]/g, '')), 2), word => truncate(word, { length: 1, omission: '' }))
//   ).replace(/,/g, '');

export const useLink = spaceId => {
  const { clientId } = useSpacesContext();
  const openModal = useModal();

  const [
    {
      id,
      type,
      name,
      description,
      parents = [],
      metadata = {},
      link,
      ...space
    } = {},
  ] = useSpaces(spaceId);

  const parentPayerSpaces = parents.filter(p => p.type === 'space');

  // TODO Abstract this
  const legacySso = () => {
    openModal('DISCLAIMER_MODAL', {
      disclaimerId: metadata.disclaimerId,
      name,
      spaceType: type,
      id,
      title: name,
      description,
      link,
    });
  };

  const linkSso = event => {
    if (metadata && metadata.ssoId) {
      event.preventDefault();
      const options = link.target ? { target: link.target } : undefined;

      const attributes = {
        X_Client_ID: clientId,
        X_XSRF_TOKEN: document.cookie.replace(
          /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
          '$1'
        ),
        spaceId,
      };

      updateTopApps(id, type);

      nativeForm(metadata.ssoId, attributes, options);
      return false;
    }
    return false;
  };

  const openMultiPayerModal = () =>
    openModal('MULTI_PAYER_MODAL', {
      title: 'Open Link as Payer',
      name,
      parentPayerSpaces,
      link,
      id,
      spaceType: type,
      metadata,
    });

  const openLink = () => {
    updateTopApps(id, type);
    window.open(
      link.url[0] === '/' ? updateUrl(link.url, 'spaceId', spaceId) : link.url,
      link.target
    );
  };

  const mediaProps = {
    role: 'link',
  };

  if (metadata.ssoId) {
    mediaProps.onClick = linkSso;
    mediaProps.onKeyPress = e => e.charCode === 13 && linkSso(e);
  } else if (metadata.disclaimerId) {
    mediaProps.onClick = legacySso;
    mediaProps.onKeyPress = e => e.charCode === 13 && legacySso(e);
  } else if (parentPayerSpaces.length > 1) {
    mediaProps.onClick = openMultiPayerModal;
    mediaProps.onKeyPress = e => e.charCode === 13 && openMultiPayerModal(e);
  } else {
    mediaProps.onClick = openLink;
    mediaProps.onKeyPress = e => e.charCode === 13 && openLink(e);
  }

  return [
    {
      ...space,
      name,
      description,
      metadata,
      link,
      parents: parentPayerSpaces,
    },
    mediaProps,
  ];
};
const isNew = activeDate => dayjs().diff(activeDate, 'day') < 30;
const getDisplayDate = date => dayjs(date).format('MM/DD/YYYY');

const Link = ({
  spaceId,
  children,
  appIcon,
  favorite,
  icon,
  showNew,
  showDate,
  stacked,
  body,
  showDescription,
  tag: Tag,
  card,
  size,
  ...rest
}) => {
  const { loading } = useSpacesContext();
  const [
    {
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
      ...restLink
    } = {},
    props = {},
  ] = useLink(spaceId);
  if (loading) return null;

  const getIconTitle = () => {
    if (shortName) return shortName;

    // We have to pass `name` as `className` bc of how its stored in spaces
    if (icons.navigation) return <Icon className={icons.navigation} />;

    return <Icon name="desktop" />;
  };

  const getAppIcon = () => {
    if (parents && parents.length > 1) {
      return <Tiles parents={parents} stacked={stacked} className="mx-2" />;
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
        className={`d-table-cell align-middle mx-2 ${icons.navigation}`}
        size={size}
      >
        {getIconTitle()}
      </AppIcon>
    );
  };

  Tag = card ? Card : Tag;
  const BodyTag = card ? CardBody : 'div';

  const renderChildren = () =>
    isFunction(children)
      ? (() =>
          children({
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
      className={`mb-4 application spaces-hook-link hoverable ${
        card ? '' : 'p-2'
      }`}
      tabIndex={0}
      {...props}
      {...rest}
      aria-label={name}
    >
      <BodyTag
        className={`card-block d-flex ${
          stacked ? 'flex-column' : ''
        } align-items-${showDescription ? 'start' : 'center'} p-2`}
      >
        {favorite && (
          <span className="d-table-cell align-middle pr-2">
            <FavoriteHeart
              id={spaceId}
              onChange={(_, e) => e.stopPropagation()}
            />
          </span>
        )}
        {appIcon && getAppIcon()}
        {icon && <Icon name={icons.navigation} />}
        {children
          ? renderChildren()
          : body && (
              <Media body id={`application-${spaceId}`} className="text-dark">
                <CardTitle
                  id={`app-title-${spaceId}`}
                  tag="h4"
                  className="h5 mb-0"
                >
                  {name}
                </CardTitle>
                {showDescription && <CardText>{description}</CardText>}
              </Media>
            )}
        {showNew || showDate ? (
          <Media right>
            {showNew && isNew(activeDate) && <Badge tabIndex={0}>New!</Badge>}
            {showDate && <small>{getDisplayDate(activeDate)}</small>}
          </Media>
        ) : null}
      </BodyTag>
    </Tag>
  );
};

Link.propTypes = {
  spaceId: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  bordered: PropTypes.bool,
  icon: PropTypes.bool,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isNew: PropTypes.bool,
  card: PropTypes.bool,
  appIcon: PropTypes.bool,
  favorite: PropTypes.bool,
  body: PropTypes.bool,
  showDate: PropTypes.bool,
  showNew: PropTypes.bool,
  size: PropTypes.string,
  stacked: PropTypes.bool,
  allowFavorite: PropTypes.bool,
  showDescription: PropTypes.bool,
};

Link.defaultProps = {
  tag: 'div',
  showDescription: false,
};

export default Link;

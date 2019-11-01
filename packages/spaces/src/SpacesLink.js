import React from 'react';
import PropTypes from 'prop-types';
import nativeForm from '@availity/native-form';
import { Card, CardLink, CardBody, Media, CardText, CardTitle, Badge } from 'reactstrap';
import dayjs from 'dayjs';
import AppIcon from '@availity/app-icon';
import Icon from '@availity/icon';
import { useSpaces, useSpacesContext } from './Spaces';
import { updateUrl, updateTopApps } from './helpers';
import { useModal } from './modals/ModalProvider';

export const useLink = spaceId => {
  const { clientId } = useSpacesContext();
  const openModal = useModal();

  const [{ id, type, name, description, parents = [], metadata = {}, link, ...space } = {}] = useSpaces(spaceId);

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
        X_XSRF_TOKEN: document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1'),
        spaceId,
      };

      updateTopApps(id, type);

      nativeForm(metadata.ssoId, attributes, options);
      return false;
    }
    return false;
  };

  const mediaProps = {};

  if (metadata.ssoId) {
    mediaProps.onClick = linkSso;
  } else if (metadata.disclaimerId) {
    mediaProps.onClick = legacySso;
  } else if (parentPayerSpaces.length > 1) {
    mediaProps.onClick = () => {
      openModal('MULTI_PAYER_MODAL', {
        title: 'Open Link as Payer',
        name,
        parentPayerSpaces,
        link,
        id,
        spaceType: type,
        metadata,
      });
    };
  } else {
    mediaProps.onClick = () => {
      updateTopApps(id, type);
      window.open(link.url[0] === '/' ? updateUrl(link.url, 'spaceId', spaceId) : link.url, link.target);
    };
  }

  return [
    {
      ...space,
      name,
      description,
      metadata,
      link,
    },
    mediaProps,
  ];
};

const Link = ({ spaceId, children, ...rest }) => {
  const { loading } = useSpacesContext();
  const [{ name, parents, metadata, description, activeDate } = {}, props = {}] = useLink(spaceId);
  if(loading) return null;

  const isNew = activeDate => dayjs().diff(activeDate,'day') < 30
  return (
    <Card title={name} className="mb-4 application" tabIndex={0} tag={CardLink} {...props} {...rest} aria-label={name}>
      <CardBody className="card-block d-flex">
        <span className="d-table-cell align-middle pr-2">
          {/* <FavoriteHeart id={id} onChange={(_, e) => e.stopPropagation()} /> */}
        </span>
        <AppIcon className="d-table-cell align-middle mr-2">AI</AppIcon>
        <Media body id={`application-${spaceId}`} className="text-dark mb-4">
          <CardTitle id={`app-title-${spaceId}`} tag="h4" className="h5">
            {name}
          </CardTitle>
          <CardText>{description}</CardText>
        </Media>
        {isNew(activeDate) && (
          <Media right>
            <Badge tabIndex={0}>New!</Badge>
          </Media>
        )}
      </CardBody>
    </Card>
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
  showDate: PropTypes.bool,
  stacked: PropTypes.bool,
  allowFavorite: PropTypes.bool,
};

Link.defeaultProps = {
  tag: 'span',
};

export default Link;

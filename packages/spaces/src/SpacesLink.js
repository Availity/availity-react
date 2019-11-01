import React from 'react';
import PropTypes from 'prop-types';
import nativeForm from '@availity/native-form';
import { useSpaces, useSpacesContext } from './Spaces';
import { updateUrl, updateTopApps } from './helpers';
import { useModal } from './modals/ModalProvider';

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
      window.open(
        link.url[0] === '/'
          ? updateUrl(link.url, 'spaceId', spaceId)
          : link.url,
        link.target
      );
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

const Link = ({ spaceId, children }) => {
  const [space, props = {}] = useLink(spaceId);

  return <span {...props}>{space && space.name ? space.name : children}</span>;
};

Link.propTypes = {
  spaceId: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Link.defeaultProps = {
  tag: 'span',
};

export default Link;

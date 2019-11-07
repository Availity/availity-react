import nativeForm from '@availity/native-form';

import { useSpaces, useSpacesContext } from './Spaces';
import { updateUrl, updateTopApps } from './helpers';
import { useModal } from './modals/ModalProvider';

export default (spaceOrSpaceId, { clientId: propsClientId } = {}) => {
  const { clientId = propsClientId } = useSpacesContext() || {};
  const openModal = useModal();

  const [spaceFromSpacesProvider] = useSpaces(spaceOrSpaceId);

  const {
    metadata = {},
    parents = [],
    name,
    type,
    id,
    description,
    link = {},
    ...space
  } =
    spaceFromSpacesProvider ||
    (typeof spaceOrSpaceId === 'object' ? spaceOrSpaceId : {});

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
        spaceId: id,
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
      link.url[0] === '/' ? updateUrl(link.url, 'spaceId', id) : link.url,
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
      id,
      name,
      description,
      metadata,
      link,
      parents: parentPayerSpaces,
    },
    mediaProps,
  ];
};

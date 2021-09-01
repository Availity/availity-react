import nativeForm from '@availity/native-form';
import { getUrl, getTarget } from '@availity/link/Link';
import { isAbsoluteUrl } from '@availity/resolve-url';
import { useSpaces, useSpacesContext } from './Spaces';
import { updateUrl, updateTopApps } from './helpers';
import { useModal } from './modals/ModalProvider';

export default (
  spaceOrSpaceId,
  { clientId: propsClientId, linkAttributes = {} } = {}
) => {
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

  const parentPayerSpaces = parents.filter(
    p =>
      p.type &&
      (p.type.toLowerCase() === 'space' ||
        p.type.toLowerCase() === 'payerspace') // no world stuff
  );

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

  const linkSso = async event => {
    if (metadata && metadata.ssoId) {
      event.preventDefault();
      const options = link.target ? { target: link.target } : undefined;

      const attributes = {
        X_Client_ID: clientId,
        X_XSRF_TOKEN: document.cookie.replace(
          /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
          '$1'
        ),
        spaceId: parents && parents[0] ? parents[0].id : linkAttributes.spaceId,
        ...linkAttributes,
      };

      updateTopApps(id, type);

      await nativeForm(metadata.ssoId, attributes, options, type);
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
    if (!link.url) {
      return;
    }

    updateTopApps(id, type);
    const target = getTarget(link.target);
    window.open(
      !isAbsoluteUrl(link.url)
        ? getUrl(
            updateUrl(
              link.url,
              'spaceId',
              parents && parents[0] ? parents[0].id : linkAttributes.spaceId
            ),
            false,
            false,
            target
          )
        : link.url,
      target
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

import { useCurrentUser } from '@availity/hooks';
import { useSpaces, useSpacesContext } from './Spaces';
import { useModal } from './modals/ModalProvider';
import { openLink, linkSso } from './linkHandlers';

export default (spaceOrSpaceId, { clientId: propsClientId, linkAttributes = {} } = {}) => {
  const { clientId = propsClientId } = useSpacesContext() || {};

  const [spaceFromSpacesProvider] = useSpaces(spaceOrSpaceId);

  const { data: user } = useCurrentUser();

  const openModal = useModal();

  const space = spaceFromSpacesProvider || (typeof spaceOrSpaceId === 'object' ? spaceOrSpaceId : {});

  const { metadata = {}, parents = [], name, type, configurationId, description, link = {} } = space;

  const parentPayerSpaces = parents.filter(
    (p) => p.type && (p.type.toLowerCase() === 'space' || p.type.toLowerCase() === 'payerspace') // no world stuff
  );

  const legacySso = () => {
    openModal('DISCLAIMER_MODAL', {
      disclaimerId: metadata.disclaimerId,
      name,
      spaceType: type,
      id: configurationId,
      title: name,
      description,
      link,
      user: user.akaname,
    });
  };

  const openMultiPayerModal = () =>
    openModal('MULTI_PAYER_MODAL', {
      title: 'Open Link as Payer',
      name,
      parentPayerSpaces,
      link,
      id: configurationId,
      spaceType: type,
      metadata,
      user: user.akaname,
    });

  const mediaProps = {
    // FIXME: there was some accessibility bug here, missing prop?
    role: 'link',
  };

  if (metadata?.ssoId) {
    mediaProps.onClick = (event) => linkSso(space, { event, akaname: user.akaname, clientId, linkAttributes });
    mediaProps.onKeyPress = (event) =>
      event.charCode === 13 && linkSso(space, { event, akaname: user.akaname, clientId, linkAttributes });
  } else if (metadata?.disclaimerId) {
    mediaProps.onClick = legacySso;
    mediaProps.onKeyPress = (e) => e.charCode === 13 && legacySso(e);
  } else if (parentPayerSpaces.length > 1) {
    mediaProps.onClick = openMultiPayerModal;
    mediaProps.onKeyPress = (e) => e.charCode === 13 && openMultiPayerModal(e);
  } else {
    mediaProps.onClick = () => openLink(space, { akaname: user.akaname, linkAttributes });
    mediaProps.onKeyPress = (e) => e.charCode === 13 && openLink(space, { akaname: user.akaname, linkAttributes });
  }

  return [
    {
      ...space,
      type,
      configurationId,
      name,
      description,
      metadata,
      link,
    },
    mediaProps,
  ];
};

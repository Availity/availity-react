import nativeForm from '@availity/native-form';
import { getUrl, getTarget } from '@availity/link';
import { isAbsoluteUrl } from '@availity/resolve-url';
import { useCurrentUser } from '@availity/hooks';
import { useSpaces, useSpacesContext } from './Spaces';
import { updateTopApps, updateUrl } from './helpers';
import { useModal } from './modals/ModalProvider';

export default (spaceOrSpaceId, { clientId: propsClientId, linkAttributes = {} } = {}) => {
  const { clientId = propsClientId } = useSpacesContext() || {};

  const [spaceFromSpacesProvider] = useSpaces(spaceOrSpaceId);

  const { data: user } = useCurrentUser();

  const openModal = useModal();

  const {
    metadata = {},
    parents = [],
    name,
    type,
    configurationId,
    description,
    link = {},
    ...space
  } = spaceFromSpacesProvider || (typeof spaceOrSpaceId === 'object' ? spaceOrSpaceId : {});

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

  const linkSso = async (event) => {
    if (metadata && metadata.ssoId) {
      event.preventDefault();

      const options = link.target ? { target: getTarget(link.target) } : undefined;

      const attributes = {
        X_Client_ID: clientId,
        X_XSRF_TOKEN: document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1'),
        // TODO: this attribute gets set on the html form, does it ever make it to magneto? what is it used for?
        // seems to have logging implications
        // spaceId: parents && parents[0] ? parents[0].id : linkAttributes.spaceId,
        spaceId: linkAttributes.spaceId,
        ...linkAttributes,
      };

      try {
        await updateTopApps(configurationId, type, user.akaname);
        await nativeForm(metadata.ssoId, attributes, options, type);
      } catch {
        // eslint-disable-next-line no-console
        console.warn('Something went wrong');
      }

      return false;
    }
    return false;
  };

  const openLink = async () => {
    if (!link.url) {
      return;
    }

    await updateTopApps(configurationId, type, user.akaname);

    const target = getTarget(link.target);
    const url = !isAbsoluteUrl(link.url)
      ? getUrl(
          updateUrl(
            link.url,
            'spaceId',
            space.parents && space.parents[0] ? space.parents[0].id : linkAttributes.spaceId
          ),
          false,
          false
        )
      : link.url;
    window.open(url, target);
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
    mediaProps.onClick = linkSso;
    mediaProps.onKeyPress = (e) => e.charCode === 13 && linkSso(e);
  } else if (metadata?.disclaimerId) {
    mediaProps.onClick = legacySso;
    mediaProps.onKeyPress = (e) => e.charCode === 13 && legacySso(e);
  } else if (parentPayerSpaces.length > 1) {
    mediaProps.onClick = openMultiPayerModal;
    mediaProps.onKeyPress = (e) => e.charCode === 13 && openMultiPayerModal(e);
  } else {
    mediaProps.onClick = openLink;
    mediaProps.onKeyPress = (e) => e.charCode === 13 && openLink(e);
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

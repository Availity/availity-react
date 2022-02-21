import nativeForm from '@availity/native-form';
import { getUrl, getTarget } from '@availity/link';
import { useSpaces, useSpacesContext } from './Spaces';
// import { updateTopApps } from './helpers';

export default (spaceOrSpaceId, { clientId: propsClientId, linkAttributes = {} } = {}) => {
  const { clientId = propsClientId } = useSpacesContext() || {};

  const [spaceFromSpacesProvider] = useSpaces(spaceOrSpaceId);

  const {
    metadata = {},
    name,
    type,
    id,
    description,
    link = {},
    ...space
  } = spaceFromSpacesProvider || (typeof spaceOrSpaceId === 'object' ? spaceOrSpaceId : {});

  const legacySso = () => {
    // redirect to disclaimers ui
    // TODO: update ui to accommodate flows where only disclaimer is needed
    window.open(`/web/spc/disclaimers/#/?spaceId=${id}&ssoText=${metadata.disclaimerId}`, '_self');
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
        // await updateTopApps(id, type);
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

    // await updateTopApps(id, type);

    const target = getTarget(link.target);
    const url = getUrl(link.url);
    window.open(url, target);
  };

  const mediaProps = {
    // FIXME: there was some accessibility bug here, missing prop?
    role: 'link',
  };

  if (metadata.ssoId) {
    mediaProps.onClick = linkSso;
    mediaProps.onKeyPress = (e) => e.charCode === 13 && linkSso(e);
  } else if (metadata.disclaimerId) {
    mediaProps.onClick = legacySso;
    mediaProps.onKeyPress = (e) => e.charCode === 13 && legacySso(e);
  } else {
    mediaProps.onClick = openLink;
    mediaProps.onKeyPress = (e) => e.charCode === 13 && openLink(e);
  }

  return [
    {
      ...space,
      id,
      name,
      description,
      metadata,
      link,
    },
    mediaProps,
  ];
};

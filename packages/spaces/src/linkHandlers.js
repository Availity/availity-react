import { getUrl, getTarget } from '@availity/link';
import nativeForm from '@availity/native-form';
import { isAbsoluteUrl } from '@availity/resolve-url';
import { updateTopApps, updateUrl } from './helpers';

export const openLink = async (space, { akaname, payerSpaceId }) => {
  if (!space?.link?.url) {
    return;
  }

  await updateTopApps(space, akaname);

  const target = getTarget(space.link.target);
  const url = !isAbsoluteUrl(space.link.url)
    ? getUrl(
        updateUrl(space.link.url, 'spaceId', space.parents && space.parents[0] ? space.parents[0].id : payerSpaceId),
        false,
        false
      )
    : space.link.url;

  window.open(url, target);
};

export const openLinkWithSso = async (space, { akaname, clientId, payerSpaceId, ssoParams }) => {
  if (space.metadata && space.metadata.ssoId) {
    const options = space.link?.target ? { target: getTarget(space.link.target) } : undefined;

    const attributes = {
      X_Client_ID: clientId,
      X_XSRF_TOKEN: document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1'),
      spaceId: payerSpaceId, // required by Magneto
      ...ssoParams,
    };

    try {
      await updateTopApps(space, akaname);
      await nativeForm(space.metadata.ssoId, attributes, options, space.type);
    } catch {
      // eslint-disable-next-line no-console
      console.warn('Something went wrong');
    }

    return false;
  }
  return false;
};

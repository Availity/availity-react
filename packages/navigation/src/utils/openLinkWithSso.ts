/* eslint-disable import/prefer-default-export */
import nativeForm from '@availity/native-form';
import { Configuration } from '../../types/thanos-types';
import { updateTopApps } from './updateTopApps';

export const openLinkWithSso = async (
  configuration: Configuration,
  {
    akaname,
    clientId,
    payerSpaceId,
    ssoParams,
  }: {
    akaname: string;
    clientId: string;
    payerSpaceId?: string;
    ssoParams?: Record<string, string>;
  }
) => {
  const { meta, link } = configuration;
  if (meta?.ssoId) {
    const params = {
      X_Client_ID: clientId,
      X_XSRF_TOKEN: document.cookie.replace(
        /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      ),
      spaceId: payerSpaceId,
      ...ssoParams,
    };

    const target = link?.target;
    const formAttributes = target ? { target } : undefined;

    try {
      await updateTopApps(configuration, akaname);
      await nativeForm(meta.ssoId, params, formAttributes);
    } catch {
      // eslint-disable-next-line no-console
      console.warn('Something went wrong');
    }

    return false;
  }
  return false;
};

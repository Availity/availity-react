import React, { useState, useEffect, ImgHTMLAttributes } from 'react';
import { avWebQLApi } from '@availity/api-axios';
import get from 'lodash/get';

const spaceIDQuery = `
query configurationFindById($id: ID!){
  configurationFindOne(id: $id){
    ...on PayerSpace{
      images{
        tile
        logo
        billboard
      }
    }
  }
}
`;

const payerIDQuery = `
query configurationFindMany($payerIDs: [ID!], $types: [TypeEnum!]){
  configurationPagination(filter: { payerIds: $payerIDs, types: $types }){
    items {
      ...on PayerSpace {
        images{
          tile
          logo
          billboard
        }
      }
    }
  }
}
`;

const fetchLogo = async (
  query: string,
  variables: Record<string, unknown>,
  path: string,
  clientId: string
): Promise<string | undefined> => {
  const response = await avWebQLApi.create(
    { query, variables },
    { headers: { 'X-Client-ID': clientId } }
  );

  return get((response as { data: { data: unknown } }).data.data, path);
};

export const getLogo = async (
  spaceId?: string | null,
  payerId?: string | null,
  clientId?: string
): Promise<string | undefined> => {
  if (!clientId) {
    throw new Error('clientId is required');
  }

  try {
    let url: string | undefined;

    if (spaceId) {
      const variables = { id: spaceId };
      url = await fetchLogo(spaceIDQuery, variables, 'configurationFindOne.images.logo', clientId);
    } else if (payerId) {
      const variables = { payerIDs: [payerId], types: ['space'] };
      url = await fetchLogo(payerIDQuery, variables, 'configurationPagination.items[0].images.logo', clientId);

      if (!url) {
        // eslint-disable-next-line unicorn/prefer-string-replace-all
        url = `/public/apps/eligibility/images/value-add-logos/${payerId.replace(/\s/g, '')}.gif`;
      }
    }

    return url;
  } catch {
    return undefined;
  }
};

export interface PayerLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Client ID to use to fetch the payer's logo. */
  clientId: string;
  /** Required if `payerId` is not provided. The payer spaces ID for the payer for which you want a logo. */
  spaceId?: string;
  /** Required if `spaceId` is not provided. The payer ID for the payer for which you want a logo. */
  payerId?: string;
}

const PayerLogo = ({ spaceId, payerId, clientId, ...props }: PayerLogoProps) => {
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const logoUrl = await getLogo(spaceId, payerId, clientId);
      if (!cancelled) setUrl(logoUrl);
    })();

    return () => { cancelled = true; };
  }, [spaceId, payerId, clientId]);

  if (!clientId || (!payerId && !spaceId)) return null;

  return <img src={url} alt="Payer logo" {...props} />;
};

export default PayerLogo;

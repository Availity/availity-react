import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffectAsync } from '@availity/hooks';
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

const fetchLogo = async (query, variables, path, clientId) => {
  try {
    const {
      data: { data },
    } = await avWebQLApi.create(
      {
        query,
        variables,
      },
      { headers: { 'X-Client-ID': clientId } }
    );

    return get(data, path);
  } catch (error) {
    return error;
  }
};

export const getLogo = async (spaceId, payerId, clientId) => {
  if (!clientId) {
    throw new Error('clientId is required');
  }

  try {
    let url;
    if (spaceId) {
      const variables = { id: spaceId };
      const path = 'configurationFindOne.images.logo';
      url = await fetchLogo(spaceIDQuery, variables, path, clientId);
    } else if (payerId) {
      const variables = { payerIDs: [payerId], types: ['space'] };
      const path = 'configurationPagination.items[0].images.logo';
      url = await fetchLogo(payerIDQuery, variables, path, clientId);

      // We can probably remove this at some point once our spaces data is complete
      if (!url) {
        url = `/public/apps/eligibility/images/value-add-logos/${payerId.replace(/\s/g, '')}.gif`;
      }
    }

    return url;
  } catch (error) {
    return error;
  }
};

const PayerLogo = ({ spaceId, payerId, clientId, ...props }) => {
  const [url, setUrl] = useState(null);

  useEffectAsync(async () => {
    const _url = await getLogo(spaceId, payerId, clientId);
    setUrl(_url);
  }, [spaceId, payerId, clientId]);

  if (!clientId || (!payerId && !spaceId)) return null;

  return <img src={url} alt="Payer logo" {...props} />;
};

PayerLogo.propTypes = {
  /** Client ID to use to fetch the payer's logo. */
  clientId: PropTypes.string.isRequired,
  /** Required if `payerId` is not provided. The payer spaces ID for the payer for which you want a logo. */
  spaceId: PropTypes.string,
  /** Required if `spaceId` is not provided. The payer ID for the payer for which you want a logo. */
  payerId: PropTypes.string,
};

export default PayerLogo;

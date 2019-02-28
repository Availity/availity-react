import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import { avSlotMachineApi } from '@availity/api-axios';
import { useEffectAsync } from '@availity/hooks';
import get from 'lodash.get';

const spaceIDQuery = `
query($id: ID!){
  space(id: $id){
    images{
      name
      value
    }
  }
}
`;

const payerIDQuery = `
query($payerIDs: [String!], $types: [String!]){
  spaces(payerIDs: $payerIDs, types: $types){
    spaces{
      images{
        name
        value
      }
    }
  }
}
`;

const fetchLogo = async (query, variables, path, clientId) => {
  try {
    const {
      data: { data },
    } = await avSlotMachineApi.create(
      {
        query,
        variables,
      },
      { headers: { 'X-Client-ID': clientId } }
    );

    const images = get(data, path, []).reduce((accum, { name, value }) => {
      accum[name] = value;
      return accum;
    }, {});

    return images.logo;
  } catch (error) {
    return error;
  }
};

const getLogo = async (spaceId, payerId, clientId) => {
  try {
    if (!clientId) {
      throw new Error('clientId is required');
    }

    let url;
    if (spaceId) {
      const variables = { id: spaceId };
      const path = 'space.images';
      url = await fetchLogo(spaceIDQuery, variables, path, clientId);
    } else if (payerId) {
      const variables = { payerIDs: [payerId], types: ['space'] };
      const path = 'spaces.spaces[0].images';
      url = await fetchLogo(payerIDQuery, variables, path, clientId);

      // We can probably remove this at some point once our spaces data is complete
      if (!url) {
        url = `/public/apps/eligibility/images/value-add-logos/${payerId.replace(
          /\s/g,
          ''
        )}.gif`;
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
    act(() => setUrl(_url));
  }, [spaceId, payerId, clientId]);

  if (!clientId || (!payerId && !spaceId)) return null;

  return <img src={url} alt="Payer logo" {...props} />;
};

PayerLogo.propTypes = {
  spaceId: PropTypes.string,
  payerId: PropTypes.string,
  clientId: PropTypes.string.isRequired,
};

export default PayerLogo;

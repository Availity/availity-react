import React, { useState } from 'react';
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

const fetchLogo = async (query, variables, path) => {
  try {
    const {
      data: { data },
    } = await avSlotMachineApi.create({
      query,
      variables,
    });

    const images = get(data, path, []).reduce((accum, { name, value }) => {
      accum[name] = value;
      return accum;
    }, {});

    return images.logo;
  } catch (error) {
    return error;
  }
};

const getLogo = async (spaceId, payerId) => {
  try {
    let url;
    if (spaceId) {
      const variables = { id: spaceId };
      const path = 'space.images';
      url = await fetchLogo(spaceIDQuery, variables, path);
    } else if (payerId) {
      const variables = { payerIDs: [payerId], types: ['space'] };
      const path = 'spaces.spaces[0].images';
      url = await fetchLogo(payerIDQuery, variables, path);

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

const PayerLogo = ({ spaceId, payerId, ...props }) => {
  const [url, setUrl] = useState(null);

  useEffectAsync(async () => {
    const _url = await getLogo(spaceId, payerId);
    setUrl(_url);
  }, [spaceId, payerId]);

  if (!payerId && !spaceId) return null;

  return <img src={url} alt="Payer logo" {...props} />;
};

PayerLogo.propTypes = {
  spaceId: PropTypes.string,
  payerId: PropTypes.string,
};

export default PayerLogo;

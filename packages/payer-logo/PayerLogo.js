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

const getLogoBySpaceId = async spaceId =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: {
          data: { space },
        },
      } = await avSlotMachineApi.create({
        query: spaceIDQuery,
        variables: { id: spaceId },
      });

      const images = get(space, 'images', []).reduce(
        (accum, { name, value }) => {
          accum[name] = value;
          return accum;
        },
        {}
      );

      return resolve(images.logo);
    } catch (error) {
      return reject(error);
    }
  });

const getLogoByPayerId = async payerId =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: {
          data: { spaces },
        },
      } = await avSlotMachineApi.create({
        query: payerIDQuery,
        variables: { payerIDs: [payerId], types: ['space'] },
      });

      const images = get(spaces, '[0].images', []).reduce(
        (accum, { name, value }) => {
          accum[name] = value;
          return accum;
        },
        {}
      );

      return resolve(images.logo);
    } catch (error) {
      return reject(error);
    }
  });

const getLogo = (spaceId, payerId) =>
  new Promise(async (resolve, reject) => {
    try {
      let url;
      if (spaceId) {
        url = await getLogoBySpaceId(spaceId);
      } else if (payerId) {
        url = await getLogoByPayerId(payerId);
        // We can probably remove this at some point once our spaces data is complete
        if (!url) {
          url = `/public/apps/eligibility/images/value-add-logos/${payerId.replace(
            /\s/g,
            ''
          )}.gif`;
        }
      }
      return resolve(url);
    } catch (error) {
      return reject(error);
    }
  });

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

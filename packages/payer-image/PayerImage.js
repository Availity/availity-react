import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffectAsync } from '@availity/hooks';
import { avSlotMachineApi } from '@availity/api-axios';
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

const fetchImage = async (query, variables, path, clientId, imageType) => {
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

    return images[imageType];
  } catch (error) {
    return error;
  }
};

const getImage = async (spaceId, payerId, clientId, imageType) => {
  try {
    if (!clientId) {
      throw new Error('clientId is required');
    }

    let url;
    if (spaceId) {
      const variables = { id: spaceId };
      const path = 'space.images';
      url = await fetchImage(
        spaceIDQuery,
        variables,
        path,
        clientId,
        imageType
      );
    } else if (payerId) {
      const variables = { payerIDs: [payerId], types: ['space'] };
      const path = 'spaces.spaces[0].images';
      url = await fetchImage(
        payerIDQuery,
        variables,
        path,
        clientId,
        imageType
      );

      // We can probably remove this at some point once our spaces data is complete
      if (!url && imageType === 'logo') {
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

const PayerImage = ({ spaceId, payerId, clientId, imageType, ...props }) => {
  const [url, setUrl] = useState(null);

  useEffectAsync(async () => {
    const _url = await getImage(spaceId, payerId, clientId, imageType);
    setUrl(_url);
  }, [spaceId, payerId, clientId, imageType]);

  if (!clientId || (!payerId && !spaceId)) return null;

  return <img src={url} alt={`Payer ${imageType}`} {...props} />;
};

PayerImage.propTypes = {
  spaceId: PropTypes.string,
  payerId: PropTypes.string,
  clientId: PropTypes.string.isRequired,
  imageType: PropTypes.string.isRequired,
};

// Adapted from https://github.com/Availity/availity-react/blob/master/packages/reactstrap-validation-select/AvResourceSelect.js
const ucFirst = str => str && str.charAt(0).toUpperCase() + str.slice(1);

PayerImage.create = defaults => {
  const SpecificPayerImage = props => <PayerImage {...defaults} {...props} />;

  SpecificPayerImage.displayName = `Payer${ucFirst(defaults.imageType)}`;
  return SpecificPayerImage;
};

export default PayerImage;

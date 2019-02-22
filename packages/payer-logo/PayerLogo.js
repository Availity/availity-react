import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

export default class PayerLogo extends Component {
  state = {};

  async componentDidMount() {
    const { spaceId, payerId } = this.props;

    try {
      let url;
      if (spaceId) {
        url = await this.getLogoBySpaceId();
      } else if (payerId) {
        url = await this.getLogoByPayerId();
        // We can probably remove this at some point once our spaces data is complete
        if (!url) {
          url = `/public/apps/eligibility/images/value-add-logos/${payerId.replace(
            /\s/g,
            ''
          )}.gif`;
        }
      }

      this.setState({ url });
    } catch (error) {
      throw error;
    }
  }

  getLogoBySpaceId() {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: {
            data: { space },
          },
        } = await avSlotMachineApi.create({
          query: spaceIDQuery,
          variables: { id: this.props.spaceId },
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
  }

  getLogoByPayerId() {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: {
            data: { spaces },
          },
        } = await avSlotMachineApi.create({
          query: payerIDQuery,
          variables: { payerIDs: [this.props.payerId], types: ['space'] },
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
  }

  render() {
    const { payerId, spaceId, ...rest } = this.props;
    if (!payerId && !spaceId) return null;

    return <img src={this.state.url} alt="Payer logo" {...rest} />;
  }
}

PayerLogo.propTypes = {
  spaceId: PropTypes.string,
  payerId: PropTypes.string,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { useEffectAsync } from '@availity/hooks';
import { avSlotMachineApi } from '@availity/api-axios';
import ReactMarkdown from 'react-markdown';
import BlockUI from 'react-block-ui';
import { ModalBody } from 'reactstrap';

const disclaimerQuery = `
query disclaimerQuery($id: ID!){
  space(id: $id) {
    description
  }
}`;

const DisclaimerModal = ({ disclaimerId }) => {
  const [disclaimer, setDisclaimer] = useState('');

  useEffectAsync(() => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchDisclaimer = async () => {
      if (disclaimerId) {
        const result = await avSlotMachineApi.query(disclaimerQuery, {
          id: disclaimerId,
        });

        setDisclaimer(get(result, 'data.data.space.description'));
      }
    };
    fetchDisclaimer();
  }, [disclaimerId]);

  return (
    <ModalBody
      tag={BlockUI}
      blocking={disclaimer === ''}
      message="Loading Disclaimer"
    >
      <ReactMarkdown source={disclaimer} />
    </ModalBody>
  );
};

DisclaimerModal.propTypes = {
  disclaimerId: PropTypes.string,
};

export default DisclaimerModal;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import BlockUi from '@availity/block-ui';

import SupportForm from './SupportForm';

const SupportModal = ({ supportIsActive, toggle, supportZIndex, setSupportIsActive, feedbackToggle }) => {
  const [blocking, setBlocking] = useState(false);

  return (
    <Modal
      fade
      id="supportModal"
      data-testid="supportModal"
      aria-labelledby="support-form-header"
      isOpen={supportIsActive}
      toggle={toggle}
      zIndex={supportZIndex}
    >
      <BlockUi tag="div" blocking={blocking}>
        <SupportForm
          setSupportIsActive={setSupportIsActive}
          setBlocking={setBlocking}
          feedbackToggle={feedbackToggle}
        />
      </BlockUi>
    </Modal>
  );
};

SupportModal.propTypes = {
  supportIsActive: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  supportZIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setSupportIsActive: PropTypes.func,
  feedbackToggle: PropTypes.func,
};

export default SupportModal;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import SupportForm from './SupportForm';

const SupportModal = ({
  supportIsActive,
  toggle,
  supportZIndex,
  setSupportIsActive,
}) => {
  const [blocking, setBlocking] = useState(null);

  return (
    <Modal
      fade
      id="supportModal"
      data-testid="supportModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="support-form-header"
      aria-hidden="true"
      isOpen={supportIsActive}
      toggle={toggle}
      zIndex={supportZIndex}
    >
      <BlockUi tag="div" blocking={blocking}>
        <SupportForm
          setSupportIsActive={setSupportIsActive}
          setBlocking={setBlocking}
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
};

export default SupportModal;

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import FeedbackForm from './FeedbackForm';

const FeedbackModal = ({ isOpen, toggle, zIndex, ...formOptions }) => (
  <Modal
    fade
    id="feedbackModal"
    data-testid="feedbackModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="feedback-form-header"
    aria-hidden="true"
    isOpen={isOpen}
    toggle={toggle}
    zIndex={zIndex}
  >
    <FeedbackForm onClose={toggle} {...formOptions} />
  </Modal>
);

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default FeedbackModal;

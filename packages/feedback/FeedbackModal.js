import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import FeedbackForm from './FeedbackForm';

const FeedbackModal = ({ isOpen, toggle, ...formOptions }) => (
  <Modal
    fade
    id="feedbackModal"
    data-testid="feedbackModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="feedbackModalLabel"
    aria-hidden="true"
    isOpen={isOpen}
    toggle={toggle}
  >
    <FeedbackForm onClose={toggle} {...formOptions} />
  </Modal>
);

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default FeedbackModal;

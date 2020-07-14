import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import FeedbackForm from './FeedbackForm';

<<<<<<< HEAD
const FeedbackModal = ({ isOpen, toggle, ...formOptions }) => (
=======
const FeedbackModal = ({ isOpen, toggle, zIndex, ...formOptions }) => (
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
<<<<<<< HEAD
=======
    zIndex={zIndex}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  >
    <FeedbackForm onClose={toggle} {...formOptions} />
  </Modal>
);

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
<<<<<<< HEAD
=======
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
};

export default FeedbackModal;

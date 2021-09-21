import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import FeedbackForm from './FeedbackForm';
import SupportModal from './SupportModal';

const FeedbackModal = ({
  isOpen,
  toggle,
  zIndex,
  showSupport,
  supportZIndex,
  feedbackToggle,
  autoFocusFeedbackButton,
  ...formOptions
}) => {
  const [supportIsActive, setSupportIsActive] = React.useState(false);

  return supportIsActive ? (
    <SupportModal
      supportIsActive={supportIsActive}
      setSupportIsActive={setSupportIsActive}
      zIndex={supportZIndex}
      toggle={toggle}
      feedbackToggle={feedbackToggle}
    />
  ) : (
    <Modal
      fade
      id="feedbackModal"
      data-testid="feedbackModal"
      size="lg"
      aria-labelledby="feedback-form-header"
      isOpen={isOpen && !supportIsActive}
      toggle={toggle}
      zIndex={zIndex}
    >
      <FeedbackForm
        onClose={toggle}
        showSupport={showSupport}
        setSupportIsActive={setSupportIsActive}
        autoFocusFeedbackButton={autoFocusFeedbackButton}
        {...formOptions}
      />
    </Modal>
  );
};

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  showSupport: PropTypes.bool,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  supportZIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  feedbackToggle: PropTypes.func,
  autoFocusFeedbackButton: PropTypes.bool,
};

export default FeedbackModal;

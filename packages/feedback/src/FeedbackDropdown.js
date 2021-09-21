import React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu } from 'reactstrap';
import FeedbackForm from './FeedbackForm';
import SupportModal from './SupportModal';
import SupportDropdown from './SupportDropdown';

const dropdownStyles = { width: '550px', maxWidth: '90vw', padding: 0 };

const FeedbackDropdown = ({
  prompt,
  toggle,
  onFeedbackSent,
  showSupport,
  supportToggle,
  supportZIndex,
  modal,
  feedbackToggle,
  autoFocusFeedbackButton,
  ...formProps
}) => {
  const [supportIsActive, setSupportIsActive] = React.useState(false);

  let support = null;
  if (supportIsActive) {
    support = modal ? (
      <SupportModal
        toggle={supportToggle}
        isOpen={supportIsActive}
        setSupportIsActive={setSupportIsActive}
        supportZIndex={supportZIndex}
        feedbackToggle={feedbackToggle}
      />
    ) : (
      <SupportDropdown
        toggle={supportToggle}
        setSupportIsActive={setSupportIsActive}
        feedbackToggle={feedbackToggle}
      />
    );
  }

  const toRender = support || (
    <FeedbackForm
      onFeedbackSent={onFeedbackSent}
      prompt={prompt}
      onClose={toggle}
      showSupport={showSupport}
      setSupportIsActive={setSupportIsActive}
      autoFocusFeedbackButton={autoFocusFeedbackButton}
      {...formProps}
    />
  );

  return (
    <DropdownMenu
      right
      style={dropdownStyles}
      role="dialog"
      aria-labelledby="feedback-form-header"
      aria-modal="false"
    >
      {toRender}
    </DropdownMenu>
  );
};

FeedbackDropdown.propTypes = {
  prompt: PropTypes.string,
  toggle: PropTypes.func,
  onFeedbackSent: PropTypes.func,
  showSupport: PropTypes.bool,
  supportToggle: PropTypes.func,
  supportZIndex: PropTypes.string,
  modal: PropTypes.bool,
  feedbackToggle: PropTypes.func,
  autoFocusFeedbackButton: PropTypes.bool,
};

export default FeedbackDropdown;

import React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu } from 'reactstrap';
import FeedbackForm from './FeedbackForm';
import SupportModal from './SupportModal';
import SupportDropdown from './SupportDropdown';

const FeedbackDropdown = ({
  prompt,
  toggle,
  onFeedbackSent,
  showSupport,
  supportToggle,
  supportZIndex,
  modal,
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
      />
    ) : (
      <SupportDropdown
        toggle={supportToggle}
        setSupportIsActive={setSupportIsActive}
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
      {...formProps}
    />
  );

  return (
    <DropdownMenu right style={{ width: '550px', padding: 0 }}>
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
};

export default FeedbackDropdown;

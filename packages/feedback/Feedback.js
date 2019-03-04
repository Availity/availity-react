import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle } from 'reactstrap';
import { useToggle } from '@availity/hooks';
import FeedbackDropdown from './FeedbackDropdown';
import FeedbackModal from './FeedbackModal';

const Feedback = ({
  appName,
  modal,
  children,
  className,
  outline,
  color,
  formProps,
  prompt,
  onFeedbackSent,
  ...props
}) => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <Dropdown
      isOpen={isOpen && !modal}
      toggle={() => toggle()}
      className={`${className} hidden-print`}
      {...props}
    >
      <DropdownToggle color={color} outline={outline}>
        {children || 'Give Feedback'}
      </DropdownToggle>
      {modal ? (
        <FeedbackModal
          onFeedbackSent={onFeedbackSent}
          prompt={prompt}
          isOpen={isOpen}
          toggle={() => toggle()}
          name={appName}
          {...formProps}
        />
      ) : (
        <FeedbackDropdown
          onFeedbackSent={onFeedbackSent}
          prompt={prompt}
          name={appName}
          {...formProps}
        />
      )}
    </Dropdown>
  );
};

Feedback.propTypes = {
  appName: PropTypes.string,
  modal: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  outline: PropTypes.bool,
  color: PropTypes.string,
  formProps: PropTypes.object,
  prompt: PropTypes.string,
  onFeedbackSent: PropTypes.func,
};

Feedback.defaultProps = {
  modal: false,
  color: 'light',
};

export default Feedback;

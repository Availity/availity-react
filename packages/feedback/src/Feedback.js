import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle } from 'reactstrap';
import { avLogMessagesApi } from '@availity/api-axios';
import { useToggle } from '@availity/hooks';
import FeedbackDropdown from './FeedbackDropdown';
import FeedbackModal from './FeedbackModal';

const Feedback = ({
  appName,
  modal,
  zIndex,
  supportZIndex,
  children,
  analytics,
  className,
  outline,
  color,
  formProps,
  prompt,
  onFeedbackSent,
  showSupport,
  ...props
}) => {
  const [feedbackIsOpen, feedbackToggle] = useToggle(false);

  return (
    <Dropdown
      isOpen={feedbackIsOpen && !modal}
      toggle={() => feedbackToggle()}
      className={`${className} hidden-print`}
      {...props}
    >
      <DropdownToggle color={color} outline={outline}>
        {children || showSupport ? 'Feedback & Support' : 'Give Feedback'}
      </DropdownToggle>
      {modal ? (
        <FeedbackModal
          onFeedbackSent={onFeedbackSent}
          prompt={prompt}
          isOpen={feedbackIsOpen}
          zIndex={zIndex}
          toggle={() => feedbackToggle()}
          name={appName}
          analytics={analytics}
          showSupport={showSupport}
          supportZIndex={supportZIndex}
          feedbackToggle={feedbackToggle}
          autoFocusFeedbackButton={false}
          {...formProps}
        />
      ) : (
        <FeedbackDropdown
          onFeedbackSent={onFeedbackSent}
          feedbackToggle={feedbackToggle}
          prompt={prompt}
          analytics={analytics}
          toggle={() => feedbackToggle()}
          name={appName}
          showSupport={showSupport}
          supportZIndex={supportZIndex}
          modal={modal}
          {...formProps}
          autoFocusFeedbackButton
        />
      )}
    </Dropdown>
  );
};

Feedback.propTypes = {
  appName: PropTypes.string,
  modal: PropTypes.bool,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  supportZIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
  className: PropTypes.string,
  outline: PropTypes.bool,
  color: PropTypes.string,
  formProps: PropTypes.object,
  prompt: PropTypes.string,
  onFeedbackSent: PropTypes.func,
  analytics: PropTypes.shape({
    info: PropTypes.func.isRequired,
  }),
  showSupport: PropTypes.bool,
};

Feedback.defaultProps = {
  modal: false,
  color: 'secondary',
  analytics: avLogMessagesApi,
  showSupport: false,
};

export default Feedback;

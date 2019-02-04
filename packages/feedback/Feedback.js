import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import FeedbackForm from './FeedbackForm';

const Feedback = ({
  appName,
  formProps,
  children,
  className,
  color,
  outline,
  prompt,
  onFeedbackSent,
  ...props
}) => (
  <UncontrolledDropdown className={`${className} hidden-print`} {...props}>
    <DropdownToggle color={color} outline={outline}>
      {children || 'Give Feedback'}
    </DropdownToggle>
    <DropdownMenu right className="p-3" style={{ width: '400px' }}>
      <FeedbackForm
        name={appName}
        onFeedbackSent={onFeedbackSent}
        prompt={prompt}
        {...formProps}
      />
    </DropdownMenu>
  </UncontrolledDropdown>
);

Feedback.propTypes = {
  appName: PropTypes.string.isRequired,
  className: PropTypes.string,
  prompt: PropTypes.string,
  color: PropTypes.string,
  outline: PropTypes.bool,
  formProps: PropTypes.object,
  children: PropTypes.node,
  onFeedbackSent: PropTypes.func,
};

Feedback.defaultProps = {
  className: '',
  color: 'light',
};

export default Feedback;

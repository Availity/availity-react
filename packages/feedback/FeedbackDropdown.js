import React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu } from 'reactstrap';
import FeedbackForm from './FeedbackForm';

const Feedback = ({ prompt, onFeedbackSent, ...formProps }) => (
  <DropdownMenu right style={{ width: '400px', padding: 0 }}>
    <FeedbackForm
      onFeedbackSent={onFeedbackSent}
      prompt={prompt}
      {...formProps}
    />
  </DropdownMenu>
);

Feedback.propTypes = {
  prompt: PropTypes.string,
  onFeedbackSent: PropTypes.func,
};

export default Feedback;

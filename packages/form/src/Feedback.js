import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';

const AvFeedback = ({ children, ...rest }) => (
  <FormFeedback {...rest}>
    <i className="icon icon-attention" aria-label="Error" />
    {children}
  </FormFeedback>
);

const Feedback = ({ name, ...rest }) => {
  const feedbackId = `${name}-feedback`.toLowerCase();
  return <ErrorMessage id={feedbackId} component={AvFeedback} name={name} {...rest} />;
};

AvFeedback.propTypes = {
  children: PropTypes.node,
};

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Feedback;

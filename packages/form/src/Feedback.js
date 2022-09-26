import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';

const Feedback = ({ name, ...rest }) => {
  const feedbackId = `${name}-feedback`.toLowerCase();
  const AvFeedback = ({ children, ...rest }) => (
    <FormFeedback {...rest}>
      <i className="icon icon-attention" aria-label="Error" />
      {children}
    </FormFeedback>
  );

  AvFeedback.propTypes = {
    children: PropTypes.node,
  };
  return <ErrorMessage id={feedbackId} component={AvFeedback} name={name} {...rest} />;
};

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Feedback;

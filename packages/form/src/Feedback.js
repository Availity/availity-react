import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';

const Feedback = ({ name, ...rest }) => {
  const feedbackId = `${name}-feedback`.toLowerCase();
  return <ErrorMessage id={feedbackId} component={FormFeedback} name={name} {...rest} />;
};

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Feedback;

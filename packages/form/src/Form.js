import React from 'react';
import PropTypes from 'prop-types';
import { Form as RsForm } from 'reactstrap';
import { Formik, Form as FForm } from 'formik';

const Form = ({ children, ...rest }) => (
  <Formik {...rest}>
    <RsForm tag={FForm}>{children}</RsForm>
  </Formik>
);

Form.propTypes = {
  children: PropTypes.node,
};

export default Form;

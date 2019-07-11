import React from 'react';
import PropTypes from 'prop-types';
import { Form as RsForm } from 'reactstrap';
import { Formik, Form as FForm } from 'formik';

const Form = ({
  initialValues,
  onSubmit,
  initialStatus,
  initialErrors,
  initialTouched,
  onReset,
  validationSchema,
  validate,
  children,
  ...rest
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    onReset={onReset}
    initialStatus={initialStatus}
    initialErrors={initialErrors}
    initialTouched={initialTouched}
    validationSchema={validationSchema}
    validate={validate}
  >
    <RsForm data-testid="form-container" tag={FForm} {...rest}>
      {children}
    </RsForm>
  </Formik>
);

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  initialStatus: PropTypes.any,
  initialErrors: PropTypes.object,
  initialTouched: PropTypes.object,
  validationSchema: PropTypes.object,
  validate: PropTypes.func,
  children: PropTypes.node,
};

export default Form;

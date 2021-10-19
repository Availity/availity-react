import React from 'react';
import PropTypes from 'prop-types';
import { Form as RsForm } from 'reactstrap';
import { Formik, Form as FForm } from 'formik';

const Form = ({
  initialValues,
  enableReinitialize,
  onSubmit,
  initialStatus,
  initialErrors,
  initialTouched,
  onReset,
  validationSchema,
  validate,
  innerRef,
  children,
  ...rest
}) => (
  <Formik
    initialValues={initialValues}
    enableReinitialize={enableReinitialize}
    onSubmit={onSubmit}
    onReset={onReset}
    initialStatus={initialStatus}
    initialErrors={initialErrors}
    initialTouched={initialTouched}
    validationSchema={validationSchema}
    validate={validate}
    innerRef={innerRef}
  >
    {(props) => (
      <RsForm data-testid="form-container" tag={FForm} {...rest}>
        {typeof children === 'function' ? children(props) : children}
      </RsForm>
    )}
  </Formik>
);

/* eslint-disable react/forbid-prop-types */
Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  enableReinitialize: PropTypes.bool,
  initialErrors: PropTypes.object,
  initialStatus: PropTypes.any,
  initialTouched: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
  innerRef: PropTypes.any,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
  validationSchema: PropTypes.object,
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;

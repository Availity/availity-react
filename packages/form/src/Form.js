import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Form as RsForm } from 'reactstrap';
import { Formik, Form as FForm, useFormikContext } from 'formik';

const FormikOnError = ({ id }) => {
  const formik = useFormikContext();
  const [submitCount, setSubmitCount] = useState(formik.submitCount);

  useEffect(() => {
    if (!formik.isValid && formik.submitCount > submitCount) {
      const genericErrorInput =
        'input[aria-invalid="true"], div.is-invalid input:first-of-type:not([hidden]):not([style*="display:none"]):not([style*="display: none"])';
      const form = document.getElementById(id);
      const firstErrorInput = form.querySelector(genericErrorInput);
      firstErrorInput?.focus();
      setSubmitCount(formik.submitCount);
    }
  }, [id, formik.isValid, formik.submitCount, submitCount, formik.errors]);

  return null;
};

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
  focusOnErrors,
  id,
  innerRef,
  children,
  ...rest
}) => {
  const formId = id || uuid();
  const focusErrors = focusOnErrors ? <FormikOnError id={formId} /> : null;

  return (
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
        <RsForm data-testid="form-container" tag={FForm} id={formId} {...rest}>
          {focusErrors}
          {typeof children === 'function' ? children(props) : children}
        </RsForm>
      )}
    </Formik>
  );
};

/* eslint-disable react/forbid-prop-types */
Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  enableReinitialize: PropTypes.bool,
  focusOnErrors: PropTypes.bool,
  id: PropTypes.string,
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
  focusOnErrors: true,
  onSubmit: () => {},
};

export default Form;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Form as RsForm } from 'reactstrap';
import { Formik, Form as FForm, useFormikContext } from 'formik';

const useFormikFocusFirstInvalidField = (id, focusInvalidField, invalidInputSelectors) => {
  const formik = useFormikContext();
  const [submitCount, setSubmitCount] = useState(formik.submitCount);

  useEffect(() => {
    if (focusInvalidField && !formik.isValid && formik.submitCount > submitCount) {
      const form = document.getElementById(id);
      const firstInvalidInput = form.querySelector(invalidInputSelectors);
      firstInvalidInput?.focus();
      setSubmitCount(formik.submitCount);
    }
  }, [id, focusInvalidField, formik.isValid, formik.submitCount, invalidInputSelectors, submitCount, formik.errors]);
};

const FocusableForm = ({ children, focusProps, ...rest }) => {
  useFormikFocusFirstInvalidField(...focusProps);
  return <RsForm {...rest}>{children}</RsForm>;
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
  focusInvalidField,
  id,
  innerRef,
  invalidInputSelectors,
  children,
  ...rest
}) => {
  const formId = id || uuid();
  const focusProps = [(id = formId), focusInvalidField, invalidInputSelectors];

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
        <FocusableForm data-testid="form-container" tag={FForm} id={formId} focusProps={focusProps} {...rest}>
          {typeof children === 'function' ? children(props) : children}
        </FocusableForm>
      )}
    </Formik>
  );
};

/* eslint-disable react/forbid-prop-types */
Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  enableReinitialize: PropTypes.bool,
  focusInvalidField: PropTypes.bool,
  id: PropTypes.string,
  initialErrors: PropTypes.object,
  initialStatus: PropTypes.any,
  initialTouched: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
  innerRef: PropTypes.any,
  invalidInputSelectors: PropTypes.string,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
  validationSchema: PropTypes.object,
};

Form.defaultProps = {
  focusInvalidField: true,
  invalidInputSelectors:
    'input[aria-invalid="true"], div.is-invalid input:first-of-type:not([hidden]):not([style*="display:none"]):not([style*="display: none"])',
  onSubmit: () => {},
};

FocusableForm.propTypes = {
  children: PropTypes.node,
  focusProps: PropTypes.array,
};

export default Form;

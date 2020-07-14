import React from 'react';
import PropTypes from 'prop-types';
import { Form as RsForm } from 'reactstrap';
import { Formik, Form as FForm } from 'formik';

const Form = ({
  initialValues,
<<<<<<< HEAD
=======
  enableReinitialize,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  onSubmit,
  initialStatus,
  initialErrors,
  initialTouched,
  onReset,
  validationSchema,
  validate,
<<<<<<< HEAD
=======
  innerRef,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  children,
  ...rest
}) => (
  <Formik
    initialValues={initialValues}
<<<<<<< HEAD
=======
    enableReinitialize={enableReinitialize}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
    onSubmit={onSubmit}
    onReset={onReset}
    initialStatus={initialStatus}
    initialErrors={initialErrors}
    initialTouched={initialTouched}
    validationSchema={validationSchema}
    validate={validate}
<<<<<<< HEAD
  >
    {props => (
=======
    innerRef={innerRef}
  >
    {(props) => (
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
      <RsForm data-testid="form-container" tag={FForm} {...rest}>
        {typeof children === 'function' ? children(props) : children}
      </RsForm>
    )}
  </Formik>
);

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
<<<<<<< HEAD
=======
  enableReinitialize: PropTypes.bool,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  initialStatus: PropTypes.any,
  initialErrors: PropTypes.object,
  initialTouched: PropTypes.object,
  validationSchema: PropTypes.object,
  validate: PropTypes.func,
<<<<<<< HEAD
=======
  // eslint-disable-next-line react/forbid-prop-types
  innerRef: PropTypes.any,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup as RsFormGroup } from 'reactstrap';
import classNames from 'classnames';
import { useField } from 'formik';

const FormGroup = ({ className, for: For, ...props }) => {
  const [, metadata] = useField(For);

  const classname = classNames(
    className,
    metadata.touched && metadata.error && `text-danger`
  );

  return <RsFormGroup className={classname} {...props} />;
};

FormGroup.propTypes = {
  className: PropTypes.string,
  for: PropTypes.string,
};

export default FormGroup;

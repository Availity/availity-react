import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input as RsInput } from 'reactstrap';
import { useField } from 'formik';

const Input = ({ tag: Tag, className, name, validate, ...rest }) => {
  const [field, metadata] = useField({
    name,
    validate,
  });

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.error ? 'av-invalid' : 'av-valid',
    metadata.touched && metadata.error && 'is-invalid',
    rest.type === 'checkbox' &&
      metadata.touched &&
      metadata.error &&
      'was-validated'
  );

  const extraProps = {};

  if (rest.type === 'checkbox') {
    extraProps.checked = !!field.value;
  }

  return (
    <Tag className={classes} name={name} {...field} {...extraProps} {...rest} />
  );
};

Input.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

Input.defaultProps = {
  tag: RsInput,
};

export default Input;

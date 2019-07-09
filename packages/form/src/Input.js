import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input as RsInput } from 'reactstrap';
import { useField } from 'formik';

const Input = ({ tag: Tag, className, name, ...rest }) => {
  const [field, metadata] = useField(name);

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

  return <Tag className={classes} name={name} {...field} {...rest} />;
};

Input.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  tag: RsInput,
};

export default Input;

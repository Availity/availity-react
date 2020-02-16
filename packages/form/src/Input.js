import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input as RsInput } from 'reactstrap';
import { useField } from 'formik';

const Input = ({
  tag: Tag,
  className,
  onChange: propsOnChange,
  name,
  ...rest
}) => {
  const [{ onChange, ...field }, metadata] = useField(name);

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
    <Tag
      className={classes}
      onChange={e => {
        onChange(e);
        if (propsOnChange) {
          propsOnChange(e);
        }
      }}
      name={name}
      {...field}
      {...extraProps}
      {...rest}
    />
  );
};

Input.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  tag: RsInput,
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input as RsInput } from 'reactstrap';
import { useField } from 'formik';

const Input = ({ tag: Tag, className, onChange: propsOnChange, validate, name, feedback, help, required, ...rest }) => {
  const [{ onChange, ...field }, metadata] = useField({
    name,
    validate,
  });

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.error ? 'av-invalid' : 'av-valid',
    metadata.touched && metadata.error && 'is-invalid',
    rest.type === 'checkbox' && metadata.touched && metadata.error && 'was-validated'
  );

  const error = !!metadata.touched && !!metadata.error;
  const feedbackId = error && feedback ? `${name}-feedback`.toLowerCase() : '';
  const helpMessageId = help ? ` ${name}-helpmessage`.toLowerCase() : '';

  const extraProps = {};

  if (rest.type === 'checkbox') {
    extraProps.checked = !!field.value;
  }

  return (
    <Tag
      className={classes}
      onChange={(e) => {
        onChange(e);
        if (propsOnChange) {
          propsOnChange(e);
        }
      }}
      name={name}
      invalid={error}
      aria-describedby={feedbackId + helpMessageId}
      aria-required={required}
      {...field}
      {...extraProps}
      {...rest}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  feedback: PropTypes.bool,
  help: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  validate: PropTypes.func,
};

Input.defaultProps = {
  required: false,
  tag: RsInput,
};

export default Input;

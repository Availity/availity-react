import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input as RsInput } from 'reactstrap';
import { useField } from 'formik';

const Input = ({
  tag: Tag,
  className,
  onChange: propsOnChange,
  validate,
  name,
  feedback,
  helpMessage,
  ...rest
}) => {
  const [{ onChange, ...field }, metadata] = useField({
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

  const error = !!metadata.touched && !!metadata.error;
  const feedbackId = error && feedback ? `${name}-feedback`.toLowerCase() : '';
  const helpMessageId = helpMessage ? ` ${name}-helpmessage`.toLowerCase() : '';

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
      {...field}
      {...extraProps}
      {...rest}
    />
  );
};

Input.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  validate: PropTypes.func,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  feedback: PropTypes.bool,
  helpMessage: PropTypes.bool,
};

Input.defaultProps = {
  tag: RsInput,
};

export default Input;

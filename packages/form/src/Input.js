import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input as RsInput } from 'reactstrap';
import { useField } from 'formik';

const Input = ({ name, tag: Tag, className, onChange: propsOnChange, validate, feedback, help, required, ...rest }) => {
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
  /** Identifies the field and matches the validation */
  name: PropTypes.string.isRequired,
  /** Class name passed to the input. */
  className: PropTypes.string,
  /** Will add default feedback id to aria-describedby. */
  feedback: PropTypes.bool,
  /** Will add default help message id to aria-describedby. Used by <Field />. */
  help: PropTypes.bool,
  onChange: PropTypes.func,
  /** Will add aria-required to input. */
  required: PropTypes.bool,
  /** The Node or tag to substitute as the input field. Default is reactstrap Input tag. */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  validate: PropTypes.func,
};

Input.defaultProps = {
  tag: RsInput,
};

export default Input;

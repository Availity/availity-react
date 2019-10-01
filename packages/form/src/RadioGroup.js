import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import Feedback from './Feedback';
import FormGroup from './FormGroup';

export const RadioGroupContext = createContext();

export const useRadioGroup = radioValue => {
  const { setFieldValue } = useFormikContext();
  const { name: groupName, value = '', groupOnChange, ...rest } = useContext(
    RadioGroupContext
  );

  const setValue = () => {
    setFieldValue(groupName, radioValue);
    if (groupOnChange) {
      groupOnChange(radioValue);
    }
  };

  return { setValue, value: value === radioValue, ...rest };
};

const RadioGroup = ({
  name,
  children,
  label,
  onChange: groupOnChange,
  inline = false,
  ...rest
}) => {
  const [field, metadata] = useField(name);

  const classes = classNames(
    'form-control border-0 p-0 h-auto',
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  const legend = label ? <legend>{label}</legend> : '';

  return (
    <RadioGroupContext.Provider
      value={{ ...field, groupOnChange, metadata, inline }}
    >
      <FormGroup tag="fieldset" for={name} {...rest}>
        {legend}
        <div className={classes} data-testid={`radio-items-${name}`}>
          {children}
        </div>
        <Feedback name={name} />
      </FormGroup>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.node,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
};

export default RadioGroup;

import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FieldHelpIcon } from '@availity/help';
import { useField, useFormikContext } from 'formik';
import Feedback from './Feedback';
import FormGroup from './FormGroup';

export const RadioGroupContext = createContext();

export const useRadioGroup = (radioValue) => {
  const { setFieldValue } = useFormikContext();
  const {
    name: groupName,
    value = '',
    groupOnChange,
    ...rest
  } = useContext(RadioGroupContext);

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
  groupClassName,
  inline = false,
  helpId,
  ...rest
}) => {
  const [field, metadata] = useField(name);

  const classes = classNames(
    groupClassName,
    'form-control border-0 p-0 h-auto',
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  let tag = 'div';
  let legend = false;

  if (label) {
    tag = 'fieldset';
    legend = <legend>{label}</legend>;

    if (helpId) {
      const legendId = `${name}-legend`.toLowerCase();
      const legendStyle = { fontSize: '1.5rem', marginBottom: '.5rem' };
      legend = (
        <>
          <legend id={legendId} className="sr-only">
            {label}
          </legend>
          <div className="form-inline" style={legendStyle}>
            <div aria-hidden="true">{label}</div>
            <FieldHelpIcon id={helpId} labelId={legendId} />
          </div>
        </>
      );
    }
  }

  return (
    <RadioGroupContext.Provider
      value={{ ...field, groupOnChange, metadata, inline }}
    >
      <FormGroup tag={tag} for={name} {...rest}>
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
  groupClassName: PropTypes.string,
  helpId: PropTypes.string,
};

export default RadioGroup;

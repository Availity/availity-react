import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';

import Feedback from './Feedback';
import FormGroup from './FormGroup';
import Label from './Label';

export const RadioGroupContext = createContext();

export const useRadioGroup = (radioValue) => {
  const { setFieldValue } = useFormikContext();
  const { name: groupName, value = '', groupOnChange, ...rest } = useContext(RadioGroupContext);

  const setValue = () => {
    setFieldValue(groupName, radioValue);
    if (groupOnChange) {
      groupOnChange(radioValue);
    }
  };

  return { groupName, setValue, value: value === radioValue, ...rest };
};

const RadioGroup = ({
  name,
  children,
  label,
  onChange: groupOnChange,
  groupClassName,
  inline = false,
  helpId,
  labelClassName,
  required,
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
  let legend = null;

  if (label) {
    tag = 'fieldset';
    const legendId = `${name}-legend`.toLowerCase();
    const styles = { cursor: 'default', lineHeight: 'inherit', color: '#000' };
    const labelClasses = classNames('form-inline', labelClassName, !labelClassName && 'h4 font-weight-normal');

    legend = (
      <>
        <legend id={legendId} className="sr-only">
          {required ? '* ' : null}
          {label}
        </legend>
        <div className={labelClasses} style={styles}>
          <Label tag="div" aria-hidden helpId={helpId} required={required}>
            {label}
          </Label>
        </div>
      </>
    );
  }

  return (
    <RadioGroupContext.Provider value={{ ...field, groupOnChange, metadata, inline }}>
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
  children: PropTypes.node,
  groupClassName: PropTypes.string,
  helpId: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
};

export default RadioGroup;

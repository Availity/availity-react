import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import Feedback from './Feedback';
import FormGroup from './FormGroup';

export const CheckboxGroupContext = createContext();

export const useCheckboxGroup = (name) => {
  const { setFieldValue } = useFormikContext();
  const { name: groupName, groupOnChange, value = [], ...rest } = useContext(
    CheckboxGroupContext
  );

  const toggle = () => {
    const valueArray = [...value];

    const indexOfVal = valueArray.indexOf(name);

    if (indexOfVal === -1) {
      valueArray.push(name);
    } else {
      valueArray.splice(indexOfVal, 1);
    }

    setFieldValue(groupName, valueArray);

    if (groupOnChange) {
      groupOnChange(valueArray);
    }
  };

  return { toggle, value: value.indexOf(name) > -1, ...rest };
};

const CheckboxGroup = ({
  name,
  children,
  onChange: groupOnChange,
  groupClassName,
  label,
  ...rest
}) => {
  const [field, metadata] = useField(name);

  const classes = classNames(
    groupClassName,
    'form-control border-0 p-0 h-auto',
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  const legend = label ? <legend>{label}</legend> : '';

  return (
    <CheckboxGroupContext.Provider
      value={{ ...field, groupOnChange, metadata }}
    >
      <FormGroup tag="fieldset" for={name} {...rest}>
        {legend}
        <div className={classes} data-testid={`check-items-${name}`}>
          {children}
        </div>
        <Feedback name={name} />
      </FormGroup>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.node,
  onChange: PropTypes.func,
  groupClassName: PropTypes.string,
};

export default CheckboxGroup;

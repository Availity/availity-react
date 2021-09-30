import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FieldHelpIcon } from '@availity/help';
import { useField, useFormikContext } from 'formik';
import Feedback from './Feedback';
import FormGroup from './FormGroup';

export const CheckboxGroupContext = createContext();

export const useCheckboxGroup = (name) => {
  const { setFieldValue } = useFormikContext();
  const { name: groupName, groupOnChange, value = [], ...rest } = useContext(CheckboxGroupContext);

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

const CheckboxGroup = ({ name, children, onChange: groupOnChange, groupClassName, label, helpId, ...rest }) => {
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
    <CheckboxGroupContext.Provider value={{ ...field, groupOnChange, metadata }}>
      <FormGroup tag={tag} for={name} {...rest}>
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
  helpId: PropTypes.string,
};

export default CheckboxGroup;

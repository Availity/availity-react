import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import RSelect from 'react-select';
import Async from 'react-select-async-paginate';
import get from 'lodash.get';
import {
  DownChevron,
  CrossIcon,
  DropdownIndicator,
  ClearIndicator,
} from 'react-select/lib/components/indicators';

const components = {
  DropdownIndicator: props => (
    <DropdownIndicator {...props}>
      <DownChevron />
      <span className="sr-only">Toggle Select Options</span>
    </DropdownIndicator>
  ),
  ClearIndicator: props => (
    <ClearIndicator {...props}>
      <CrossIcon />
      <span className="sr-only">Clear all selections</span>
    </ClearIndicator>
  ),
};

const Select = ({
  name,
  className,
  selectRef,
  styles,
  maxLength,
  onChange: onChangeCallback,
  autofill,
  ...attributes
}) => {
  const [
    { onChange, value: fieldValue, ...field },
    { touched, error: hasError },
  ] = useField(name);
  const { values, setValues } = useFormikContext();

  const getOptionLabel = option => option[get(attributes, 'labelKey', 'label')];

  const getOptionValue = option =>
    attributes.raw && !attributes.valueKey
      ? option
      : get(option, get(attributes, 'valueKey', 'value'), option);

  const findOptionFromValue = (value, options) =>
    Array.isArray(options) &&
    options.filter(option => getOptionValue(option) === value)[0];

  const getViewValue = () => {
    if (attributes.raw || attributes.loadOptions || !attributes.options)
      return fieldValue;
    if (attributes.isMulti && Array.isArray(fieldValue)) {
      return fieldValue.map(
        value => findOptionFromValue(value, attributes.options) || value
      );
    }
    return findOptionFromValue(fieldValue, attributes.options) || fieldValue;
  };

  const Tag = attributes.loadOptions ? Async : RSelect;

  if (!attributes.inputId) {
    attributes.inputId = name;
  }

  const onChangeHandler = async (newValue, { name } = {}) => {
    if (maxLength && attributes.isMulti && newValue.length > maxLength) return;

    let newVal;
    if (attributes.isMulti) {
      newVal = newValue.map(val => getOptionValue(val));
    } else {
      newVal = getOptionValue(newValue);
    }

    const valuesToSet = { [name]: newVal };

    const shouldAutofill =
      autofill && !attributes.isMulti && newValue && typeof newVal === 'object';

    if (shouldAutofill) {
      Object.keys(values)
        .filter(fieldName => fieldName !== name)
        .forEach(fieldName => {
          let rawValue = newValue;
          if (
            !!newValue.label &&
            !!newValue.value &&
            typeof newValue.value === 'object'
          ) {
            rawValue = newValue.value;
          }

          let shouldAutofillField = false;
          if (typeof autofill === 'object') {
            shouldAutofillField = autofill[fieldName];
          } else {
            shouldAutofillField = Object.prototype.hasOwnProperty.call(
              rawValue,
              fieldName
            );
          }

          if (shouldAutofillField) {
            let val;
            if (typeof autofill === 'object') {
              val = get(rawValue, `${autofill[fieldName]}`);
            } else {
              val = rawValue[fieldName];
            }
            valuesToSet[fieldName] = val;
          }
        });
    }
    await setValues(valuesToSet);
    if (onChangeCallback) {
      onChangeCallback(newVal);
    }
  };

  return (
    <Tag
      {...field}
      onChange={onChangeHandler}
      ref={selectRef}
      name={name}
      classNamePrefix="av"
      role="listbox"
      className={classNames(
        className,
        'av-select',
        touched ? 'is-touched' : 'is-untouched',
        hasError ? 'av-invalid' : 'av-valid',
        touched && hasError && 'is-invalid'
      )}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      closeMenuOnSelect={!attributes.isMulti}
      components={components}
      defaultOptions
      styles={{
        ...styles,
        placeholder: (provided, state) => {
          const showError = touched && hasError && !state.focused;

          return {
            ...provided,
            color: showError ? '#3D3D3D' : '#666',
            maxWidth: '99%',
          };
        },
        valueContainer: provided => ({
          ...provided,
          width: '90%',
        }),
        control: (provided, state) => {
          const showError = touched && hasError && !state.focused;
          return {
            ...provided,
            borderRadius: '.25em',
            backgroundColor: showError ? '#fbcbc8' : 'white',
            borderColor: showError ? '#931b1d' : 'hsl(0,0%,80%)',
            zIndex: state.focused && '3',
          };
        },
        multiValue: provided => ({
          ...provided,
          width: 'auto',
        }),
        input: provided => ({
          ...provided,
          maxWidth: '99%',
        }),
        dropdownIndicator: (provided, state) => {
          const showError = touched && hasError && !state.focused;

          return {
            ...provided,
            pointerEvents: 'none',
            color: showError ? '#931b1d' : 'hsl(0,0%,80%)',
          };
        },
      }}
      {...attributes}
      value={getViewValue()}
    />
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  loadOptions: PropTypes.func,
  raw: PropTypes.bool,
  className: PropTypes.string,
  selectRef: PropTypes.object,
  styles: PropTypes.object,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  autofill: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default Select;

/* eslint-disable unicorn/prefer-spread */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import RSelect, { components as reactSelectComponents } from 'react-select';
import Creatable from 'react-select/creatable';
import { AsyncPaginate as Async, withAsyncPaginate } from 'react-select-async-paginate';
import get from 'lodash/get';
import has from 'lodash/has';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';

const { DownChevron, DropdownIndicator, Input, Option, MultiValueRemove } = reactSelectComponents;

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);

const components = {
  DropdownIndicator: (props) => (
    <DropdownIndicator {...props}>
      <DownChevron />
      <span className="sr-only">Toggle Select Options</span>
    </DropdownIndicator>
  ),
  ClearIndicator: () => null,
  Input: (props) => {
    const { 'aria-required': required } = props.selectProps;
    return <Input {...props} aria-required={required} />;
  },
  Option: (props) => {
    const innerProps = {
      ...props.innerProps,
      role: 'option',
      'aria-selected': props.isSelected,
      name: props.innerProps.id,
    };
    return <Option {...props} innerProps={innerProps} />;
  },
  MultiValueRemove: (props) => {
    const innerProps = {
      ...props.innerProps,
      'aria-hidden': false,
    };
    return <MultiValueRemove {...props} innerProps={innerProps} />;
  },
};

const createOption = (label, labelKey = 'label', valueKey = 'value') => ({
  [labelKey]: label,
  [valueKey]: label.toLowerCase().replace(/\W/g, ''),
});

const areValueAndOptionValueEqual = (value, optionValue) => isEqual(value, optionValue);

const selectAllOption = {
  label: 'Select all',
  value: '*',
};

const validateSelectAllOptions = (options) => {
  const filtered = options.filter((option) => option.value === selectAllOption.value);
  if (filtered.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `An option contains the value: ${selectAllOption.value}. This value is used by the Select All option.`
    );
  }
};

// needed for inline styling of clear button
const wrapperStyle = { display: 'flex' };

export const selectStyles = (showError, styles) => ({
  styles: {
    ...styles,
    container: (provided) => ({
      ...provided,
      // firefox fix for grids https://github.com/JedWatson/react-select/issues/5170
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr)',
      width: '100%',
    }),
    placeholder: (provided, state) => {
      if (state.isDisabled) {
        return {
          ...provided,
          borderColor: '#ced4da',
          color: '#495057',
        };
      }
      const showErrors = showError && !state.focused;

      return {
        ...provided,
        color: showErrors ? '#3D3D3D' : '#666',
        maxWidth: '99%',
      };
    },
    valueContainer: (provided) => ({
      ...provided,
      width: '90%',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#495057',
    }),
    control: (provided, state) => {
      if (state.isDisabled) {
        return {
          ...provided,
          flexGrow: '1',
          borderRadius: '0.25em',
          borderColor: 'inherit',
          backgroundColor: '#e9ecef',
        };
      }

      return {
        ...provided,
        flexGrow: '1',
        borderRadius: '0.25em',
        backgroundColor: 'white',
        borderColor: showError ? '#dc3545' : '#555',
        ':hover': {
          borderColor: showError ? '#dc3545' : '#555',
          cursor: 'text',
        },
        ':focus-within': {
          borderColor: showError ? '#dc3545' : '#2261b5',
          boxShadow: showError ? '0 0 0 0.2rem rgba(220 53 69 / 25%)' : '0 0 0 0.2rem #2261b5',
        },
        zIndex: state.focused && '3',
      };
    },
    menu: (provided) => ({ ...provided, borderRadius: '.25em' }),
    multiValue: (provided) => ({
      ...provided,
      borderRadius: '0.25em',
      width: 'auto',
    }),
    input: (provided) => ({
      ...provided,
      maxWidth: '99%',
    }),
    dropdownIndicator: (provided, state) => {
      if (state.isDisabled) {
        return provided;
      }
      const showErrors = showError && !state.focused;

      return {
        ...provided,
        pointerEvents: 'none',
        color: showErrors ? '#dc3545' : '#555',
      };
    },
    option: (provided) => ({
      ...provided,
    }),
  },
  theme: (theme) => ({
    ...theme,
    borderRadius: 0,
    boxShadow: 0,
    colors: {
      ...theme.colors,
      primary25: '#b8d4fb',
      primary: '#3262af',
    },
  }),
});

const Select = ({
  name,
  validate,
  className,
  options,
  selectRef,
  styles,
  maxLength,
  onChange: onChangeCallback,
  autofill,
  creatable,
  allowSelectAll,
  waitUntilFocused,
  helpMessage,
  feedback,
  placeholder,
  components: componentOverrides,
  required,
  clearButtonClassName,
  clearButtonText = 'clear',
  clearButtonProps = {},
  ...attributes
}) => {
  const [{ onChange, value: fieldValue, ...field }, { touched, error: fieldError }] = useField({
    name,
    validate,
  });
  const { values, setFieldValue, initialValues } = useFormikContext();

  const [newOptions, setNewOptions] = useState([]);

  const errorShown = touched && fieldError;

  let _cacheUniq = attributes.cacheUniq;

  if (!Array.isArray(_cacheUniq)) {
    _cacheUniq = [_cacheUniq];
  }

  // Enhance placeholder for accessibility
  placeholder = (
    <>
      {placeholder || 'Select...'}
      <span className="sr-only">
        {errorShown || null} {helpMessage || null}
      </span>
    </>
  );

  /**
   * Get the path to the label from the option. Uses the `labelKey` prop.
   * Default to the `label` property on the option
   */
  const getOptionLabel = (option) => {
    if (option.__isNew__) {
      return option.label;
    }

    return option[get(attributes, 'labelKey', 'label')];
  };

  /**
   * Get the path to the value from the option. Uses the `valueKey` prop.
   * Default to the `value` property on the option
   */
  const getValueKey = (attrs = attributes) => get(attrs, 'valueKey', 'value');

  /**
   * Get the actual value for the option.
   */
  const getOptionValue = (option) =>
    attributes.raw && !attributes.valueKey ? option : get(option, getValueKey(attributes), option);

  const prepValue = (value, digIfMulti = true) => {
    if (attributes.isMulti && digIfMulti && Array.isArray(value)) {
      return value.map((val) => prepValue(val));
    }
    if (attributes.raw || (attributes.loadOptions && !attributes.valueKey)) {
      return value;
    }
    const valueKey = getValueKey();

    return get(value, valueKey, value);
  };

  /**
   * Find the actual option in the list when the set value
   * is a string or number
   */
  const findOptionFromValue = (value, options) => {
    // selectRef.current.commonProps has the options returned by loadOptions function
    options = options || selectRef?.current?.commonProps.options;
    if (Array.isArray(options)) {
      const flattened = [...options, ...newOptions].reduce((prev, current) => {
        if (current.type === 'group') {
          return prev.concat(current.options);
        }
        return prev.concat(current);
      }, []);
      return flattened.filter((o) => areValueAndOptionValueEqual(value, getOptionValue(o)))[0];
    }

    return null;
  };

  /**
   * Get the value that will be used by the dropdown.
   */
  const getViewValue = () => {
    // Return entire object when:
    // 1) raw prop is set
    // 2) loadOptions is set and labelKey and getOptionLabel are not given
    // 3) loadOptions is not set and no options are available
    if (
      attributes.raw ||
      (attributes.loadOptions && !attributes.labelKey && !attributes.getOptionLabel) ||
      (!attributes.loadOptions && !options)
    ) {
      return fieldValue;
    }
    if (attributes.isMulti && Array.isArray(fieldValue)) {
      return fieldValue.map((value) => findOptionFromValue(value, options) || value);
    }
    return findOptionFromValue(fieldValue, options) || fieldValue;
  };

  let Tag = attributes.loadOptions ? Async : RSelect;

  if (creatable) {
    Tag = attributes.loadOptions ? CreatableAsyncPaginate : Creatable;
  }

  if (!attributes.inputId) {
    attributes.inputId = name;
  }

  const onChangeHandler = async (newValue) => {
    if (newValue && newValue.length > 0 && newValue[newValue.length - 1].value === selectAllOption.value) {
      newValue = options;
    }

    const newVal = prepValue(newValue);
    const isOverMax = maxLength && attributes.isMulti && newValue && newValue.length > maxLength;

    if (isOverMax) return;

    const valuesToSet = { [name]: true };

    await setFieldValue(name, newVal);

    const shouldAutofill = autofill && !attributes.isMulti && newValue && typeof newVal === 'object';

    if (shouldAutofill) {
      let formValuesForAutofill = values;
      if (typeof autofill === 'object') {
        formValuesForAutofill = Object.keys(autofill).reduce((accum, key) => {
          if (has(values, key)) {
            accum[key] = get(values, key);
          }
          return accum;
        }, {});
      }

      Object.keys(formValuesForAutofill)
        .filter((fieldName) => fieldName !== name)
        // eslint-disable-next-line unicorn/no-array-for-each
        .forEach(async (fieldName) => {
          let rawValue = newValue;
          if (!!newValue.label && !!newValue.value && typeof newValue.value === 'object') {
            rawValue = newValue.value;
          }

          let shouldAutofillField = false;
          shouldAutofillField = typeof autofill === 'object' ? autofill[fieldName] : has(rawValue, fieldName);

          if (shouldAutofillField) {
            let val;
            if (typeof autofill === 'object') {
              if (isFunction(autofill[fieldName])) {
                val = autofill[fieldName](rawValue);
              } else if (typeof autofill[fieldName] === 'string') {
                val = get(rawValue, `${autofill[fieldName]}`, initialValues[fieldName]);
              } else {
                val = initialValues[fieldName];
              }
            } else {
              val = get(rawValue, fieldName, initialValues[fieldName]);
            }
            valuesToSet[fieldName] = true;

            await setFieldValue(fieldName, val);
          }
        });
    }

    if (onChangeCallback) {
      onChangeCallback(newVal);
    }
  };

  const handleCreate = (value) => {
    const newOpt = createOption(value, get(attributes, 'labelKey', 'label'), get(attributes, 'valueKey', 'value'));
    newOptions.push(newOpt);
    setNewOptions([...newOptions]);

    if (attributes.isMulti) {
      onChangeHandler(Array.isArray(fieldValue) ? fieldValue.concat(newOpt) : [newOpt]);
    } else {
      onChangeHandler(newOpt);
    }
  };

  let selectOptions;
  if (!attributes.loadOptions) {
    if (allowSelectAll && attributes.isMulti) {
      if (
        [...options, ...newOptions].length > 0 &&
        (values[name] === undefined ||
          values[name] === null ||
          values[name].length < [...options, ...newOptions].length)
      ) {
        validateSelectAllOptions([...options, ...newOptions]);
        selectOptions = [selectAllOption, ...options, ...newOptions];
      } else {
        selectOptions = [...options, ...newOptions];
      }
    } else {
      selectOptions = [...options, ...newOptions];
    }
  }

  if (attributes.loadOptions && allowSelectAll) {
    // eslint-disable-next-line no-console
    console.warn('allowSelectAll is ignored when loadOptions is defined.');
  }

  return (
    <div style={wrapperStyle}>
      <Tag
        {...field}
        onChange={onChangeHandler}
        ref={attributes.loadOptions ? undefined : selectRef}
        selectRef={attributes.loadOptions ? selectRef : undefined}
        name={name}
        classNamePrefix="av"
        role="listbox"
        onCreateOption={handleCreate}
        className={classNames(
          className,
          'av-select',
          touched ? 'is-touched' : 'is-untouched',
          fieldError ? 'av-invalid' : 'av-valid',
          errorShown && 'is-invalid'
        )}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        closeMenuOnSelect={!attributes.isMulti}
        aria-invalid={!!errorShown || undefined}
        aria-errormessage={feedback && fieldValue && errorShown ? `${name}-feedback`.toLowerCase() : ''}
        aria-required={required}
        placeholder={placeholder}
        components={{ ...components, ...componentOverrides }}
        options={selectOptions}
        defaultOptions={waitUntilFocused ? [] : true}
        cacheUniqs={_cacheUniq}
        {...selectStyles(!!errorShown, styles)}
        {...attributes}
        value={getViewValue()}
      />
      {attributes.isClearable || attributes.isMulti ? (
        <button
          type="button"
          className={clearButtonClassName}
          aria-label={`clear ${
            attributes['aria-label'] || name.replace(/[\W_]+/g, ' ').replace(/[A-Z]/g, ' $&') || ''
          }`}
          onClick={() => onChangeHandler(attributes.isMulti ? [] : null)}
          {...clearButtonProps}
        >
          {clearButtonText}
        </button>
      ) : null}
    </div>
  );
};

Select.defaultTypes = {
  waitUntilFocused: false,
};

Select.defaultProps = {
  clearButtonClassName: 'btn btn-link link',
};

Select.propTypes = {
  /** The name of the field. Will be the key of the selected option(s) that come through in the values of the onSubmit callback of the form. */
  name: PropTypes.string.isRequired,
  validate: PropTypes.func,
  /** Array of options that populate the select menu. Grouped options are also supported, but must include the property type: 'group' */
  options: PropTypes.array,
  loadOptions: PropTypes.func,
  /** If true, the entire object of the selected value is returned as the value instead of the value for the valueKey within the object. */
  raw: PropTypes.bool,
  className: PropTypes.string,
  /** Ref passed to react-select-async-paginate component if in async mode. */
  selectRef: PropTypes.object,
  /** refer to react-select docs for info on styles */
  styles: PropTypes.object,
  /** The maximum number of options that can be selected ( when isMulti is true) */
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  /** Allow new items to be created if not found. Default: false. */
  creatable: PropTypes.bool,
  /** If true, when the value of the dropdown changes, if the isMulti prop is false and the new value of the dropdown is an object, all fields on the form corresponding to the new value are auto-filled. In order for a field to be auto-filled, the name property on the field must match the key inside the new value.
   * For example, if the new value is { "payer": "Availity" }, in order for the payer input in the form to be auto-filled to "Availity", the name prop on the input must be "payer".
   * If autofill is an object, when the value of the dropdown changes, if the isMulti prop is false and the new value of the dropdown is an object, all fields on the form corresponding to the keys in the autofill prop will be auto-filled.
   * When autofill is an object, the values in the object can be a string or a function. When a string, the key in the autofill prop gets auto-filled to that path on the selected option. When a function, it gets called with the selected option, and the key in the autofill prop gets auto-filled to the return value of the function.
   */
  autofill: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  /** Adds a Select all option ( when isMulti is true). Note: allowSelectAll is ignored when loadOptions is defined. */
  allowSelectAll: PropTypes.bool,
  /** When true, the network request is not made until the dropdown has been focused. Defaults to false. */
  waitUntilFocused: PropTypes.bool,
  /** Adds hidden help message to placeholder so it is read with aria-describedby (should match visible help message). */
  helpMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Will add default <Feedback /> id to aria-errormessage. */
  feedback: PropTypes.bool,
  placeholder: PropTypes.string,
  components: PropTypes.object,
  /** Will add aria-required to input. */
  required: PropTypes.bool,
  /** Class names to add to clear button (only available when isMulti or isClearable). Default: btn btn-link link */
  clearButtonClassName: PropTypes.string,
  /** Text that should be displayed in the clear button (only available when isMulti or isClearable). Default: clear */
  clearButtonText: PropTypes.string,
  /** Additional properties other that should be set on the clear button (only available when isMulti or isClearable). */
  clearButtonProps: PropTypes.object,
};

components.Option.propTypes = {
  innerProps: PropTypes.object,
  isSelected: PropTypes.bool,
};

components.Input.propTypes = {
  selectProps: PropTypes.object,
};

components.MultiValueRemove.propTypes = {
  innerProps: PropTypes.object,
};

export default Select;

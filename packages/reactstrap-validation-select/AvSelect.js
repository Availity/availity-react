import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AvBaseInput } from 'availity-reactstrap-validation';
import Select, { components as reactSelectComponents } from 'react-select';
import Creatable from 'react-select/creatable';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';

import AsyncPaginate from 'react-select-async-paginate';

const {
  DownChevron,
  CrossIcon,
  DropdownIndicator,
  ClearIndicator,
} = reactSelectComponents;

const createOption = (label, labelkey = 'label') => ({
  [labelkey]: label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

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

class AvSelect extends AvBaseInput {
  constructor(props) {
    super(props);

    this.state = {
      newOptions: [],
    };
  }

  static contextTypes = {
    FormCtrl: PropTypes.object,
  };

  static propTypes = Object.assign({}, AvBaseInput.propTypes, {
    options: PropTypes.array,
    loadOptions: PropTypes.func,
    raw: PropTypes.bool,
    creatable: PropTypes.bool,
    autofill: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  });

  optionsContainsValue = props => {
    const valueKey = this.getValueKey(props);
    const matchingValues = props.options.filter(
      option => option.value === valueKey
    );
    return matchingValues.length > 0;
  };

  componentWillReceiveProps(nextProps) {
    const newValue =
      nextProps.value !== undefined ? nextProps.value : this.value;

    if (newValue !== this.value) {
      this.value = newValue;
      this.setState({ value: newValue });
      this.validate();
    }
    if (!isEqual(nextProps, this.props)) {
      this.updateValidations(nextProps);
    }
  }

  handleCreate = value => {
    const { newOptions, value: currentValue } = this.state;
    const { isMulti } = this.props;
    const newOpt = createOption(value, this.getLabelKey(this.props));
    newOptions.push(newOpt);
    this.setState({
      newOptions,
    });

    if (isMulti) {
      this.getValidatorProps().onChange(
        Array.isArray(currentValue) ? currentValue.concat(newOpt) : [newOpt]
      );
    } else {
      this.getValidatorProps().onChange(newOpt);
    }
  };

  getDefaultValue() {
    let defaultValue = '';
    if (this.props.isMulti) {
      defaultValue = [];
    }
    let value = this.props.defaultValue;
    if (typeof value === 'undefined' && this.context.FormCtrl) {
      value = this.context.FormCtrl.getDefaultValue(this.props.name);
    }
    return typeof value === 'undefined' ? defaultValue : value;
  }

  getValueKey(nextProps = this.props) {
    return get(nextProps, 'valueKey', 'value');
  }

  getOptionValue = option =>
    this.props.raw && !this.props.valueKey
      ? option
      : get(option, this.getValueKey(this.props), option);

  getLabelKey(nextProps = this.props) {
    return get(nextProps, 'labelKey', 'label');
  }

  getOptionLabel = option => {
    if (option.__isNew__) {
      return option.label;
    }
    const optLabel = option[this.getLabelKey(this.props)];
    return optLabel;
  };

  prepValue = (value, digIfMulti = true) => {
    if (this.props.isMulti && digIfMulti && Array.isArray(value)) {
      return value.map(this.prepValue, false);
    }
    if (this.props.raw || this.props.loadOptions) {
      return value;
    }
    const valueKey = this.getValueKey();
    return get(value, valueKey, value);
  };

  onBlurHandler(value) {
    if (this.getValidationEvent() === 'onBlur') {
      this.validate();
    }
    if (this.context.FormCtrl)
      this.context.FormCtrl.setTouched(this.props.name);
    return this.props.onBlur && this.props.onBlur(value);
  }

  onFocusHandler(value) {
    if (this.getValidationEvent() === 'onFocus') {
      this.validate();
    }
    return this.props.onFocus && this.props.onFocus(value);
  }

  onInputHandler(...args) {
    if (this.props.onInputChange) {
      this.props.onInputChange(...args);
    }
  }

  onChangeHandler(inputValue, { name } = {}) {
    const value = this.prepValue(inputValue);
    if (this.props.isMulti) {
      const max = this.props.maxLength || this.props.max;
      if (value && value.length > max) {
        return;
      }
    }
    super.onChangeHandler(value);

    const shouldAutofill =
      this.props.autofill &&
      !this.props.isMulti &&
      inputValue &&
      typeof inputValue === 'object';

    if (shouldAutofill) {
      const formValues = this.context.FormCtrl.getValues();
      Object.keys(formValues)
        // Filter out the input that the onChangeHandler is being called for
        .filter(fieldName => fieldName !== name)
        .forEach(fieldName => {
          let rawValue = inputValue;
          if (
            !!inputValue.label &&
            !!inputValue.value &&
            typeof inputValue.value === 'object'
          ) {
            rawValue = inputValue.value;
          }

          let inputValueIsInForm = false;
          if (typeof this.props.autofill === 'object') {
            inputValueIsInForm = Object.keys(this.props.autofill).some(
              key => key === fieldName
            );
          } else {
            inputValueIsInForm = Object.keys(rawValue).some(
              key => key === fieldName
            );
          }

          if (inputValueIsInForm) {
            const input = this.context.FormCtrl.getInput(fieldName);

            let val;
            if (typeof this.props.autofill === 'object') {
              val = get(rawValue, `${this.props.autofill[fieldName]}`);
            } else {
              val = rawValue[fieldName];
            }

            input.onChangeHandler(val);
          }
        });
    }
  }

  getValue() {
    return this.value === null ? '' : this.value;
  }

  findOptionFromValue(value) {
    const { options: propOptions } = this.props;
    const { newOptions } = this.state;

    const options = [...propOptions, ...newOptions];

    return (
      Array.isArray(options) &&
      options.filter(option => this.getOptionValue(option) === value)[0]
    );
  }

  getViewValue() {
    if (this.props.raw || this.props.loadOptions || !this.props.options)
      return this.state.value;
    if (this.props.isMulti && Array.isArray(this.state.value)) {
      return this.state.value.map(
        value => this.findOptionFromValue(value) || value
      );
    }
    return this.findOptionFromValue(this.state.value) || this.state.value;
  }

  render() {
    const {
      className,
      selectRef,
      styles,
      creatable,
      options,
      ...attributes
    } = this.props;
    const { newOptions } = this.state;
    const touched =
      this.context.FormCtrl && this.context.FormCtrl.isTouched(this.props.name);
    const hasError =
      this.context.FormCtrl && this.context.FormCtrl.hasError(this.props.name);

    let classes = className;
    if (this.context.FormCtrl) {
      classes = classNames(
        className,
        'av-select',
        touched ? 'is-touched' : 'is-untouched',
        this.context.FormCtrl.isDirty(this.props.name)
          ? 'is-dirty'
          : 'is-pristine',
        this.context.FormCtrl.isBad(this.props.name) ? 'is-bad-input' : null,
        hasError ? 'av-invalid' : 'av-valid',
        touched && hasError && 'is-invalid'
      );
    }

    let Tag = attributes.loadOptions ? AsyncPaginate : Select;

    if (!attributes.loadOptions && creatable) {
      Tag = Creatable;
    }

    return (
      <Tag
        ref={selectRef}
        classNamePrefix="av"
        role="listbox"
        className={classes}
        SelectComponent={
          attributes.loadOptions && creatable ? Creatable : undefined
        }
        getOptionLabel={this.getOptionLabel}
        getOptionValue={this.getOptionValue}
        closeMenuOnSelect={!attributes.isMulti}
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
        options={
          !attributes.loadOptions ? [...options, ...newOptions] : undefined
        }
        onCreateOption={this.handleCreate}
        components={components}
        {...attributes}
        {...this.getValidatorProps()}
        value={this.getViewValue()}
      />
    );
  }
}

export default AvSelect;

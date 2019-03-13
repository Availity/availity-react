import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AvBaseInput } from 'availity-reactstrap-validation';
import Select from '@thesharpieone/react-select-async-pagination';
import Async from '@thesharpieone/react-select-async-pagination/lib/Async';
import {
  DownChevron,
  CrossIcon,
  DropdownIndicator,
  ClearIndicator,
} from '@thesharpieone/react-select-async-pagination/lib/components/indicators';
import get from 'lodash/get';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

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
  static contextTypes = {
    FormCtrl: PropTypes.object,
  };

  static propTypes = Object.assign({}, AvBaseInput.propTypes, {
    options: PropTypes.array,
    loadOptions: PropTypes.func,
    raw: PropTypes.bool,
  });

  optionsContainsValue = (props, value) => {
    const valueKey = this.getValueKey(props);
    return !!find(props.options, [valueKey, value]);
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

  getOptionLabel = option => option[this.getLabelKey(this.props)];

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

  onChangeHandler(inputValue) {
    const value = this.prepValue(inputValue);
    if (this.props.isMulti) {
      const max = this.props.maxLength || this.props.max;
      if (value.length > max) {
        return;
      }
    }
    super.onChangeHandler(value);
  }

  getValue() {
    return this.value === null ? '' : this.value;
  }

  findOptionFromValue(value, options) {
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
        value => this.findOptionFromValue(value, this.props.options) || value
      );
    }
    return (
      this.findOptionFromValue(this.state.value, this.props.options) ||
      this.state.value
    );
  }

  render() {
    const { className, selectRef, styles, ...attributes } = this.props;
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

    const Tag = attributes.loadOptions ? Async : Select;

    return (
      <Tag
        ref={selectRef}
        classNamePrefix="av"
        role="listbox"
        className={classes}
        getOptionLabel={this.getOptionLabel}
        getOptionValue={this.getOptionValue}
        closeMenuOnSelect={!attributes.isMulti}
        components={components}
        defaultOptions
        styles={{
          ...styles,
          placeholder: provided => ({
            ...provided,
            color: '#666',
            maxWidth: '99%',
          }),
          valueContainer: provided => ({
            ...provided,
            width: '90%',
          }),
          control: (provided, state) => {
            const showError = touched && hasError && !state.focused;
            return {
              ...provided,
              borderRadius: 'inherit',
              backgroundColor: showError ? '#fbcbc8' : 'white',
              borderColor: showError ? '#931b1d' : 'hsl(0,0%,80%)',
              zIndex: state.focused && '3',
            };
          },
          multiValue: provided => ({
            ...provided,
            width: '85%',
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
        {...this.getValidatorProps()}
        value={this.getViewValue()}
      />
    );
  }
}

export default AvSelect;

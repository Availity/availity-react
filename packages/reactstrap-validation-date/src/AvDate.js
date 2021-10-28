/* eslint-disable react/default-props-match-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import { InputGroup } from 'reactstrap';
import classNames from 'classnames';
import moment from 'moment';
import 'react-dates/initialize';
import '../polyfills';

import { inputType, isoDateFormat } from 'availity-reactstrap-validation/lib/AvValidator/utils';
import Icon from '@availity/icon';
import { AvInput } from 'availity-reactstrap-validation';

import { isOutsideRange, limitPropType } from './utils';

class AvDate extends Component {
  static getDerivedStateFromProps = ({ value }, prevState) => {
    if (value !== undefined && value !== prevState.value) {
      return { value };
    }
    return null;
  };

  getDateValue = () => {
    const { value, format } = this.state;
    const date = moment(value, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'], true);
    if (date.isValid()) return date;
    return null;
  };

  constructor(props, context) {
    super(props);

    this.state = {};

    // eslint-disable-next-line unicorn/prefer-ternary
    if (props.type.toLowerCase() === 'date' && inputType.date) {
      this.state.format = isoDateFormat;
    } else {
      this.state.format = props.validate?.date?.format || 'MM/DD/YYYY';
    }

    this.state.focused = false;

    const { getDefaultValue } = context.FormCtrl;

    if (getDefaultValue(props.name)) {
      this.state.value = getDefaultValue(props.name);
    }
  }

  onFocusChange = ({ focused }) => {
    const { onPickerFocusChange, name } = this.props;
    const touched = this.context.FormCtrl.isTouched(name);
    if (!touched && !focused) {
      this.context.FormCtrl.setTouched(name);
    }

    this.setState({ focused });

    if (onPickerFocusChange) onPickerFocusChange({ focused });
  };

  // For updating when we delete the current input
  onInputChange = async (value) => {
    const { name, onChange } = this.props;
    const date = moment(value, [isoDateFormat, this.state.format, 'MMDDYYYY', 'YYYYMMDD'], true);

    this.context.FormCtrl.getInput(name).getValidatorProps().onChange(value);
    const isoFormatted = date.format(isoDateFormat);

    this.setState({ value }, () => {
      if (date.isValid()) {
        this.setState({
          focused: false,
        });
        this.context.FormCtrl.setTouched(name);
        if (onChange) onChange(isoFormatted);
      }
    });
  };

  onPickerChange = async (value) => {
    if (value === null) return;
    const { format } = this.state;
    const { name, onChange } = this.props;
    if (value === null) return;

    let val = value;
    if (val instanceof Object && val.isValid()) {
      val = val.format(format);
    }

    this.context.FormCtrl.getInput(name).getValidatorProps().onChange(val);

    this.setState({ value: val }, () => {
      if (onChange) onChange(val);
    });
  };

  onClose = ({ date }) => {
    const { format } = this.state;

    const { onBlur } = this.context.FormCtrl.getInput(this.props.name).getValidatorProps();

    onBlur(date && date.format(format));
  };

  valueParser = (value) => {
    if (this.state.format === isoDateFormat) return value;
    const date = moment(value, [this.state.format, 'MMDDYYYY', 'YYYYMMDD'], true);
    if (date.isValid()) return date.format(isoDateFormat);
    return value;
  };

  valueFormatter = (value) => {
    const date = moment(value, [isoDateFormat, this.state.format, 'MMDDYYYY', 'YYYYMMDD'], true);
    if (date.isValid()) return date.format(this.state.format);
    return value;
  };

  render() {
    const {
      calendarIcon,
      className,
      datepicker,
      datePickerProps,
      hideIcon,
      max,
      min,
      name,
      type,
      validate,
      ...attributes
    } = this.props;
    const { focused, format, value } = this.state;
    const { FormCtrl } = this.context;

    const minDate = validate && validate.min ? validate.min.value : min;
    const maxDate = validate && validate.max ? validate.max.value : max;

    const pickerId = `${(this.props.id || name).replace(/[^\da-z]/gi, '')}-btn`;

    const touched = FormCtrl.isTouched(name);
    const hasError = FormCtrl.hasError(name);

    const classes = classNames(
      className,
      touched ? 'is-touched' : 'is-untouched',
      FormCtrl.isDirty(name) ? 'is-dirty' : 'is-pristine',
      FormCtrl.isBad(name) ? 'is-bad-input' : null,
      hasError ? 'av-invalid' : 'av-valid',
      touched && hasError && 'is-invalid',
      !value && 'current-day-highlight',
      datepicker && 'av-calendar-show'
    );

    const input = (
      <AvInput
        name={name}
        placeholder={format.toLowerCase()}
        {...attributes}
        type="text"
        min={minDate}
        max={maxDate}
        style={{ display: 'none' }}
        value={value || ''}
        valueFormatter={this.valueFormatter}
        valueParser={this.valueParser}
        validate={{ date: true, ...validate }}
      />
    );

    return (
      <>
        {input}
        <InputGroup
          disabled={attributes.disabled}
          className={classes}
          onChange={({ target }) => target.id === pickerId && this.onInputChange(target.value)}
          data-testid={`date-input-group-${name}`}
        >
          <SingleDatePicker
            {...datePickerProps}
            placeholder={format.toLowerCase()}
            id={pickerId}
            disabled={attributes.disabled}
            date={this.getDateValue()}
            onDateChange={this.onPickerChange}
            focused={focused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={isOutsideRange(minDate, maxDate, format)}
            customInputIcon={datepicker ? calendarIcon : undefined}
            showDefaultInputIcon={datepicker}
            inputIconPosition="after"
            onClose={this.onClose}
          />
        </InputGroup>
      </>
    );
  }
}

AvDate.propTypes = {
  ...AvInput.propTypes,
  calendarIcon: PropTypes.node,
  min: limitPropType,
  max: limitPropType,
  onPickerFocusChange: PropTypes.func,
  datePickerProps: PropTypes.object,
};

AvDate.contextTypes = {
  FormCtrl: PropTypes.object.isRequired,
};

AvDate.defaultProps = {
  type: 'text',
  datepicker: true,
  datePickerProps: {},
  calendarIcon: <Icon name="calendar" />,
};

export default AvDate;

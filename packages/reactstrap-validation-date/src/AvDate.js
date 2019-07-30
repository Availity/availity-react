/* eslint-disable react/default-props-match-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import { InputGroup, Input } from 'reactstrap';
import classNames from 'classnames';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { isOutsideRange, limitPropType } from './utils';

import {
  inputType,
  isoDateFormat,
} from 'availity-reactstrap-validation/lib/AvValidator/utils';
import Icon from '@availity/icon';
import { AvBaseInput, AvInput } from 'availity-reactstrap-validation';

class AvDate extends Component {
  static propTypes = {
    calendarIcon: PropTypes.node,
    min: limitPropType,
    max: limitPropType,
    onPickerFocusChange: PropTypes.func,
    datePickerProps: PropTypes.object,
  };

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
  };

  static defaultProps = {
    type: 'text',
    datepicker: true,
    datePickerProps: {},
    calendarIcon: <Icon name="calendar" />,
  };

  static getDerivedStateFromProps = ({ value }, prevState) => {
    if (value !== undefined && value !== prevState.value) {
      return { value };
    }
    return null;
  };

  getDateValue = () => {
    const { value, format } = this.state;
    const date = moment(
      value,
      [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );
    if (date.isValid()) return date;
    return null;
  };

  constructor(props) {
    super(props);

    this.state = {};

    if (props.type.toLowerCase() === 'date' && inputType.date) {
      this.state.format = isoDateFormat;
    } else {
      this.state.format =
        (props.validate && props.validate.date && props.validate.date.format) ||
        'MM/DD/YYYY';
    }

    this.state.focused = false;
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

  onPickerChange = async value => {
    const { format } = this.state;
    if (value === null) return;

    let val = value;
    if (val instanceof Object && val.isValid()) {
      val = val.format(format);
    }

    this.context.FormCtrl.getInput(this.props.name)
      .getValidatorProps()
      ['onChange'](val);

    this.setState({ value: val }, () => {
      if (this.props.onChange) this.props.onChange(event, val);
    });
  };

  onClose = ({ date }) => {
    const { format } = this.state;

    const onBlur = this.context.FormCtrl.getInput(
      this.props.name
    ).getValidatorProps()['onBlur'];

    onBlur(date && date.format(format));
  };

  valueParser = value => {
    if (this.state.format === isoDateFormat) return value;
    const date = moment(
      value,
      [this.state.format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );
    if (date.isValid()) return date.format(isoDateFormat);
    return value;
  };

  valueFormatter = value => {
    const date = moment(
      value,
      [isoDateFormat, this.state.format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );
    if (date.isValid()) return date.format(this.state.format);
    return value;
  };

  render() {
    const {
      datepicker,
      calendarIcon,
      hideIcon,
      className,
      datePickerProps,
      min,
      max,
      type,
      name,
      ...attributes
    } = this.props;

    const pickerId = `${(this.props.id || name).replace(
      /[^a-zA-Z0-9]/gi,
      ''
    )}-btn`;

    const touched = this.context.FormCtrl.isTouched(name);
    const hasError = this.context.FormCtrl.hasError(name);

    const classes = classNames(
      className,
      touched ? 'is-touched' : 'is-untouched',
      this.context.FormCtrl.isDirty(name) ? 'is-dirty' : 'is-pristine',
      this.context.FormCtrl.isBad(name) ? 'is-bad-input' : null,
      hasError ? 'av-invalid' : 'av-valid',
      touched && hasError && 'is-invalid'
    );

    const input = (
      <AvInput
        name={this.props.name}
        placeholder={this.state.format.toLowerCase()}
        {...attributes}
        type="text"
        min={min}
        max={max}
        style={{ display: 'none' }}
        value={this.state.value || ''}
        valueFormatter={this.valueFormatter}
        valueParser={this.valueParser}
        validate={{ date: true, ...this.props.validate }}
      />
    );

    return (
      <>
        {input}
        <InputGroup
          disabled={attributes.disabled}
          className={classes}
          onChange={({ target }) =>
            target.id === pickerId && this.onPickerChange(target.value)
          }
          data-testid={`date-input-group-${name}`}
        >
          <SingleDatePicker
            {...datePickerProps}
            placeholder={this.state.format.toLowerCase()}
            id={pickerId}
            disabled={attributes.disabled}
            date={this.getDateValue()}
            onDateChange={this.onPickerChange}
            focused={datepicker && this.state.focused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={isOutsideRange(min, max)}
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

export default AvDate;

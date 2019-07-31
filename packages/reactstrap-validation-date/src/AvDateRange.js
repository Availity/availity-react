import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'reactstrap';
import moment from 'moment';
import {
  inputType,
  isoDateFormat,
} from 'availity-reactstrap-validation/lib/AvValidator/utils';
import { AvInput } from 'availity-reactstrap-validation';
import { DateRangePicker } from 'react-dates';
import classNames from 'classnames';
import 'react-dates/lib/css/_datepicker.css';
import Icon from '@availity/icon';
import { isOutsideRange, limitPropType } from './utils';

let count = 0;

export default class AvDateRange extends Component {
  static propTypes = {
    ...AvInput.propTypes,
    start: PropTypes.shape(AvInput.propTypes),
    end: PropTypes.shape(AvInput.propTypes),
    onChange: PropTypes.func,
    validate: PropTypes.object,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    max: limitPropType,
    min: limitPropType,
    distance: PropTypes.object,
    ranges: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onPickerFocusChange: PropTypes.func,
    defaultValues: PropTypes.object,
    calendarIcon: PropTypes.node,
    datepicker: PropTypes.bool,
  };

  static contextTypes = { FormCtrl: PropTypes.object.isRequired };

  static defaultProps = {
    type: 'text',
    calendarIcon: <Icon name="calendar" />,
    datepicker: true,
  };

  constructor(props, context) {
    super(props, context);
    const { getDefaultValue } = context.FormCtrl;
    this.state = {
      open: false,
      startValue: props.start.value,
      endValue: props.end.value,
    };
    if (props.type.toLowerCase() === 'date' && inputType.date) {
      this.state.format = isoDateFormat;
    } else {
      this.state.format =
        (props.validate &&
          props.validate.dateRange &&
          props.validate.dateRange.format) ||
        'MM/DD/YYYY';
    }
    if (props.defaultValues) {
      const { start, end } = props.defaultValues;
      if (getDefaultValue(props.start.name)) {
        this.state.startValue = getDefaultValue(props.start.name);
      } else if (start) {
        this.state.startValue = moment(new Date())
          .add(start.value, start.units)
          .format(this.state.format);
      }
      if (getDefaultValue(props.end.name)) {
        this.state.endValue = getDefaultValue(props.end.name);
      } else if (end) {
        this.state.endValue = (end.fromStart
          ? moment(this.state.startValue, this.state.format)
          : moment(new Date())
        )
          .add(end.value, end.units)
          .format(this.state.format);
      } else {
        this.state.endValue = this.state.endValue || this.state.startValue;
      }
    }
    count += 1;
    this.guid = `date-range-${count}-btn`;
  }

  open = () => {
    if (!this.state.open) {
      this.setState({ open: true });
    }
  };

  close = () => {
    if (this.state.open) {
      this.setState({ open: false });
    }
  };

  validateDistance = end => {
    const start = this.context.FormCtrl.getInput(
      this.props.start.name
    ).getViewValue();
    if (start && end && this.props.distance) {
      const mStart = moment(new Date(start));
      const mEnd = moment(new Date(end));
      if (!mStart.isValid() || !mEnd.isValid()) {
        return true;
      }
      const { max, min } = this.props.distance;
      if (max) {
        if (!mEnd.isBefore(mStart.add(max.value, max.units), 'day')) {
          return (
            max.errorMessage ||
            `The end date must be within ${max.value} ${max.units} of the start date`
          );
        }
      }
      if (min) {
        if (mEnd.isAfter(mStart.add(min.value, min.units), 'day')) {
          return (
            min.errorMessage ||
            `The end date must be greater than ${min.value} ${min.units} of the start date`
          );
        }
      }
    }
    return true;
  };

  onDatesChange = async ({ startDate, endDate }) => {
    const { format } = this.state;
    const { start, end, onChange } = this.props;

    const _startDate =
      (startDate && startDate.format(format)) || this.state.startValue;
    const _endDate = (endDate && endDate.format(format)) || this.state.endValue;

    if (startDate !== null) {
      this.context.FormCtrl.getInput(start.name)
        .getValidatorProps()
        .onChange(_startDate);
    }

    if (endDate !== null) {
      this.context.FormCtrl.getInput(end.name)
        .getValidatorProps()
        .onChange(_endDate);
    }

    this.setState(
      {
        startValue: _startDate,
        endValue: _endDate,
      },
      () => {
        if (onChange) {
          onChange({
            start: _startDate,
            end: _endDate,
          });
        }

        if (startDate) {
          this.context.FormCtrl.validate(start.name);
        }

        if (endDate) {
          this.context.FormCtrl.validate(end.name);
        }
      }
    );
  };

  onClose = ({ startDate, endDate }) => {
    const { format } = this.state;
    const _startDate =
      (startDate && startDate.format(format)) || this.state.startValue;
    const _endDate = (endDate && endDate.format(format)) || this.state.endValue;

    if (startDate) {
      this.context.FormCtrl.getInput(this.props.start.name)
        .getValidatorProps()
        .onBlur(_startDate);
    }

    if (endDate) {
      this.context.FormCtrl.getInput(this.props.end.name)
        .getValidatorProps()
        .onBlur(_endDate);
    }

    this.setState({
      startValue: _startDate,
      endValue: _endDate,
    });
  };

  onFocusChange = input => {
    const { onPickerFocusChange, start, end } = this.props;
    const startDateTouched = this.context.FormCtrl.isTouched(start.name);
    const endDateTouched = this.context.FormCtrl.isTouched(end.name);

    if (!input) {
      if (!startDateTouched) {
        this.context.FormCtrl.setTouched(start.name);
      }

      if (!endDateTouched) {
        this.context.FormCtrl.setTouched(end.name);
      }
    }

    this.setState({
      focusedInput: input,
    });

    if (onPickerFocusChange) onPickerFocusChange({ focusedInput: input });
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
      name,
      className,
      id,
      min,
      max,
      calendarIcon,
      datepicker,
      ...attributes
    } = this.props;
    const { startValue, endValue, format, focusedInput } = this.state;
    const endValidate = {
      ...this.props.validate,
      ...this.props.end.validate,
    };
    if (this.props.distance) {
      endValidate.distance = this.validateDistance;
    }

    const startId = `${(id || name).replace(/[^a-zA-Z0-9]/gi, '')}-start`;

    const endId = `${(attributes.id || name).replace(
      /[^a-zA-Z0-9]/gi,
      ''
    )}-end`;

    const touched =
      this.context.FormCtrl.isTouched(this.props.start.name) ||
      this.context.FormCtrl.isTouched(this.props.end.name);
    const hasError =
      this.context.FormCtrl.hasError(this.props.start.name) ||
      this.context.FormCtrl.hasError(this.props.end.name);
    const isDirty =
      this.context.FormCtrl.isDirty(this.props.start.name) ||
      this.context.FormCtrl.isDirty(this.props.end.name);
    const isBad =
      this.context.FormCtrl.isBad(this.props.start.name) ||
      this.context.FormCtrl.isBad(this.props.end.name);

    const startDate = startValue ? moment(startValue, format) : null;
    const endDate = endValue ? moment(endValue, format) : null;

    const classes = classNames(
      className,
      touched ? 'is-touched' : 'is-untouched',
      isDirty ? 'is-dirty' : 'is-pristine',
      isBad ? 'is-bad-input' : null,
      hasError ? 'av-invalid' : 'av-valid',
      touched && hasError && 'is-invalid',
      !startValue && !endValue && 'current-day-highlight',
      datepicker && 'av-calendar-show'
    );

    return (
      <>
        <AvInput
          style={{ display: 'none' }}
          {...this.props.start}
          validate={{
            date: true,
            ...this.props.validate,
            ...this.props.start.validate,
          }}
          value={this.state.startValue || ''}
          type="text"
          min={min}
          max={max}
          valueFormatter={this.valueFormatter}
          valueParser={this.valueParser}
        />
        <AvInput
          style={{ display: 'none' }}
          {...this.props.end}
          validate={{
            date: true,
            ...this.props.validate,
            ...this.props.end.validate,
          }}
          value={this.state.endValue || ''}
          min={min}
          max={max}
          valueFormatter={this.valueFormatter}
          valueParser={this.valueParser}
        />
        <InputGroup
          disabled={attributes.disabled}
          className={classes}
          onChange={({ target }) => {
            if (target.id === startId || target.id === endId) {
              this.onDatesChange(target.value);
            }
          }}
          data-testid={`date-range-input-group-${name}`}
        >
          <DateRangePicker
            disabled={attributes.disabled}
            startDate={startDate}
            startDateId={startId}
            endDate={endDate}
            endDateId={endId}
            onDatesChange={this.onDatesChange}
            focusedInput={focusedInput}
            onFocusChange={this.onFocusChange}
            isOutsideRange={isOutsideRange(min, max)}
            customInputIcon={datepicker ? calendarIcon : undefined}
            inputIconPosition="after"
            customArrowIcon="-"
            showDefaultInputIcon={datepicker}
            onClose={this.onClose}
            numberOfMonths={2}
          />
        </InputGroup>
      </>
    );
  }
}

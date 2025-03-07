/* eslint-disable react/no-unused-class-component-methods */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Button } from 'reactstrap';
import moment from 'moment';
import pick from 'lodash/pick';
import { inputType, isoDateFormat } from 'availity-reactstrap-validation/lib/AvValidator/utils';
import { AvInput } from 'availity-reactstrap-validation';
import { DateRangePicker } from '@availity/react-dates';
import '@availity/react-dates/initialize';
import classNames from 'classnames';

import { isOutsideRange, limitPropType, isSameDay } from './utils';
import '../polyfills';

let count = 0;

const relativeRanges = {
  Today: {
    startDate: (now) => now,
    endDate: (now) => now,
  },
  'Last 7 Days': {
    startDate: (now) => now.add(-6, 'd'),
    endDate: (now) => now,
  },
  'Last 30 Days': {
    startDate: (now) => now.add(-29, 'd'),
    endDate: (now) => now,
  },
  'Last 120 Days': {
    startDate: (now) => now.add(-119, 'd'),
    endDate: (now) => now,
  },
  'Last 6 Months': {
    startDate: (now) => now.add(-6, 'M'),
    endDate: (now) => now,
  },
  'Last 12 Months': {
    startDate: (now) => now.add(-12, 'M'),
    endDate: (now) => now,
  },
};

class AvDateRange extends Component {
  calendarIconRef = React.createRef();

  constructor(props, context) {
    super(props, context);
    const { getDefaultValue } = context.FormCtrl;
    this.state = {
      open: false,
      startValue: props.start.value,
      endValue: props.end.value,
    };
    // eslint-disable-next-line unicorn/prefer-ternary
    if (props.type.toLowerCase() === 'date' && inputType.date) {
      this.state.format = isoDateFormat;
    } else {
      this.state.format = props.validate?.dateRange?.format || 'MM/DD/YYYY';
    }
    if (props.defaultValues) {
      const { start, end } = props.defaultValues;
      if (getDefaultValue(props.start.name)) {
        this.state.startValue = getDefaultValue(props.start.name);
      } else if (start) {
        this.state.startValue = moment(new Date()).add(start.value, start.units).format(this.state.format);
      }
      if (getDefaultValue(props.end.name)) {
        this.state.endValue = getDefaultValue(props.end.name);
      } else if (end) {
        this.state.endValue = (end.fromStart ? moment(this.state.startValue, this.state.format) : moment(new Date()))
          .add(end.value, end.units)
          .format(this.state.format);
      } else {
        this.state.endValue = this.state.endValue || this.state.startValue;
      }
    }
    count += 1;
    this.guid = `date-range-${count}-btn`;
  }

  static getDerivedStateFromProps({ start, end }, { startValue, endValue, prevStartProp, prevEndProp, format }) {
    const newState = {};

    // ensure date values are valid and convert to common format
    const startMoment = moment(startValue, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'], true);
    const endMoment = moment(endValue, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'], true);

    startValue = startMoment.isValid() && startMoment.format('MM/DD/YYYY');
    endValue = endMoment.isValid() && endMoment.format('MM/DD/YYYY');

    // evaluate input dates against prop dates
    if (start.value !== undefined && start.value !== startValue) {
      newState.startValue = startValue;
    }

    if (end.value !== undefined && end.value !== endValue) {
      newState.endValue = endValue;
    }

    // override if prop date change detected
    if (prevStartProp !== start.value) {
      newState.startValue = start.value;
      newState.prevStartProp = start.value;
    }

    if (prevEndProp !== end.value) {
      newState.endValue = end.value;
      newState.prevEndProp = end.value;
    }

    return Object.keys(newState).length > 0 ? newState : null;
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

  getDateValue = (value) => {
    const { format } = this.state;
    const date = moment(value, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'], true);
    if (date.isValid()) return date;
    return null;
  };

  validateDistance = () => {
    const start = this.context.FormCtrl.getInput(this.props.start.name).getViewValue();

    // We want the view value so not calling from args
    const end = this.context.FormCtrl.getInput(this.props.end.name).getViewValue();

    if (start && end && this.props.distance) {
      const mStart = moment(new Date(start));
      const mEnd = moment(new Date(end));
      if (!mStart.isValid() || !mEnd.isValid()) {
        return true;
      }
      const { max, min } = this.props.distance;
      if (max) {
        // eslint-disable-next-line unicorn/no-lonely-if
        if (mEnd.isAfter(moment(mStart).add(max.value, max.units), 'day')) {
          return (
            max.errorMessage ||
            `The end date must be within ${max.value} ${max.units}${max.value > 1 ? 's' : ''} of the start date`
          );
        }
      }
      if (min) {
        // eslint-disable-next-line unicorn/no-lonely-if
        if (mEnd.isBefore(mStart.add(min.value, min.units), 'day')) {
          return (
            min.errorMessage ||
            `The end date must be greater than ${min.value} ${min.units}${min.value > 1 ? 's' : ''} of the start date`
          );
        }
      }
    }
    return true;
  };

  onDatesChange = async ({ startDate, endDate }) => {
    const { format, startValue, endValue } = this.state;
    const { start, end, onChange } = this.props;

    const _startDate = (startDate && startDate.format(format)) || startValue;
    const _endDate = (endDate && endDate.format(format)) || endValue;

    if (startDate !== null) {
      this.context.FormCtrl.getInput(start.name).getValidatorProps().onChange(_startDate);
    }

    if (endDate !== null) {
      this.context.FormCtrl.getInput(end.name).getValidatorProps().onChange(_endDate);
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

  // For updating when we delete the current input
  onInputChange = async (val) => {
    const { onChange, start, end } = this.props;
    const { focusedInput, format, startValue, endValue } = this.state;
    const isStart = focusedInput === 'startDate';
    const date = moment(val, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'], true);

    const valueToSet = date.isValid() ? date.format(isoDateFormat) : null;

    this.context.FormCtrl.getInput(isStart ? start.name : end.name)
      .getValidatorProps()
      .onChange(valueToSet);

    this.setState(
      {
        [isStart ? 'startValue' : 'endValue']: valueToSet,
      },
      () => {
        if (onChange) {
          onChange({
            start: isStart ? valueToSet : startValue,
            end: !isStart ? valueToSet : endValue,
          });
        }

        if (isStart && date.isValid()) {
          this.context.FormCtrl.validate(start.name);
          this.setState({
            focusedInput: 'endDate',
          });
        } else if (!isStart && date.isValid()) {
          // this.context.FormCtrl.validate(end.name);
          this.setState({
            focusedInput: undefined,
          });
          this.context.FormCtrl.setTouched(end.name);
        }
      }
    );
  };

  syncDates = () => {
    const { start, end } = this.props;
    const startTouched = this.context.FormCtrl.isTouched(start.name);
    const endTouched = this.context.FormCtrl.isTouched(end.name);

    if (!startTouched || !endTouched) {
      const { startValue, endValue } = this.state;
      if (!startValue && endValue) {
        this.setState({ startValue: endValue });
        this.context.FormCtrl.setTouched(start.name);
      } else if (startValue && !endValue) {
        this.setState({ endValue: startValue });
        this.context.FormCtrl.setTouched(end.name);
      }
    }
  };

  onFocusChange = (input) => {
    const { onPickerFocusChange, start, end, autoSync } = this.props;
    if (autoSync) {
      this.syncDates();
    }

    if (input === 'endDate') {
      this.context.FormCtrl.setTouched(start.name);
    } else if (!input) {
      if (!this.context.FormCtrl.isTouched(end.name)) {
        this.context.FormCtrl.setTouched(end.name);
      }

      if (!this.context.FormCtrl.isTouched(start.name)) {
        this.context.FormCtrl.setTouched(start.name);
      }

      this.context.FormCtrl.validate(start.name);
      this.context.FormCtrl.validate(end.name);
    }

    this.setState(
      {
        focusedInput: input,
      },
      () => {
        if (onPickerFocusChange) onPickerFocusChange({ focusedInput: input });
      }
    );
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

  afterStartValidate = () => {
    const start = this.context.FormCtrl.getInput(this.props.start.name).getViewValue();

    // We want the view value so not calling from args
    const end = this.context.FormCtrl.getInput(this.props.end.name).getViewValue();

    const hasStart = start && start !== '';
    const hasEnd = end && end !== '';

    if (hasStart && hasEnd) {
      const mStart = moment(new Date(start));
      const mEnd = moment(new Date(end));
      if (!mStart.isValid() || !mEnd.isValid()) {
        return true;
      }

      if (mStart.isAfter(mEnd)) {
        return 'Start Date must come before End Date.';
      }
    }
    return true;
  };

  getInputState = () => {
    const startValidation = this.context.FormCtrl.getInputState(this.props.start.name);
    if (startValidation.errorMessage) return startValidation;
    const endValidation = this.context.FormCtrl.getInputState(this.props.end.name);
    return endValidation;
  };

  requireStartIfEnd = () => {
    const start = this.context.FormCtrl.getInput(this.props.start.name).getViewValue();

    // We want the view value so not calling from args
    const end =
      this.context.FormCtrl.getInput(this.props.end.name) &&
      this.context.FormCtrl.getInput(this.props.end.name).getViewValue();

    const hasStart = start && start !== '';
    const hasEnd = end && end !== '';

    if (!hasStart && hasEnd) {
      return 'Both start and end date are required.';
    }

    return true;
  };

  requireEndIfStart = () => {
    const start = this.context.FormCtrl.getInput(this.props.start.name).getViewValue();

    // We want the view value so not calling from args
    const end = this.context.FormCtrl.getInput(this.props.end.name).getViewValue();

    const hasStart = start && start !== '';
    const hasEnd = end && end !== '';

    if (hasStart && !hasEnd) {
      return 'Both start and end date are required.';
    }

    return true;
  };

  renderDateRanges = () => {
    const { ranges: propsRanges, start, end } = this.props;
    const { startValue, endValue, format } = this.state;

    let ranges;
    if (typeof propsRanges === 'boolean' && propsRanges) {
      ranges = relativeRanges;
    } else if (propsRanges) {
      ranges = Array.isArray(propsRanges) ? pick(relativeRanges, propsRanges) : propsRanges;
    }

    return ranges ? (
      <div className="d-flex flex-column ml-2 mt-2">
        {Object.keys(ranges).map((text) => {
          const { startDate: startDateFunc, endDate: endDateFunc } = ranges[text];

          const presetStartDate = startDateFunc(moment());
          const presetEndDate = endDateFunc(moment());

          const isSelected =
            isSameDay(presetStartDate, moment(startValue, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'])) &&
            isSameDay(presetEndDate, moment(endValue, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD']));

          return (
            <Button
              key={text}
              className="mt-1 mb-1"
              color={isSelected ? 'primary' : 'default'}
              size="sm"
              onClick={() => {
                this.onDatesChange({
                  startDate: presetStartDate,
                  endDate: presetEndDate,
                });

                this.setState({ focusedInput: undefined });
                this.context.FormCtrl.setTouched(start.name);
                this.context.FormCtrl.setTouched(end.name);

                // // Focucs the calendar icon once clicked because we don't
                // // want to get back in the loop of opening the calendar
                this.calendarIconRef.current.parentElement.focus();
              }}
            >
              {text}
            </Button>
          );
        })}
      </div>
    ) : null;
  };

  render() {
    const { name, className, id, min, max, validate, distance, ...attributes } = this.props;
    const { startValue, endValue, focusedInput, format } = this.state;
    const endValidate = {
      afterStart: this.afterStartValidate,
      requireEndIfStart: this.requireEndIfStart,
      ...validate,
      ...this.props.end.validate,
    };

    const startValidate = {
      requireStartIfEnd: this.requireStartIfEnd,
      ...validate,
      ...this.props.start.validate,
    };
    if (distance) {
      endValidate.distance = this.validateDistance;
    }

    const minDate = validate && validate.min ? validate.min.value : min;
    const maxDate = validate && validate.max ? validate.max.value : max;

    const startId = `${(id || name).replaceAll(/[^\da-z]/gi, '')}-start`;

    const endId = `${(id || name).replaceAll(/[^\da-z]/gi, '')}-end`;

    const touched =
      this.context.FormCtrl.isTouched(this.props.start.name) && this.context.FormCtrl.isTouched(this.props.end.name);
    const hasError =
      this.context.FormCtrl.hasError(this.props.start.name) || this.context.FormCtrl.hasError(this.props.end.name);
    const isDirty =
      this.context.FormCtrl.isDirty(this.props.start.name) || this.context.FormCtrl.isDirty(this.props.end.name);
    const isBad =
      this.context.FormCtrl.isBad(this.props.start.name) || this.context.FormCtrl.isBad(this.props.end.name);

    const validation = this.getInputState();

    const classes = classNames(
      className,
      touched ? 'is-touched' : 'is-untouched',
      isDirty ? 'is-dirty' : 'is-pristine',
      isBad ? 'is-bad-input' : null,
      hasError ? 'av-invalid' : 'av-valid',
      validation.error && 'is-invalid',
      !startValue && !endValue && 'current-day-highlight'
    );

    return (
      <>
        <AvInput
          style={{ display: 'none' }}
          {...this.props.start}
          validate={{
            date: true,
            ...startValidate,
          }}
          value={startValue || ''}
          type="text"
          min={minDate}
          max={maxDate}
          valueFormatter={this.valueFormatter}
          valueParser={this.valueParser}
          aria-labelledby="dateRange-start"
        />
        <AvInput
          style={{ display: 'none' }}
          {...this.props.end}
          validate={{
            date: true,
            ...endValidate,
          }}
          value={endValue || ''}
          min={minDate}
          max={maxDate}
          valueFormatter={this.valueFormatter}
          valueParser={this.valueParser}
          aria-labelledby="dateRange-end"
        />
        <InputGroup
          disabled={attributes.disabled}
          className={classes}
          onChange={({ target }) => {
            const val = target.value;
            if (target.id === startId || target.id === endId) {
              this.onInputChange(val);
            }
          }}
          data-testid={`date-range-input-group-${name}`}
        >
          <DateRangePicker
            disabled={attributes.disabled}
            enableOutsideDays
            ariaDescribedBy={this.props.ariaDescribedBy}
            startDate={this.getDateValue(startValue)}
            startDateId={startId}
            endDate={this.getDateValue(endValue)}
            endDateId={endId}
            calendarInfoPosition="before"
            renderCalendarInfo={this.renderDateRanges}
            onDatesChange={this.onDatesChange}
            focusedInput={focusedInput}
            onFocusChange={this.onFocusChange}
            isOutsideRange={isOutsideRange(minDate, maxDate, format)}
            customArrowIcon="-"
            onClose={this.onClose}
            numberOfMonths={2}
            minimumNights={0}
            autoComplete="date"
            {...attributes}
          />
        </InputGroup>
      </>
    );
  }
}

AvDateRange.propTypes = {
  ...AvInput.propTypes,
  /** object which will be spread on the start date input. It must contain the name prop as required by availity-reactstrap-validation. It can contain additional validations as well. */
  start: PropTypes.shape(AvInput.propTypes),
  /** object which will be spread on the end date input. It must contain the name prop as required by availity-reactstrap-validation. It can contain additional validations as well. */
  end: PropTypes.shape(AvInput.propTypes),
  onChange: PropTypes.func,
  validate: PropTypes.object,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  /**  Max date to allow the datepicker and input to take. You can either pass the max here or in the validate object if you want a custom error message with it. */
  max: limitPropType,
  /**  Minimum date to allow the datepicker and input to take. You can either pass the min here or in the validate object if you want a custom error message with it. */
  min: limitPropType,
  /** Object containing the min and max distance the start and end dates are allowed to be apart from each other. See example below. */
  distance: PropTypes.object,
  /** Renders list of ranges preset to the left of the calendar */
  ranges: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.object]),
  /** Function to be run when focus on the input changes. focusedInput contains the id of the focused field. */
  onPickerFocusChange: PropTypes.func,
  defaultValues: PropTypes.object,
  /** Toggle whether the other date should be automatically synced to the selected date when focus changes. Dates are only auto synced the first time the input is touched and if the date field to auto sync is empty */
  autoSync: PropTypes.bool,
};

AvDateRange.contextTypes = { FormCtrl: PropTypes.object.isRequired };

AvDateRange.defaultProps = {
  type: 'text',
};

export default AvDateRange;

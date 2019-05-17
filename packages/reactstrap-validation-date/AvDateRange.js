import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, InputGroupAddon } from 'reactstrap';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import pick from 'lodash/pick';
import {
  inputType,
  isoDateFormat,
} from 'availity-reactstrap-validation/lib/AvValidator/utils';
import { AvInput } from 'availity-reactstrap-validation';
import { DateRange } from 'react-date-range';
import Icon from '@availity/icon';
import AvDate from './AvDate';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

let count = 0;

const relativeRanges = {
  'Last 7 Days': {
    startDate: now => now.add(-6, 'd'),
    endDate: now => now,
  },
  'Last 30 Days': {
    startDate: now => now.add(-29, 'd'),
    endDate: now => now,
  },
  'Last Calendar Month': {
    startDate: now => now.startOf('month').add(-1, 'M'),
    endDate: now => now.startOf('month').add(-1, 'd'),
  },
  'Last 120 Days': {
    startDate: now => now.add(-119, 'd'),
    endDate: now => now,
  },
  'Last 6 Months': {
    startDate: now => now.add(-6, 'M'),
    endDate: now => now,
  },
  'Last 12 Months': {
    startDate: now => now.add(-12, 'M'),
    endDate: now => now,
  },
};

const theme = {
  DateRange: { background: '#ffffff' },
  Calendar: { color: '#4d4f53' },
  MonthButton: { background: 'none' },
  MonthArrowPrev: { borderRightColor: '#4d4f53' },
  MonthArrowNext: { borderLeftColor: '#4d4f53' },
  DaySelected: {
    background: '#2261b5',
    borderColor: '#143a6c',
  },
  DayActive: {
    background: '#2261b5',
    boxShadow: 'none',
  },
  DayInRange: {
    background: '#0093e8',
    color: '#fff',
  },
  DayHover: {
    background: '#e8ebeb',
    color: '#4d4f53',
  },
};

export default class AvDateRange extends Component {
  static propTypes = {
    start: PropTypes.shape(AvInput.propTypes),
    end: PropTypes.shape(AvInput.propTypes),
    onChange: PropTypes.func,
    validate: PropTypes.object,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(dayjs),
    ]),
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(dayjs),
    ]),
    distance: PropTypes.object,
    ranges: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    defaultValues: PropTypes.object,
    theme: PropTypes.object,
    calendarIcon: PropTypes.node,
  };

  static contextTypes = { FormCtrl: PropTypes.object.isRequired };

  static defaultProps = {
    type: 'text',
    calendarIcon: <Icon name="calendar" />,
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
        this.state.startValue = dayjs(new Date())
          .add(start.value, start.units)
          .format(this.state.format);
      }
      if (getDefaultValue(props.end.name)) {
        this.state.endValue = getDefaultValue(props.end.name);
      } else if (end) {
        this.state.endValue = (end.fromStart
          ? dayjs(this.state.startValue, this.state.format)
          : dayjs(new Date())
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

  getStartRef = el => {
    this.startRef = el;

    if (this.props.start.innerRef) {
      if (typeof this.props.start.innerRef === 'function') {
        this.props.start.innerRef(el);
      } else {
        this.props.start.innerRef.current = el;
      }
    }
  };

  getEndRef = el => {
    this.endRef = el;

    if (this.props.end.innerRef) {
      if (typeof this.props.end.innerRef === 'function') {
        this.props.end.innerRef(el);
      } else {
        this.props.end.innerRef.current = el;
      }
    }
  };

  togglePicker = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  onStartFieldChange = event => {
    const startValue = event && event.target ? event.target.value : event;
    this.setState({ startValue, open: false }, () => {
      if (this.props.onChange) {
        this.props.onChange(event, {
          start: startValue,
          end: this.state.endValue,
        });
      }
    });
  };

  onEndFieldChange = event => {
    const endValue = event && event.target ? event.target.value : event;
    this.setState({ endValue, open: false }, () => {
      if (this.props.onChange) {
        this.props.onChange(event, {
          start: this.state.startValue,
          end: endValue,
        });
      }
    });
  };

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

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
      const mStart = dayjs(new Date(start));
      const mEnd = dayjs(new Date(end));
      if (!mStart.isValid() || !mEnd.isValid()) {
        return true;
      }
      const { max, min } = this.props.distance;
      if (max) {
        if (!mEnd.isBefore(mStart.add(max.value, max.units), 'day')) {
          return (
            max.errorMessage ||
            `The end date must be within ${max.value} ${
              max.units
            } of the start date`
          );
        }
      }
      if (min) {
        if (mEnd.isAfter(mStart.add(min.value, min.units), 'day')) {
          return (
            min.errorMessage ||
            `The end date must be greater than ${min.value} ${
              min.units
            } of the start date`
          );
        }
      }
    }
    return true;
  };

  checkDistanceValidation = () => {
    this.context.FormCtrl.validate(this.props.end.name);
  };

  syncStartEnd = event => {
    let endValue =
      this.context.FormCtrl.getInput(this.props.end.name).getViewValue() ||
      this.state.startValue;
    if (
      dayjs(this.state.startValue, this.state.format).isAfter(
        new Date(endValue)
      )
    ) {
      endValue = this.state.startValue;
    }
    if (this.state.endValue !== endValue) {
      this.setState({ endValue }, () => {
        if (this.props.onChange) {
          this.props.onChange(event, {
            start: this.state.startValue,
            end: endValue,
          });
        }
      });
    }
    if (!this.context.FormCtrl.isTouched(this.props.end.name)) {
      this.context.FormCtrl.setTouched(this.props.end.name);
    }
    this.checkDistanceValidation(endValue, {
      [this.props.start.name]: this.state.startValue,
    });
  };

  syncEndStart = event => {
    let startValue =
      this.context.FormCtrl.getInput(this.props.start.name).getViewValue() ||
      this.state.endValue;
    if (
      dayjs(this.state.endValue, this.state.format).isBefore(
        new Date(startValue)
      )
    ) {
      startValue = this.state.endValue;
    }
    if (this.state.startValue !== startValue) {
      this.setState({ startValue }, () => {
        if (this.props.onChange) {
          this.props.onChange(event, {
            start: startValue,
            end: this.state.endValue,
          });
        }
      });
    }
    if (!this.context.FormCtrl.isTouched(this.props.start.name)) {
      this.context.FormCtrl.setTouched(this.props.start.name);
    }
  };

  onPickerChange = range => {
    if (!this.context.FormCtrl.isTouched(this.props.start.name)) {
      this.context.FormCtrl.setTouched(this.props.start.name);
    }
    if (!this.context.FormCtrl.isTouched(this.props.end.name)) {
      this.context.FormCtrl.setTouched(this.props.end.name);
    }
    const startValue = range.startDate.format(this.state.format);
    const endValue = range.endDate.format(this.state.format);
    this.setState(
      {
        startValue,
        endValue,
        open: false,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(range, {
            start: startValue,
            end: endValue,
          });
        }
        this.checkDistanceValidation(endValue, {
          [this.props.start.name]: startValue,
        });
      }
    );
  };

  render() {
    const endValidate = {
      ...this.props.validate,
      ...this.props.end.validate,
    };
    if (this.props.distance) {
      endValidate.distance = this.validateDistance;
    }
    return (
      <div className="input-group input-group-date-range">
        <AvDate
          placeholder={this.state.format.toLowerCase()}
          type={this.props.type}
          className={this.props.disabled ? 'border-right-0' : undefined}
          {...this.props.start}
          innerRef={this.getStartRef}
          validate={{ ...this.props.validate, ...this.props.start.validate }}
          onChange={this.onStartFieldChange}
          value={this.state.startValue || ''}
          disabled={this.props.disabled}
          onBlur={this.syncStartEnd}
          aria-label="From Date"
          datepicker={false}
        />
        <InputGroupAddon
          addonType="append"
          className="input-group-prepend input-group-addon-dash"
        >
          -
        </InputGroupAddon>
        <AvDate
          placeholder={this.state.format.toLowerCase()}
          type={this.props.type}
          className={this.props.disabled ? 'border-left-0' : undefined}
          {...this.props.end}
          innerRef={this.getEndRef}
          validate={endValidate}
          disabled={this.props.disabled}
          onChange={this.onEndFieldChange}
          value={this.state.endValue || ''}
          onBlur={this.syncEndStart}
          aria-label="To Date"
          datepicker={false}
        />
        <InputGroupAddon addonType="append">
          <Button
            id={this.guid}
            color="light"
            type="button"
            disabled={this.props.disabled}
            onClick={this.togglePicker}
            style={{
              lineHeight:
                this.state.format === isoDateFormat ? '1.4' : undefined,
              zIndex: 'auto',
            }}
          >
            {this.props.calendarIcon}
            <span className="sr-only">Toggle Calendar</span>
          </Button>
        </InputGroupAddon>
        <Popover
          placement="top"
          target={this.guid}
          isOpen={this.state.open}
          toggle={this.toggle}
          className="popover-calendar-range"
        >
          <DateRange
            startDate={this.state.startValue}
            endDate={
              dayjs(new Date(this.state.endValue)).isValid()
                ? this.state.endValue
                : null
            }
            maxDate={this.props.max}
            minDate={this.props.min}
            ranges={
              // eslint-disable-next-line no-nested-ternary
              this.props.ranges !== undefined
                ? Array.isArray(this.props.ranges)
                  ? pick(relativeRanges, this.props.ranges)
                  : this.props.ranges
                : relativeRanges
            }
            onChange={this.onPickerChange}
            format={this.state.format}
            theme={this.props.theme || theme}
            twoStepChange
            linkedCalendars
          />
        </Popover>
      </div>
    );
  }
}

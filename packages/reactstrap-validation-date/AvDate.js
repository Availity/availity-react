/* eslint-disable react/default-props-match-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroupAddon, Popover } from 'reactstrap';
import moment from 'moment';
import {
  inputType,
  isoDateFormat,
} from 'availity-reactstrap-validation/lib/AvValidator/utils';
import Icon from '@availity/icon';
import { Calendar } from 'react-date-range';
import { AvInput } from 'availity-reactstrap-validation';
import './styles.scss';

const getRelativeDate = (validate, key) => {
  if (validate && validate.dateRange && validate.dateRange[key]) {
    const value = validate.dateRange[key];
    if (value.units) {
      return moment().add(value.value, value.units);
    }
    return value;
  }
  return null;
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

class AvDate extends Component {
  static propTypes = {
    ...AvInput.propTypes,
    calendarIcon: PropTypes.node,
  };

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
  };

  static defaultProps = {
    type: 'text',
    datepicker: true,
    calendarIcon: <Icon name="calendar" />,
  };

  static getDerivedStateFromProps = ({ value }, prevState) => {
    if (value !== undefined && value !== prevState.value) {
      return { value };
    }
    return null;
  };

  getRef = el => {
    this.inputRef = el;

    if (this.props.innerRef) {
      if (typeof this.props.innerRef === 'function') {
        this.props.innerRef(el);
      } else {
        this.props.innerRef.current = el;
      }
    }
  };

  reset() {
    this.setState({ value: '' });
  }

  valueParser(value) {
    if (this.state.format === isoDateFormat) return value;
    const date = moment(
      value,
      [this.state.format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );
    if (date.isValid()) return date.format(isoDateFormat);
    return value;
  }

  valueFormatter(value) {
    const date = moment(
      value,
      [isoDateFormat, this.state.format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );
    if (date.isValid()) return date.format(this.state.format);
    return value;
  }

  constructor(props) {
    super(props);

    this.valueParser = this.valueParser.bind(this);
    this.valueFormatter = this.valueFormatter.bind(this);

    this.state = { open: false };
    if (props.type.toLowerCase() === 'date' && inputType.date) {
      this.state.format = isoDateFormat;
    } else {
      this.state.format =
        (props.validate && props.validate.date && props.validate.date.format) ||
        'MM/DD/YYYY';
    }
  }

  togglePicker = () => {
    this.setState({ open: this.props.disabled ? false : !this.state.open });
  };

  onFieldChange = event => {
    event.persist();
    const value = event && event.target ? event.target.value : event;
    this.setState({ value, open: false }, () => {
      if (this.props.onChange) this.props.onChange(event, value);
    });
  };

  onPickerChange = value => {
    if (!this.context.FormCtrl.isTouched(this.props.name))
      this.context.FormCtrl.setTouched(this.props.name);
    this.setState(
      { value: value.format(this.state.format), open: false },
      () => {
        if (this.props.onChange)
          this.props.onChange(
            { target: this.inputRef },
            value.format(this.state.format)
          );
      }
    );
  };

  render() {
    const { datepicker, calendarIcon, ...props } = this.props;
    const id = `${(this.props.id || this.props.name).replace(
      /[^a-zA-Z0-9]/gi,
      ''
    )}-btn`;
    const input = (
      <AvInput
        placeholder={this.state.format.toLowerCase()}
        {...props}
        innerRef={this.getRef}
        value={this.state.value || ''}
        onChange={this.onFieldChange}
        valueFormatter={this.valueFormatter}
        valueParser={this.valueParser}
        validate={{ date: true, ...this.props.validate }}
      />
    );

    if (!datepicker) return input;

    return (
      <div className="input-group">
        {input}
        <InputGroupAddon addonType="append">
          <Button
            id={id}
            color="light"
            type="button"
            onClick={this.togglePicker}
            disabled={props.disabled}
            style={{
              zIndex: 'auto',
            }}
          >
            {calendarIcon}
            <span className="sr-only">Toggle Calendar</span>
          </Button>
        </InputGroupAddon>
        <Popover
          placement="top"
          target={id}
          isOpen={this.state.open}
          toggle={this.togglePicker}
          className="popover-calendar"
        >
          <Calendar
            date={this.state.value}
            onChange={this.onPickerChange}
            format={this.state.format}
            theme={this.props.theme || theme}
            minDate={
              this.props.min || getRelativeDate(this.props.validate, 'start')
            }
            maxDate={
              this.props.max || getRelativeDate(this.props.validate, 'end')
            }
          />
        </Popover>
      </div>
    );
  }
}

export default AvDate;

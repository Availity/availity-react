import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Feedback, Label } from '@availity/form';

import DateRange from './DateRange';

const DateRangeField = ({
  name,
  label,
  labelClass,
  labelHidden,
  labelAttrs,
  id = name,
  required,
  helpId,
  ...props
}) => (
  <FormGroup for={name}>
    {label && (
      <Label
        for={`${id.replace(/[^\da-z]/gi, '')}-start`}
        className={labelClass}
        hidden={labelHidden}
        required={required}
        helpId={helpId}
        {...labelAttrs}
      >
        {label}
      </Label>
    )}
    <DateRange name={name} id={id} feedback {...props} />
    <Feedback name={name} />
  </FormGroup>
);

DateRangeField.propTypes = {
  id: PropTypes.string,
  /** The name of the field. Will be the key of the selected date that comes through in the values of the `onSubmit` callback. */
  name: PropTypes.string.isRequired,
  /** The text that renders inside the `Label` above the input. */
  label: PropTypes.node,
  /** The name of the class for the label. Will be passed to the `className` prop of the label in the field. */
  labelClass: PropTypes.string,
  /** Used to control if the label is displayed. When set to `true`, the label in the field won't be visible. */
  labelHidden: PropTypes.bool,
  /** Pass additional attributes to the label */
  labelAttrs: PropTypes.object,
  /** Will add `<RequiredAsterisk />` to label. */
  required: PropTypes.bool,
  /** Help topic id, adds `<FieldHelpIcon/>` next to the label (should not be within label for accessibility). */
  helpId: PropTypes.string,
};

export default DateRangeField;

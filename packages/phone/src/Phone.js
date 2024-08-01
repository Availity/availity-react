import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from '@availity/form';
import { useFormikContext } from 'formik';
import { AsYouType } from 'libphonenumber-js';
import { Row, Col } from 'reactstrap';

const Phone = ({
  name,
  label,
  country = 'US',
  showExtension = false,
  extProps,
  phoneColProps,
  formatInitialValue,
  ...restPhoneProps
}) => {
  const { setFieldValue, setFieldTouched, values } = useFormikContext();

  let ext = null;
  if (showExtension) {
    const { name, label, extColProps, ...restExtProps } = extProps;

    ext = (
      <Col {...extColProps}>
        <Field name={name} label={label} {...restExtProps} />
      </Col>
    );
  }

  const asYouFormat = (phoneString) => {
    // Use AsYouType instead of parsePhoneNumberFromString.format() so partial values can still be formatted
    const asYouType = new AsYouType(country);
    asYouType.input(phoneString);

    return asYouType.formattedOutput;
  };

  useEffect(() => {
    if (formatInitialValue) {
      setFieldValue(name, asYouFormat(values[name]), false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatPhoneOnBlur = ({ target: { value } }) => {
    setFieldValue(name, asYouFormat(value), true);
    setFieldTouched(name, true, true);
  };

  return (
    <Row>
      <Col xs={showExtension ? 10 : 12} {...phoneColProps}>
        <Field name={name} label={label} onBlur={formatPhoneOnBlur} {...restPhoneProps} />
      </Col>
      {ext}
    </Row>
  );
};

Phone.propTypes = {
  /** Identifies the field and matches the validation schema. */
  name: PropTypes.string.isRequired,
  /** Used to pass props to the extension field when it is enabled. */
  extProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    /** Used to control props on `<Col />` for the extension field, if needed. The extension column has no default size value, so it's default will effectively be size: { 12 - phoneColSize } unless otherwise specified. */
    extColProps: PropTypes.object,
  }),
  /** Displays a Reactstrap `<Label />` for the field. */
  label: PropTypes.string,
  /** Enable the phone extension field. */
  showExtension: PropTypes.bool,
  /** Default country for parsing national numbers. [This is the two letter ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). */
  country: PropTypes.string,
  /** Used to control props on the `<Col />` for the phone field, if needed. The phone column defaults to xs: { size: 12 } when not rendering an extension field, and defaults to xs: { size: 10 } when rendering an extension field. */
  phoneColProps: PropTypes.object,
  /** When true, when the field is first rendered, it will trigger the formatter to update the value. */
  formatInitialValue: PropTypes.bool,
};

export default Phone;

import React from 'react';
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
  ...restPhoneProps
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();

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

  const formatPhoneOnBlur = ({ target: { value } }) => {
    setFieldValue(name, asYouFormat(value), true);
    setFieldTouched(name, true, true);
  };

  return (
    <Row>
      <Col xs={showExtension ? 10 : 12} {...phoneColProps}>
        <Field
          name={name}
          label={label}
          onBlur={formatPhoneOnBlur}
          {...restPhoneProps}
        />
      </Col>
      {ext}
    </Row>
  );
};

Phone.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  showExtension: PropTypes.bool,
  country: PropTypes.string,
  phoneColProps: PropTypes.object,
  extProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    extColProps: PropTypes.object,
  }),
};

export default Phone;

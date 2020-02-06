import React from 'react';
import PropTypes from 'prop-types';
import { Field } from '@availity/form';
import { useField } from 'formik';
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
  const phoneHelpers = useField(name)[2]; // [field, meta, helpers]
  const { setTouched, setValue } = phoneHelpers;

  let ext = null;
  if (showExtension) {
    const { name, label, extColProps, ...restExtProps } = extProps;

    ext = (
      <Col {...extColProps}>
        <Field name={name} label={label} {...restExtProps} />
      </Col>
    );
  }

  const asYouFormat = phoneString => {
    // Use AsYouType instead of parsePhoneNumberFromString.format() so partial values can still be formatted
    const asYouType = new AsYouType(country); // TODO: create only once, call constructor only if country changes
    asYouType.input(phoneString);

    return asYouType.formattedOutput;
  };

  const formatPhoneOnBlur = async ({ target: { value } }) => {
    // Validation error can show up during onChange event, before blur, since formik values are updated
    // AsYouType's formatter can correct a minor formatting error during the blur event
    // There seems to be a problem with setTouched using stale values after setValue during validation
    // https://github.com/jaredpalmer/formik/issues/2083
    // https://github.com/jaredpalmer/formik/issues/2106
    // https://github.com/jaredpalmer/formik/issues/1977
    // https://github.com/facebook/react/issues/15344 ?
    // TODO: Why does await solve this? setValue is not async. Dispatch async?

    await setValue(asYouFormat(value));
    setTouched(true);
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

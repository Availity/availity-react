import React from 'react';
import ReactCurrencyInput from 'react-currency-input-field';
import classnames from 'classnames';
import { useField, useFormikContext } from 'formik';

type Props = {
  id?: string;
  value?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  onValueChanged: (value: string | undefined) => void;
};

const CurrencyInput = ({ id, name, value, placeholder, disabled, onValueChanged }: Props) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [{}, metadata] = useField({
    name,
  });

  const classes = classnames(
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.error ? 'av-invalid' : 'av-valid',
    metadata.touched && metadata.error && 'is-invalid',
    'form-control'
  );

  const formatDecimals = async (value: string | undefined): Promise<void> => {
    setFieldTouched(name, true);
    if (value === '') {
      setFieldValue(name, undefined);
      if(onValueChanged) {
        // eslint-disable-next-line unicorn/no-useless-undefined
        onValueChanged(undefined);
      }

      return;
    }

    const noCommasValue = value?.replace(/,/g, '');
    const number = Number(noCommasValue);

    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    const decimalValue = number.toLocaleString(undefined, options).replace(/,/g, '');
    setFieldValue(name, decimalValue);

    if(onValueChanged) {
      onValueChanged(decimalValue);
    }
  };

  return (
    <>
      <ReactCurrencyInput
        id={id}
        name={name}
        className={classes}
        prefix="$"
        placeholder={placeholder}
        disabled={disabled}
        decimalsLimit={2}
        value={value}
        aria-invalid={!!metadata.error}
        onBlur={async (event: React.ChangeEvent<HTMLInputElement>) => {
          formatDecimals(event.target.value.replace('$', ''));
        }}
        onValueChange={onValueChanged}
      />
      {metadata.error && <span className="invalid-feedback">{metadata.error}</span>}
    </>
  );
};
export default CurrencyInput;

import React from 'react';
import ReactCurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import classnames from 'classnames';
import { useField, useFormikContext } from 'formik';
import Feedback from './Feedback';

type Props = {
  name: string;
  onValueChanged: (value: string | undefined) => void;
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
} & CurrencyInputProps;

const CurrencyInput = ({ name, onValueChanged, id, value, placeholder, disabled, ...attributes }: Props) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [, metadata] = useField({
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
      // eslint-disable-next-line unicorn/no-useless-undefined
      setFieldValue(name, undefined);
      if (onValueChanged) {
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

    if (onValueChanged) {
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
        allowNegativeValue={false}
        transformRawValue={(rawValue: string) => {
          // This resolves an issue where entering decimals first will not format properly: https://github.com/cchanxzy/react-currency-input-field/issues/249
          if (rawValue && rawValue.startsWith('.')) {
            return `0${rawValue}`;
          }
          return rawValue;
        }}
        {...attributes}
      />
      <Feedback name={name} />
    </>
  );
};

export default CurrencyInput;

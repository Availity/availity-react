/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { useField } from 'formik';
import * as yup from 'yup';
import '@availity/yup';

export const singleValueSchema = (name: string, required = false) =>
  yup.object().shape({
    [name]: yup.string().nullable().isRequired(required, 'This field is required.'),
  });

export const multiValueSchema = (name: string, required: boolean, min: number, max: number) =>
  yup.object().shape({
    [name]: yup
      .array()
      .of(yup.string())
      .min(min, `Must select at least ${min} option${min !== 1 && 's'}.`)
      .max(max, `Cannot select more than ${max} option${max !== 1 && 's'}.`)
      .isRequired(required, 'This field is required.'),
  });

export const options = [
  {
    label: 'Option 1',
    value: {
      autoFill1: 'option 1 autofill value 1',
      autoFill2: 'option 1 autofill value 2',
    },
  },
  {
    label: 'Option 2',
    value: {
      autoFill1: 'option 2 autofill value 1',
      autoFill2: 'option 2 autofill value 2',
    },
  },
  {
    label: 'Option 3',
    value: {
      autoFill1: 'option 3 autofill value 1',
      autoFill2: 'option 3 autofill value 2',
    },
  },
  {
    label: 'Option 4',
    value: {
      autoFill1: 'option 4 autofill value 1',
      autoFill2: 'option 4 autofill value 2',
    },
  },
];

export const SelectedOption = ({ field }: { field: string }) => {
  const [, { value }] = useField(field);

  return (
    <>
      <p>Selected Option: </p>
      <pre>{value ? JSON.stringify(value, null, 2) : 'Nothing selected'}</pre>
    </>
  );
};
